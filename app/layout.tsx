import "./globals.scss";
import "highlight.js/styles/default.css";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "@/public/fonts/inter";
import type { Metadata } from "next";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";
import { getSession } from "@/service/server/session";
import { ReactQueryProvider, ThemeProvider } from "@/core/provider";
import { Toaster } from "@/core/ui/components";
import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider } from "next-intl";
import { fetchGetCountryList } from "@/core/services/common";
import CountryListInitializer from "@/core/zustands/country-list/initializer";
import { headers } from "next/headers";

export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL("https://cybertise.de"),
  title: {
    default: "Sparta",
    template: "%s | Sparta",
  },
  description:
    "Empower ethical hackers with our secure reporting portal. Submit vulnerabilities effortlessly, track progress, and collaborate for safer digital ecosystems. Trusted by companies worldwide",
  openGraph: {
    title: "Sparta",
    description:
      "Empower ethical hackers with our secure reporting portal. Submit vulnerabilities effortlessly, track progress, and collaborate for safer digital ecosystems. Trusted by companies worldwide",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sparta",
      },
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Sparta",
      },
      {
        url: "/opengraph-image.png",
        width: 1800,
        height: 1200,
        alt: "Sparta",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const session = await getSession();
  const requestHeaders = headers().get("x-url");

  const includedArray = [
    "/auth",
    "/authorize",
    "/forgot-password",
    "/set-password",
    "/faq",
    "/policy",
    "/terms-and-conditions",
    "/companies",
  ];

  const containsIncludedPath = includedArray.some((path) =>
    requestHeaders?.includes(path)
  );

  const colors: Record<Role, string> = {
    hacker: "#BAFF00",
    company: "#4BA2E3",
    "company staff": "#4BA2E3",
    mediator: "#845EEE",
  };

  const messages = await getMessages();
  const countryList = await fetchGetCountryList();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          Inter.className,
          "hyphens-auto bg-background-page-light dark:bg-background-page-dark",
          !containsIncludedPath ? "overflow-hidden" : ""
        )}
      >
        <NextTopLoader
          color={
            colors[session?.user.role as Role]
              ? colors[session?.user.role as Role]
              : "#BAFF00"
          }
          showSpinner={false}
        />
        <NextIntlClientProvider messages={messages}>
          <NuqsAdapter>
            <ReactQueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
              >
                <CountryListInitializer countryList={countryList}>
                  {children}
                </CountryListInitializer>
              </ThemeProvider>
              <Toaster position="top-center" />
            </ReactQueryProvider>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
