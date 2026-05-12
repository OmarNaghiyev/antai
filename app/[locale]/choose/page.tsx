import Link from "next/link";

import { SpeciesCard } from "@/components/species-card";
import { SpeciesFiltersForm } from "@/components/species-filters-form";
import { SpeciesList } from "@/components/species-list";
import { getSiteCopy } from "@/lib/copy";
import { getLocaleOrNotFound, toLocalePath } from "@/lib/locale";
import {
  filterSpecies,
  hasActiveFilters,
  parseSpeciesFilters,
  sortSpecies,
} from "@/lib/species";

type LocalizedChoosePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LocalizedChoosePage({
  params,
  searchParams,
}: LocalizedChoosePageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);
  const filters = parseSpeciesFilters(await searchParams, {
    view: "cards",
    sort: "featured",
  });
  const items = sortSpecies(
    filterSpecies(filters).filter((species) => species.status === "published"),
    filters.sort,
  );
  const active = hasActiveFilters(filters);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="label-text">{copy.choose.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[0.98]">{copy.choose.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {copy.choose.body}
          </p>
        </div>

        {!active ? (
          <aside className="paper-panel rounded-[30px] px-6 py-6">
            <p className="label-text">{copy.nav.choose}</p>
            <div className="mt-4 space-y-4">
              {copy.choose.quickStarts.map((item) => (
                <Link
                  key={item.query}
                  href={toLocalePath(locale, `/choose?${item.query}`)}
                  className="block border-l border-[var(--line-strong)] pl-4 transition hover:border-[var(--leaf-deep)]"
                >
                  <p className="text-base text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </section>

      <SpeciesFiltersForm action={`/${locale}/choose`} locale={locale} filters={filters} />

      <section className="space-y-5">
        <p className="text-sm text-[var(--muted)]">
          {active ? `${items.length} ${copy.choose.activeResults}` : copy.choose.idleResults}
        </p>

        {items.length === 0 ? (
          <article className="paper-panel rounded-[30px] px-6 py-7">
            <h2 className="text-2xl">{copy.catalog.emptyTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {copy.catalog.emptyBody}
            </p>
          </article>
        ) : filters.view === "list" ? (
          <SpeciesList items={items} locale={locale} />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {items.map((species) => (
              <SpeciesCard key={species.slug} species={species} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
