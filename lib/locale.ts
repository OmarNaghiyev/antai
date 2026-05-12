import { notFound } from "next/navigation";

import { locales, type Locale } from "@/lib/types";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleOrNotFound(value: string): Locale {
  if (!isLocale(value)) {
    notFound();
  }

  return value;
}

export function getLocalizedValue<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

export function toLocalePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
