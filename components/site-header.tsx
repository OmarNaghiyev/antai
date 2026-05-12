"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getSiteCopy } from "@/lib/copy";
import { toLocalePath } from "@/lib/locale";
import type { Locale } from "@/lib/types";

function replaceLocaleInPath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  segments[0] = targetLocale;
  return `/${segments.join("/")}`;
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = getSiteCopy(locale);

  const navItems = [
    { href: toLocalePath(locale), label: copy.nav.home },
    { href: toLocalePath(locale, "/species"), label: copy.nav.species },
    { href: toLocalePath(locale, "/choose"), label: copy.nav.choose },
    { href: toLocalePath(locale, "/guides/beginner"), label: copy.nav.beginner },
  ];

  return (
    <header className="border-b border-[var(--line)] pb-5 pt-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Link href={toLocalePath(locale)} className="inline-flex items-center gap-3">
            <span className="rounded-full border border-[var(--line-strong)] bg-[var(--leaf-deep)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--paper)]">
              Antai
            </span>
            <span className="text-sm text-[var(--muted)]">{copy.brand.subtitle}</span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== toLocalePath(locale) && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "nav-link is-active" : "nav-link"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 self-start">
          <span className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            {copy.brand.language}
          </span>
          <div className="flex items-center rounded-full border border-[var(--line)] bg-[var(--paper-strong)] p-1">
            {(["en", "ru"] as const).map((targetLocale) => {
              const nextPath = replaceLocaleInPath(pathname, targetLocale);

              return (
                <Link
                  key={targetLocale}
                  href={nextPath}
                  className={targetLocale === locale ? "lang-chip is-active" : "lang-chip"}
                >
                  {targetLocale.toUpperCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
