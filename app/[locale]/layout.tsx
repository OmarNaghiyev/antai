import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { getSiteCopy } from "@/lib/copy";
import { getLocaleOrNotFound } from "@/lib/locale";
import { locales } from "@/lib/types";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <div className="page-shell">
        <SiteHeader locale={locale} />
        <main className="pb-16 pt-8">{children}</main>
        <footer className="border-t border-[var(--line)] py-8">
          <div className="grid gap-4 text-sm leading-7 text-[var(--muted)] lg:grid-cols-[1.1fr_0.9fr]">
            <p>{copy.brand.footer}</p>
            <p>{copy.brand.future}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
