import { ReactNode } from 'react';
import { AppSwitcherApp } from './AppSwitcher';
import { Locale } from '@creami/i18n';
export interface MainLayoutProps {
    children: ReactNode;
    sidebar: ReactNode;
    apps: readonly AppSwitcherApp[];
    currentAppId: string;
    currentLocale: Locale;
    onLocaleChange: (locale: Locale) => void;
    rightSlot?: ReactNode;
    profileHref?: string;
}
export declare function MainLayout(props: MainLayoutProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MainLayout.d.ts.map