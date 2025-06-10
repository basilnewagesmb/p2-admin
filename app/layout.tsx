import "@/styles/globals.css";

import { Metadata, Viewport } from "next"
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { Toaster as SonnerToast } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { HeroUIProvider } from "@heroui/system";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionProvider>
          <HeroUIProvider>
            <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
              <div className="relative flex flex-col h-screen">
                <Toaster position="top-center" />
                <SonnerToast
                  closeButton
                  position="top-center"
                  theme="dark"
                  visibleToasts={1}
                />
                <main>{children}</main>
              </div>
            </Providers>
          </HeroUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
