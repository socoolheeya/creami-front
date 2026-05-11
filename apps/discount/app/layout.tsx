import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Creami Discount",
  description: "할인 관리 시스템",
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
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("CREAMI_THEME")?.value;
  const theme = themeCookie === "light" ? "light" : "dark";

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
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
