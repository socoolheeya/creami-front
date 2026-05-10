import { default as React } from 'react';
export type NotificationType = 'success' | 'warning' | 'info' | 'error';
export type NotificationPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type NotificationDirection = 'left' | 'right' | 'top' | 'bottom';
export interface NotificationOptions {
    id?: string;
    type?: NotificationType;
    title?: React.ReactNode;
    message: React.ReactNode;
    duration?: number;
    placement?: NotificationPlacement;
    direction?: NotificationDirection;
    showClose?: boolean;
    onClose?: () => void;
}
export interface NotificationItem extends Required<Pick<NotificationOptions, 'type' | 'duration' | 'placement' | 'showClose'>> {
    id: string;
    title?: React.ReactNode;
    message: React.ReactNode;
    direction?: NotificationDirection;
    isClosing?: boolean;
    onClose?: () => void;
}
export interface NotificationApi {
    open: (options: NotificationOptions) => string;
    success: (options: Omit<NotificationOptions, 'type'>) => string;
    warning: (options: Omit<NotificationOptions, 'type'>) => string;
    info: (options: Omit<NotificationOptions, 'type'>) => string;
    error: (options: Omit<NotificationOptions, 'type'>) => string;
    close: (id: string) => void;
    closeAll: () => void;
}
interface NotificationProviderProps {
    children: React.ReactNode;
    defaultDuration?: number;
    defaultPlacement?: NotificationPlacement;
}
export declare function NotificationProvider({ children, defaultDuration, defaultPlacement }: NotificationProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useNotification(): NotificationApi;
export declare const notification: NotificationApi;
export {};
//# sourceMappingURL=Notification.d.ts.map