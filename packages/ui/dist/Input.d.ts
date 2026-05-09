import { default as React } from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'large' | 'medium' | 'small' | 'mini';
    showSearchIcon?: boolean;
}
export declare function Input({ size, showSearchIcon, className, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Input.d.ts.map