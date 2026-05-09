declare const iconMap: {
    Home: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    LayoutDashboard: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    BarChart3: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    Tag: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    Calendar: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    ReceiptText: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    Settings: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
};
export type AppSwitcherIcon = keyof typeof iconMap;
export interface AppSwitcherApp {
    id: string;
    name: string;
    url: string;
    icon: AppSwitcherIcon | string;
}
export interface AppSwitcherProps {
    apps: readonly AppSwitcherApp[];
    currentAppId: string;
}
export declare function AppSwitcher({ apps, currentAppId }: AppSwitcherProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AppSwitcher.d.ts.map