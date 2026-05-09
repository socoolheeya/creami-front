import { ReactNode } from 'react';
import { AppSwitcherApp } from './AppSwitcher';
export interface MainLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    apps: readonly AppSwitcherApp[];
    currentAppId: string;
    themeToggle?: ReactNode;
    rightSlot?: ReactNode;
}
export declare function MainLayout(props: MainLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MainLayout.d.ts.map