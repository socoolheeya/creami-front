'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'

export type NotificationType = 'success' | 'warning' | 'info' | 'error'
export type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type NotificationDirection = 'left' | 'right' | 'top' | 'bottom'

export interface NotificationOptions {
  id?: string
  type?: NotificationType
  title?: React.ReactNode
  message: React.ReactNode
  duration?: number
  placement?: NotificationPlacement
  direction?: NotificationDirection
  showClose?: boolean
  onClose?: () => void
}

export interface NotificationItem extends Required<Pick<NotificationOptions, 'type' | 'duration' | 'placement' | 'showClose'>> {
  id: string
  title?: React.ReactNode
  message: React.ReactNode
  direction?: NotificationDirection
  isClosing?: boolean
  onClose?: () => void
}

export interface NotificationApi {
  open: (options: NotificationOptions) => string
  success: (options: Omit<NotificationOptions, 'type'>) => string
  warning: (options: Omit<NotificationOptions, 'type'>) => string
  info: (options: Omit<NotificationOptions, 'type'>) => string
  error: (options: Omit<NotificationOptions, 'type'>) => string
  close: (id: string) => void
  closeAll: () => void
}

interface NotificationProviderProps {
  children: React.ReactNode
  defaultDuration?: number
  defaultPlacement?: NotificationPlacement
}

type NotificationListener = {
  open: (options: NotificationOptions) => string
  close: (id: string) => void
  closeAll: () => void
}

const NotificationContext = createContext<NotificationApi | null>(null)
let notificationListener: NotificationListener | null = null
let notificationSequence = 0

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XCircle
}

const colorMap = {
  success: 'var(--success)',
  warning: 'var(--warning)',
  info: 'var(--primary)',
  error: 'var(--error)'
}

function createNotificationId() {
  notificationSequence += 1
  return `notification-${Date.now()}-${notificationSequence}`
}

function inferDirection(placement: NotificationPlacement): NotificationDirection {
  return placement.endsWith('left') ? 'left' : 'right'
}

function getStackPositionClass(placement: NotificationPlacement) {
  const vertical = placement.startsWith('top') ? 'top-lg' : 'bottom-lg'
  const horizontal = placement.endsWith('left') ? 'left-lg' : 'right-lg'
  return `${vertical} ${horizontal}`
}

function getHiddenTransform(direction: NotificationDirection) {
  const transformMap = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full'
  }

  return transformMap[direction]
}

