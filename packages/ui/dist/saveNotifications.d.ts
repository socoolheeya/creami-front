import { ReactNode } from 'react';
import { NotificationOptions } from './Notification';
type SaveNotificationOptions = Omit<NotificationOptions, 'type' | 'message' | 'placement' | 'direction'>;
export declare function notifySaveSuccess(message: ReactNode, options?: SaveNotificationOptions): string;
export declare function notifySaveError(message: ReactNode, options?: SaveNotificationOptions): string;
export {};
//# sourceMappingURL=saveNotifications.d.ts.map