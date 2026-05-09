import { ReactNode } from 'react';
export interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    setIsCollapsed: (value: boolean) => void;
}
export declare function SidebarProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useSidebar(): SidebarContextType;
//# sourceMappingURL=SidebarContext.d.ts.map