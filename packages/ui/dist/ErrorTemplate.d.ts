import { ReactNode } from 'react';
export interface ErrorTemplateProps {
    title: ReactNode;
    description?: ReactNode;
    retryLabel?: ReactNode;
    backLabel?: ReactNode;
    onRetry?: () => void;
    backHref?: string;
    className?: string;
}
export declare function ErrorTemplate({ title, description, retryLabel, backLabel, onRetry, backHref, className }: ErrorTemplateProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ErrorTemplate.d.ts.map