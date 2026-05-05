import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { MainLayout } from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: "Creami Booking",
  description: "Creami Booking Management",
  icons: {
    icon: "/favicon.ico",
    apple: "/creami-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
