import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme/theme-provider"
import Head from 'next/head';
import 'katex/dist/katex.css';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Dionísio",
  description: "Explore festas e eventos no seu estilo",
  icons: {
    icon: '/assets/images/logoazul.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="icon" href="/assets/images/logoazul.png" />
        <link rel="apple-touch-icon" href="/assets/images/logoazul.png" />
        <link rel="shortcut icon" href="/assets/images/logoazul.png" />
      </Head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange

        >
          
                  {children}
                
        </ThemeProvider>
      </body>
    </html>
  );
}