function NotificationCard({
  item,
  onClose
}: {
  item: NotificationItem
  onClose: (id: string) => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = iconMap[item.type]
  const direction = item.direction ?? inferDirection(item.placement)

  useEffect(() => {
    const showTimer = window.setTimeout(() => setIsVisible(true), 0)
    return () => window.clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (item.duration <= 0) {
      return undefined
    }

    const closeTimer = window.setTimeout(() => onClose(item.id), item.duration)
    return () => window.clearTimeout(closeTimer)
  }, [item.duration, item.id, onClose])

  return (
    <div
      className={`pointer-events-auto flex w-app-switcher items-start gap-md rounded border border-border bg-bg-primary p-md shadow-lg transition-all ${
        isVisible && !item.isClosing ? 'translate-x-0 translate-y-0 opacity-100' : `${getHiddenTransform(direction)} opacity-0`
      }`}
      role="alert"
      style={{
        borderRadius: 'var(--radius)',
        maxWidth: 'calc(100vw - var(--spacing-xl))'
      }}
    >
      <Icon
        className="mt-xs h-icon-md w-icon-md shrink-0"
        style={{ color: colorMap[item.type] }}
        aria-hidden="true"
      />
      <div className="min-w-none flex-1">
        {item.title && (
          <div className="mb-xs font-bold text-text-primary">
            {item.title}
          </div>
        )}
        <div className="text-base font-medium text-text-secondary">
          {item.message}
        </div>
      </div>
      {item.showClose && (
        <button
          type="button"
          className="flex h-icon-md w-icon-md shrink-0 cursor-pointer items-center justify-center rounded border-none bg-transparent p-none text-text-tertiary transition-colors hover:text-text-primary"
          aria-label="Close notification"
          onClick={() => onClose(item.id)}
        >
          <X className="h-icon-md w-icon-md" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function NotificationViewport({
  placement,
  items,
  onClose
}: {
  placement: NotificationPlacement
  items: NotificationItem[]
  onClose: (id: string) => void
}) {
  if (items.length === 0) {
    return null
  }

  const isBottom = placement.startsWith('bottom')
  const orderedItems = isBottom ? [...items].reverse() : items

  return (
    <div
      className={`pointer-events-none fixed z-[var(--layer-popover)] flex flex-col gap-md ${getStackPositionClass(placement)}`}
    >
      {orderedItems.map((item) => (
        <NotificationCard key={item.id} item={item} onClose={onClose} />
      ))}
    </div>
  )
}

function createApi(listener: NotificationListener | null): NotificationApi {
  const unavailable = () => {
    throw new Error('NotificationProvider is required before using notification.')
  }

  return {
    open: (options) => listener?.open(options) ?? unavailable(),
    success: (options) => listener?.open({ ...options, type: 'success' }) ?? unavailable(),
    warning: (options) => listener?.open({ ...options, type: 'warning' }) ?? unavailable(),
    info: (options) => listener?.open({ ...options, type: 'info' }) ?? unavailable(),
    error: (options) => listener?.open({ ...options, type: 'error' }) ?? unavailable(),
    close: (id) => {
      if (!listener) {
        unavailable()
        return
      }
      listener.close(id)
    },
    closeAll: () => {
      if (!listener) {
        unavailable()
        return
      }
      listener.closeAll()
    }
  }
}

export function NotificationProvider({
  children,
  defaultDuration = 4500,
  defaultPlacement = 'top-right'
}: NotificationProviderProps) {
  const [items, setItems] = useState<NotificationItem[]>([])
  const removeTimers = useRef<Map<string, ReturnType<typeof window.setTimeout>>>(new Map())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const removeNow = useCallback((id: string) => {
    setItems((currentItems) => {
      const target = currentItems.find((item) => item.id === id)
      if (target) {
        target.onClose?.()
      }
      return currentItems.filter((item) => item.id !== id)
    })
  }, [])

  const close = useCallback((id: string) => {
    const existingTimer = removeTimers.current.get(id)
    if (existingTimer) {
      window.clearTimeout(existingTimer)
    }

    setItems((currentItems) => currentItems.map((item) => (
      item.id === id ? { ...item, isClosing: true } : item
    )))

    const removeTimer = window.setTimeout(() => {
      removeNow(id)
      removeTimers.current.delete(id)
    }, 200)

    removeTimers.current.set(id, removeTimer)
  }, [removeNow])

  const open = useCallback((options: NotificationOptions) => {
    const id = options.id ?? createNotificationId()
    const item: NotificationItem = {
      id,
      type: options.type ?? 'info',
      title: options.title,
      message: options.message,
      duration: options.duration ?? defaultDuration,
      placement: options.placement ?? defaultPlacement,
      direction: options.direction,
      showClose: options.showClose ?? true,
      onClose: options.onClose
    }

    setItems((currentItems) => currentItems.some((currentItem) => currentItem.id === id)
      ? currentItems.map((currentItem) => currentItem.id === id ? item : currentItem)
      : [...currentItems, item])

    return id
  }, [defaultDuration, defaultPlacement])

  const closeAll = useCallback(() => {
    setItems((currentItems) => {
      currentItems.forEach((item) => item.onClose?.())
      return []
    })
  }, [])

  const api = useMemo<NotificationApi>(() => ({
    open,
    success: (options) => open({ ...options, type: 'success' }),
    warning: (options) => open({ ...options, type: 'warning' }),
    info: (options) => open({ ...options, type: 'info' }),
    error: (options) => open({ ...options, type: 'error' }),
    close,
    closeAll
  }), [close, closeAll, open])

  useEffect(() => {
    notificationListener = { open, close, closeAll }
    return () => {
      notificationListener = null
      removeTimers.current.forEach((timer) => window.clearTimeout(timer))
      removeTimers.current.clear()
    }
  }, [close, closeAll, open])

  const groupedItems = useMemo(() => ({
    'top-left': items.filter((item) => item.placement === 'top-left'),
    'top-right': items.filter((item) => item.placement === 'top-right'),
    'bottom-left': items.filter((item) => item.placement === 'bottom-left'),
    'bottom-right': items.filter((item) => item.placement === 'bottom-right')
  }), [items])

  return (
    <NotificationContext.Provider value={api}>
      {children}
      {mounted && createPortal(
        <>
          <NotificationViewport placement="top-left" items={groupedItems['top-left']} onClose={close} />
          <NotificationViewport placement="top-right" items={groupedItems['top-right']} onClose={close} />
          <NotificationViewport placement="bottom-left" items={groupedItems['bottom-left']} onClose={close} />
          <NotificationViewport placement="bottom-right" items={groupedItems['bottom-right']} onClose={close} />
        </>,
        document.body
      )}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider.')
  }
  return context
}

export const notification: NotificationApi = {
  open: (options) => createApi(notificationListener).open(options),
  success: (options) => createApi(notificationListener).success(options),
  warning: (options) => createApi(notificationListener).warning(options),
  info: (options) => createApi(notificationListener).info(options),
  error: (options) => createApi(notificationListener).error(options),
  close: (id) => createApi(notificationListener).close(id),
  closeAll: () => createApi(notificationListener).closeAll()
}
