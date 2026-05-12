import Link from "next/link";

import { getSiteCopy } from "@/lib/copy";
import { getLocalizedValue, toLocalePath } from "@/lib/locale";
import { getLocalizedCommonName, getRegionLabel } from "@/lib/species";
import {
  difficultyLabels,
  growthLabels,
  type Locale,
  type SpeciesRecord,
} from "@/lib/types";

export function SpeciesList({
  items,
  locale,
}: {
  items: SpeciesRecord[];
  locale: Locale;
}) {
  const copy = getSiteCopy(locale);

  return (
    <div className="paper-panel overflow-hidden rounded-[30px]">
      <div className="hidden grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.8fr_auto] gap-4 border-b border-[var(--line)] px-5 py-4 text-xs uppercase tracking-[0.16em] text-[var(--muted)] md:grid">
        <div>{copy.list.species}</div>
        <div>{copy.list.commonName}</div>
        <div>{copy.list.origin}</div>
        <div>{copy.species.difficulty}</div>
        <div>{copy.list.season}</div>
        <div className="text-right">{copy.list.action}</div>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {items.map((species) => {
          const commonName = getLocalizedCommonName(species, locale);
          const origin = getRegionLabel(species.originRegions[0], locale);

          return (
            <article
              key={species.slug}
              className="grid gap-3 px-5 py-5 md:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.8fr_auto] md:items-center md:gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xl text-[var(--ink)]">{species.scientificName}</p>
                  {species.status === "draft" ? (
                    <span className="rounded-full border border-[var(--clay-soft)] bg-[var(--clay-pale)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--clay-deep)]">
                      {copy.species.draftBadge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)] md:hidden">
                  {getLocalizedValue(species.summary, locale)}
                </p>
              </div>

              <div className="text-sm text-[var(--muted)]">{commonName?.name}</div>
              <div className="text-sm text-[var(--muted)]">{origin}</div>
              <div className="text-sm text-[var(--muted)]">
                <span className="block text-[var(--ink)]">
                  {difficultyLabels[locale][species.difficulty]}
                </span>
                <span>{growthLabels[locale][species.growth]}</span>
              </div>
              <div className="text-sm text-[var(--muted)]">
                {species.diapauseRequired ? copy.filters.required : copy.filters.notNeeded}
              </div>
              <div className="md:text-right">
                <Link
                  href={toLocalePath(locale, `/species/${species.slug}`)}
                  className="ink-link text-sm font-semibold"
                >
                  {copy.species.listOpen}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
