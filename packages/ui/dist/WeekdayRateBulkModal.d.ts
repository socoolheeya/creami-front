export type WeekdayRateValues = Record<number, string>;
export interface WeekdayRatePreviewCell {
    day: number;
    label: string;
    inputAmount: number;
    sellRate: number;
    netRate: number;
    commissionAmount: number;
}
export interface WeekdayRatePreviewRow {
    id: string;
    name: string;
    cells: WeekdayRatePreviewCell[];
}
export interface WeekdayRateTargetOption {
    id: string;
    name: string;
}
export interface WeekdayRateBulkModalProps {
    isOpen: boolean;
    title?: string;
    startDate: string;
    endDate: string;
    values: WeekdayRateValues;
    targetLabel: string;
    rateTypeLabel?: string;
    commissionLabel?: string;
    previewRows?: WeekdayRatePreviewRow[];
    targetOptions?: WeekdayRateTargetOption[];
    selectedTargetIds?: string[];
    activeWeekdays?: number[];
    warningMessage?: string;
    disabled?: boolean;
    onTargetToggle?: (id: string) => void;
    onWeekdayToggle?: (day: number) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onValueChange: (day: number, value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}
export declare function WeekdayRateBulkModal({ isOpen, title, startDate, endDate, values, targetLabel, rateTypeLabel, commissionLabel, previewRows, targetOptions, selectedTargetIds, activeWeekdays, warningMessage, disabled, onTargetToggle, onWeekdayToggle, onStartDateChange, onEndDateChange, onValueChange, onSubmit, onClose }: WeekdayRateBulkModalProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=WeekdayRateBulkModal.d.ts.map