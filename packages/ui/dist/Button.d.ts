import { default as React } from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
    size?: 'lg' | 'large' | 'normal' | 'md' | 'medium' | 'sm' | 'small' | 'mini';
    iconOnly?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}
export declare function Button({ variant, size, iconOnly, fullWidth, className, children, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Button.d.ts.map