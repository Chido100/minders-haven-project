import { ThemeProvider } from "@/components/theme-provider";
import { openSans, robotoSlab } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import React from "react";




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${robotoSlab.variable}`}>
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
