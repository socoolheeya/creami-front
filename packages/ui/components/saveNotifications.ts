import type { ReactNode } from 'react'
import { notification, type NotificationOptions } from './Notification'

const saveNotificationDefaults = {
  placement: 'top-right' as const,
  direction: 'right' as const
}

type SaveNotificationOptions = Omit<
  NotificationOptions,
  'type' | 'message' | 'placement' | 'direction'
>

export function notifySaveSuccess(
  message: ReactNode,
  options: SaveNotificationOptions = {}
) {
  return notification.success({
    ...saveNotificationDefaults,
    ...options,
    message
  })
}

export function notifySaveError(
  message: ReactNode,
  options: SaveNotificationOptions = {}
) {
  return notification.error({
    ...saveNotificationDefaults,
    ...options,
    message
  })
}
