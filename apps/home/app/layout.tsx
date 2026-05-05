import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

export const metadata: Metadata = {
  title: "Creami Home",
  description: "Creami Home Dashboard",
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
          <div className="min-h-screen">
            <Header />
            <Sidebar />
            <main
              className="fixed top-16 bottom-0 right-0 overflow-auto transition-all duration-300"
              style={{
                left: '240px',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
