export interface SearchableSelectOption {
    value: string;
    label: string;
    description?: string;
    searchText?: string;
}
export interface SearchableSelectProps {
    value: string;
    options: SearchableSelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
}
export declare function SearchableSelect({ value, options, onChange, placeholder, searchPlaceholder, emptyText, disabled, className }: SearchableSelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SearchableSelect.d.ts.map