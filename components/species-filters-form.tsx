import Link from "next/link";

import { regions } from "@/data/regions";
import { getSiteCopy } from "@/lib/copy";
import { getLocalizedValue, toLocalePath } from "@/lib/locale";
import { buildCatalogHref } from "@/lib/species";
import {
  aggressivenessLabels,
  aggressivenessLevels,
  catalogViewLabels,
  catalogViews,
  difficultyLabels,
  difficultyLevels,
  growthLabels,
  growthPaces,
  speciesSortLabels,
  speciesSortModes,
  type Locale,
  type SpeciesFilters,
} from "@/lib/types";

type SpeciesFiltersFormProps = {
  action: string;
  locale: Locale;
  filters: SpeciesFilters;
};

export function SpeciesFiltersForm({
  action,
  locale,
  filters,
}: SpeciesFiltersFormProps) {
  const copy = getSiteCopy(locale);
  const resolvedView = filters.view ?? "list";

  return (
    <div className="paper-panel rounded-[30px] px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="label-text">{copy.catalog.asideTitle}</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {copy.catalog.listHint}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-[var(--paper-strong)] p-1">
          {catalogViews.map((view) => (
            <Link
              key={view}
              href={buildCatalogHref(action, filters, { view })}
              className={
                view === resolvedView ? "view-toggle is-active" : "view-toggle"
              }
            >
              {catalogViewLabels[locale][view]}
            </Link>
          ))}
        </div>
      </div>

      <form action={action} className="mt-5">
        <input type="hidden" name="view" value={resolvedView} />
        <div className="grid gap-4 xl:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <label className="field-label">
            <span>{copy.filters.search}</span>
            <input
              type="text"
              name="q"
              defaultValue={filters.q ?? ""}
              placeholder={copy.filters.searchPlaceholder}
              className="field-input"
            />
          </label>

          <label className="field-label">
            <span>{copy.filters.difficulty}</span>
            <select
              name="difficulty"
              defaultValue={filters.difficulty ?? ""}
              className="field-input"
            >
              <option value="">{copy.filters.any}</option>
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {difficultyLabels[locale][level]}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            <span>{copy.filters.growth}</span>
            <select name="growth" defaultValue={filters.growth ?? ""} className="field-input">
              <option value="">{copy.filters.any}</option>
              {growthPaces.map((pace) => (
                <option key={pace} value={pace}>
                  {growthLabels[locale][pace]}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            <span>{copy.filters.sort}</span>
            <select name="sort" defaultValue={filters.sort ?? "featured"} className="field-input">
              {speciesSortModes.map((mode) => (
                <option key={mode} value={mode}>
                  {speciesSortLabels[locale][mode]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto_auto]">
          <label className="field-label">
            <span>{copy.filters.region}</span>
            <select name="region" defaultValue={filters.region ?? ""} className="field-input">
              <option value="">{copy.filters.any}</option>
              {regions.map((region) => (
                <option key={region.slug} value={region.slug}>
                  {getLocalizedValue(region.label, locale)}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            <span>{copy.filters.temperament}</span>
            <select
              name="aggressiveness"
              defaultValue={filters.aggressiveness ?? ""}
              className="field-input"
            >
              <option value="">{copy.filters.any}</option>
              {aggressivenessLevels.map((level) => (
                <option key={level} value={level}>
                  {aggressivenessLabels[locale][level]}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            <span>{copy.filters.diapause}</span>
            <select
              name="diapause"
              defaultValue={filters.diapause ?? ""}
              className="field-input"
            >
              <option value="">{copy.filters.any}</option>
              <option value="yes">{copy.filters.required}</option>
              <option value="no">{copy.filters.notNeeded}</option>
            </select>
          </label>

          <label className="field-label">
            <span>{copy.filters.beginnerFit}</span>
            <select name="beginner" defaultValue={filters.beginner ?? ""} className="field-input">
              <option value="">{copy.filters.any}</option>
              <option value="yes">{copy.filters.starterFriendly}</option>
            </select>
          </label>

          <div className="hidden xl:block" />

          <button type="submit" className="ink-button h-[49px] self-end">
            {copy.filters.apply}
          </button>

          <Link
            href={toLocalePath(locale, action.replace(`/${locale}`, ""))}
            className="quiet-button h-[49px] self-end"
          >
            {copy.filters.reset}
          </Link>
        </div>
      </form>
    </div>
  );
}
