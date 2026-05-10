import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Creami ARI",
  description: "가용성, 요금, 재고 관리 시스템",
  icons: {
    icon: "/favicon.ico",
    apple: "/creami-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
