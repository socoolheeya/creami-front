import { ReactNode } from 'react';
import { AppSwitcherApp } from './AppSwitcher';
export interface HeaderProps {
    apps: readonly AppSwitcherApp[];
    currentAppId: string;
    themeToggle?: ReactNode;
    rightSlot?: ReactNode;
}
export declare function Header({ apps, currentAppId, themeToggle, rightSlot }: HeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Header.d.ts.map