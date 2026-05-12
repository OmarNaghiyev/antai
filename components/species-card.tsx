import Link from "next/link";

import { getLocalizedValue, toLocalePath } from "@/lib/locale";
import { getAlternateCommonName, getLocalizedCommonName, getRegionLabel } from "@/lib/species";
import {
  aggressivenessLabels,
  difficultyLabels,
  growthLabels,
  type Locale,
  type SpeciesRecord,
} from "@/lib/types";
import { getSiteCopy } from "@/lib/copy";

export function SpeciesCard({
  species,
  locale,
}: {
  species: SpeciesRecord;
  locale: Locale;
}) {
  const copy = getSiteCopy(locale);
  const primaryName = getLocalizedCommonName(species, locale);
  const secondaryName = getAlternateCommonName(species, locale);

  return (
    <article className="paper-panel flex h-full flex-col rounded-[28px] px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="label-text">{copy.species.detailEyebrow}</p>
          <h3 className="text-[1.7rem] leading-tight text-[var(--ink)]">
            {species.scientificName}
          </h3>
          <p className="text-sm text-[var(--muted)]">
            {primaryName?.name}
            {secondaryName ? ` · ${secondaryName.name}` : ""}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {species.status === "draft" ? (
            <span className="rounded-full border border-[var(--clay-soft)] bg-[var(--clay-pale)] px-3 py-1 text-xs font-semibold text-[var(--clay-deep)]">
              {copy.species.draftBadge}
            </span>
          ) : null}
          <span className="rounded-full border border-[var(--line-strong)] bg-[var(--leaf-pale)] px-3 py-1 text-xs font-semibold text-[var(--leaf-deep)]">
            {difficultyLabels[locale][species.difficulty]}
          </span>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
        {getLocalizedValue(species.summary, locale)}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="note-block">
          <p className="mini-label">{copy.species.growth}</p>
          <p className="mt-1 text-sm text-[var(--ink)]">{growthLabels[locale][species.growth]}</p>
        </div>
        <div className="note-block">
          <p className="mini-label">{copy.species.temperament}</p>
          <p className="mt-1 text-sm text-[var(--ink)]">
            {aggressivenessLabels[locale][species.aggressiveness]}
          </p>
        </div>
        <div className="note-block">
          <p className="mini-label">{copy.species.diapause}</p>
          <p className="mt-1 text-sm text-[var(--ink)]">
            {species.diapauseRequired ? copy.filters.required : copy.filters.notNeeded}
          </p>
        </div>
        <div className="note-block">
          <p className="mini-label">{copy.species.origin}</p>
          <p className="mt-1 text-sm text-[var(--ink)]">
            {getRegionLabel(species.originRegions[0], locale)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {getLocalizedValue(species.highlights, locale).map((highlight) => (
          <span key={highlight} className="tag-chip">
            {highlight}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
        <p className="text-sm text-[var(--muted)]">
          {species.beginnerFriendly ? copy.species.starterFriendly : copy.species.needsConfidence}
        </p>
        <Link href={toLocalePath(locale, `/species/${species.slug}`)} className="ink-button">
          {copy.species.openProfile}
        </Link>
      </div>
    </article>
  );
}
