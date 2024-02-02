import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/config";
// import { useTranslations } from "next-intl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export type TLocaleOptions = {
  label: string;
  value: string;
}[];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  // const t = useTranslations("LocaleSwitcher");

  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}