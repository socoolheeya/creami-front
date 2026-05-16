import { ReactNode } from 'react';
import { AppSwitcherApp } from './AppSwitcher';
import { Locale } from '@creami/i18n';
export interface HeaderProps {
    apps: readonly AppSwitcherApp[];
    currentAppId: string;
    currentLocale: Locale;
    onLocaleChange: (locale: Locale) => void;
    rightSlot?: ReactNode;
    profileHref?: string;
    profileUser?: {
        name: string;
        email: string;
        status?: string;
    } | null;
}
export declare function Header({ apps, currentAppId, currentLocale, rightSlot, profileHref, profileUser, onLocaleChange }: HeaderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Header.d.ts.map