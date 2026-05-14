export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    pageSizeOptions?: number[];
}
export declare function Pagination({ currentPage, totalPages, totalElements, pageSize, onPageChange, onPageSizeChange, pageSizeOptions }: PaginationProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Pagination.d.ts.map