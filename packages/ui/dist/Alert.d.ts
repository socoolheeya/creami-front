import { default as React } from 'react';
export interface AlertProps {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    children: React.ReactNode;
    className?: string;
}
export declare function Alert({ variant, title, children, className }: AlertProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map