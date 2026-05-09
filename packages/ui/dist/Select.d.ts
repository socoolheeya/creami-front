import { default as React } from 'react';
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    size?: 'large' | 'medium' | 'small' | 'mini';
    children: React.ReactNode;
}
export declare function Select({ size, className, children, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map