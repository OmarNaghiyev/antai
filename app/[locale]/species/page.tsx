import { SpeciesCard } from "@/components/species-card";
import { SpeciesFiltersForm } from "@/components/species-filters-form";
import { SpeciesList } from "@/components/species-list";
import { getSiteCopy } from "@/lib/copy";
import { getLocaleOrNotFound } from "@/lib/locale";
import { filterSpecies, parseSpeciesFilters, sortSpecies } from "@/lib/species";

type LocalizedSpeciesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LocalizedSpeciesPage({
  params,
  searchParams,
}: LocalizedSpeciesPageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);
  const filters = parseSpeciesFilters(await searchParams, {
    view: "list",
    sort: "featured",
  });
  const items = sortSpecies(filterSpecies(filters), filters.sort);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="label-text">{copy.catalog.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[0.98]">{copy.catalog.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {copy.catalog.body}
          </p>
        </div>

        <aside className="paper-panel rounded-[30px] px-6 py-6">
          <p className="label-text">{copy.catalog.asideTitle}</p>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{copy.catalog.asideBody}</p>
        </aside>
      </section>

      <SpeciesFiltersForm action={`/${locale}/species`} locale={locale} filters={filters} />

      <section className="space-y-5">
        <p className="text-sm text-[var(--muted)]">
          <span className="font-semibold text-[var(--ink)]">{items.length}</span>{" "}
          {copy.catalog.results}
        </p>

        {items.length > 0 ? (
          filters.view === "cards" ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {items.map((species) => (
                <SpeciesCard key={species.slug} species={species} locale={locale} />
              ))}
            </div>
          ) : (
            <SpeciesList items={items} locale={locale} />
          )
        ) : (
          <article className="paper-panel rounded-[30px] px-6 py-7">
            <h2 className="text-2xl">{copy.catalog.emptyTitle}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              {copy.catalog.emptyBody}
            </p>
          </article>
        )}
      </section>
    </div>
  );
}
