import { default as React } from 'react';
export interface TableProps {
    children: React.ReactNode;
    className?: string;
    overflow?: 'auto' | 'visible';
}
export interface TableHeaderProps {
    children: React.ReactNode;
    filterRow?: React.ReactNode;
    filtersEnabled?: boolean;
    className?: string;
}
export interface TableBodyProps {
    children: React.ReactNode;
    className?: string;
}
export interface TableRowProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    isSelected?: boolean;
}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
    titleText?: string;
}
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
    titleText?: string;
}
export interface TableFilterRowProps {
    children: React.ReactNode;
    className?: string;
}
export interface TableFilterCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
    titleText?: string;
}
export declare function Table({ children, className, overflow }: TableProps): import("react/jsx-runtime").JSX.Element;
export declare function TableHeader({ children, filterRow, filtersEnabled, className }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function TableBody({ children, className }: TableBodyProps): import("react/jsx-runtime").JSX.Element;
export declare function TableRow({ children, onClick, className, isSelected }: TableRowProps): import("react/jsx-runtime").JSX.Element;
export declare function TableCell({ children, className, align, truncate, titleText, ...props }: TableCellProps): import("react/jsx-runtime").JSX.Element;
export declare function TableHead({ children, className, align, truncate, titleText, ...props }: TableHeadProps): import("react/jsx-runtime").JSX.Element;
export declare function TableFilterRow({ children, className }: TableFilterRowProps): import("react/jsx-runtime").JSX.Element;
export declare function TableFilterCell({ children, className, align, truncate, titleText, ...props }: TableFilterCellProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Table.d.ts.map