export interface DatePickerProps {
    value: string;
    onChange: (date: string) => void;
    label?: string;
    placeholder?: string;
    align?: 'left' | 'right';
    size?: 'large' | 'medium' | 'small' | 'mini';
}
export declare function DatePicker({ value, onChange, label, placeholder, align, size }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map