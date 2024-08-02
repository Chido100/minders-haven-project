import { ThemeProvider } from "@/components/theme-provider";
import { openSans, robotoSlab } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import React from "react";

import Toast from "@/components/shared/Toast";
import ReduxProvider from "@/lib/redux/provider";
import { PersistAuth } from "@/utils";


export const metadata: Metadata = {
  title: "Home | Minders Haven",
  description: "Welcome home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${robotoSlab.variable}`}>
        <Toast />
        <ReduxProvider>
          <PersistAuth />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
