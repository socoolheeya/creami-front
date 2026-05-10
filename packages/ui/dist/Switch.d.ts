import { ReactNode } from 'react';
export interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label?: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
    variant?: 'primary' | 'success';
    size?: 'medium' | 'small';
    labelPosition?: 'left' | 'right';
    className?: string;
    id?: string;
    name?: string;
    ariaLabel?: string;
}
export declare function Switch({ checked, onCheckedChange, label, description, disabled, variant, size, labelPosition, className, id, name, ariaLabel }: SwitchProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Switch.d.ts.map