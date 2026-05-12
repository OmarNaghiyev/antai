import { notFound } from "next/navigation";

import { getSiteCopy } from "@/lib/copy";
import { getLocaleOrNotFound, getLocalizedValue } from "@/lib/locale";
import {
  getAlternateCommonName,
  getLocalizedCommonName,
  getRegionLabel,
  getSpeciesBySlug,
} from "@/lib/species";
import {
  aggressivenessLabels,
  difficultyLabels,
  growthLabels,
  locales,
} from "@/lib/types";
import { speciesCatalog } from "@/data/species";

type LocalizedSpeciesDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    speciesCatalog.map((species) => ({
      locale,
      slug: species.slug,
    })),
  );
}

export default async function LocalizedSpeciesDetailPage({
  params,
}: LocalizedSpeciesDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);
  const species = getSpeciesBySlug(slug);

  if (!species) {
    notFound();
  }

  const primaryName = getLocalizedCommonName(species, locale);
  const alternateName = getAlternateCommonName(species, locale);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="label-text">{copy.species.detailEyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[0.98]">{species.scientificName}</h1>
          {species.status === "draft" ? (
            <p className="mt-4 max-w-2xl rounded-[20px] border border-[var(--clay-soft)] bg-[var(--clay-pale)] px-4 py-3 text-sm leading-7 text-[var(--clay-deep)]">
              {copy.species.draftNotice}
            </p>
          ) : null}
          <p className="mt-3 text-lg text-[var(--muted)]">
            {primaryName?.name}
            {alternateName ? ` · ${alternateName.name}` : ""}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {getLocalizedValue(species.summary, locale)}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {getLocalizedValue(species.highlights, locale).map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className="paper-panel rounded-[30px] px-6 py-6">
          <p className="label-text">{copy.species.quickFacts}</p>
          <div className="mt-5 space-y-4">
            <div className="note-block">
              <p className="mini-label">{copy.species.difficulty}</p>
              <p className="mt-1 text-base text-[var(--ink)]">
                {difficultyLabels[locale][species.difficulty]}
              </p>
            </div>
            <div className="note-block">
              <p className="mini-label">{copy.species.beginnerFit}</p>
              <p className="mt-1 text-base text-[var(--ink)]">
                {species.beginnerFriendly ? copy.species.beginnerYes : copy.species.beginnerNo}
              </p>
            </div>
            <div className="note-block">
              <p className="mini-label">{copy.species.diapause}</p>
              <p className="mt-1 text-base text-[var(--ink)]">
                {species.diapauseRequired ? copy.filters.required : copy.filters.notNeeded}
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="paper-panel rounded-[32px] px-6 py-7">
          <h2 className="text-3xl">{copy.species.careProfile}</h2>
          <dl className="definition-grid mt-6">
            <div>
              <dt>{copy.species.colonySize}</dt>
              <dd>{getLocalizedValue(species.colonySizeLabel, locale)}</dd>
            </div>
            <div>
              <dt>{copy.species.growth}</dt>
              <dd>{growthLabels[locale][species.growth]}</dd>
            </div>
            <div>
              <dt>{copy.species.temperament}</dt>
              <dd>{aggressivenessLabels[locale][species.aggressiveness]}</dd>
            </div>
            <div>
              <dt>{copy.species.workerSize}</dt>
              <dd>
                {species.workerSizeMinMm} to {species.workerSizeMaxMm} mm
              </dd>
            </div>
            <div>
              <dt>{copy.species.temperature}</dt>
              <dd>
                {species.temperatureMinC} to {species.temperatureMaxC} C
              </dd>
            </div>
            <div>
              <dt>{copy.species.humidity}</dt>
              <dd>
                {species.humidityMin}% to {species.humidityMax}%
              </dd>
            </div>
          </dl>
        </article>

        <article className="paper-panel rounded-[32px] px-6 py-7">
          <h2 className="text-3xl">{copy.species.notesTitle}</h2>
          <div className="article-prose mt-6 space-y-5">
            <div>
              <h3>{copy.species.proteinFoods}</h3>
              <p>{getLocalizedValue(species.proteinFoods, locale).join(", ")}</p>
            </div>
            <div>
              <h3>{copy.species.sugarFoods}</h3>
              <p>{getLocalizedValue(species.sugarFoods, locale).join(", ")}</p>
            </div>
            <div>
              <h3>{copy.species.origin}</h3>
              <p>{species.originRegions.map((region) => getRegionLabel(region, locale)).join(", ")}</p>
            </div>
            <div>
              <h3>{copy.species.foundingMode}</h3>
              <p>{species.foundingMode ? getLocalizedValue(species.foundingMode, locale) : "-"}</p>
            </div>
            {species.diapauseNotes ? (
              <div>
                <h3>{copy.species.diapauseNote}</h3>
                <p>{getLocalizedValue(species.diapauseNotes, locale)}</p>
              </div>
            ) : null}
          </div>
        </article>
      </section>

      <section className="paper-panel rounded-[32px] px-6 py-7">
        <h2 className="text-3xl">{copy.species.productTitle}</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {getLocalizedValue(species.features, locale).map((feature) => (
            <p key={feature} className="note-block text-sm leading-7 text-[var(--muted)]">
              {feature}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
