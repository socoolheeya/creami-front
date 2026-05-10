export interface TimePickerProps {
    value: string;
    onChange: (time: string) => void;
    label?: string;
    placeholder?: string;
    align?: 'left' | 'right';
    size?: 'large' | 'medium' | 'small' | 'mini';
    disabled?: boolean;
    clearable?: boolean;
    includeSeconds?: boolean;
    minuteStep?: number;
    secondStep?: number;
}
export interface TimeRangePickerProps {
    startValue: string;
    endValue: string;
    onStartChange: (time: string) => void;
    onEndChange: (time: string) => void;
    label?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    separator?: string;
    align?: 'left' | 'right';
    size?: 'large' | 'medium' | 'small' | 'mini';
    disabled?: boolean;
    clearable?: boolean;
    includeSeconds?: boolean;
    minuteStep?: number;
    secondStep?: number;
}
export declare function TimePicker({ value, onChange, label, placeholder, align, size, disabled, clearable, includeSeconds, minuteStep, secondStep }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export declare function TimeRangePicker({ startValue, endValue, onStartChange, onEndChange, label, startPlaceholder, endPlaceholder, separator, align, size, disabled, clearable, includeSeconds, minuteStep, secondStep }: TimeRangePickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimePicker.d.ts.map