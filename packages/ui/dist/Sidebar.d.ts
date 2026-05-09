import { default as React } from 'react';
import { LucideProps } from 'lucide-react';
export interface SidebarProps {
    children: React.ReactNode;
    isCollapsed?: boolean;
    className?: string;
}
export interface SidebarMenuProps {
    children: React.ReactNode;
}
export interface SidebarMenuItemProps {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    isCollapsed?: boolean;
}
export declare function Sidebar({ children, isCollapsed, className }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarMenu({ children }: SidebarMenuProps): import("react/jsx-runtime").JSX.Element;
export declare function SidebarMenuItem({ icon: Icon, label, href, onClick, isActive, isCollapsed }: SidebarMenuItemProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Sidebar.d.ts.map