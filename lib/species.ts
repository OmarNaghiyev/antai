import { regions } from "@/data/regions";
import { speciesCatalog } from "@/data/species";
import { getLocalizedValue } from "@/lib/locale";
import {
  aggressivenessLevels,
  catalogViews,
  difficultyLevels,
  growthPaces,
  speciesSortModes,
  type AggressivenessLevel,
  type CatalogView,
  type DifficultyLevel,
  type GrowthPace,
  type Locale,
  type SpeciesFilters,
  type SpeciesRecord,
  type SpeciesSortMode,
} from "@/lib/types";

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function includesValue<T extends string>(options: readonly T[], value?: string): value is T {
  return Boolean(value && options.includes(value as T));
}

const difficultyWeight: Record<DifficultyLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  expert: 3,
};

const growthWeight: Record<GrowthPace, number> = {
  fast: 0,
  medium: 1,
  slow: 2,
};

export function parseSpeciesFilters(
  searchParams: Record<string, string | string[] | undefined>,
  defaults?: {
    view?: CatalogView;
    sort?: SpeciesSortMode;
  },
): SpeciesFilters {
  const q = firstValue(searchParams.q)?.trim();
  const difficulty = firstValue(searchParams.difficulty);
  const growth = firstValue(searchParams.growth);
  const aggressiveness = firstValue(searchParams.aggressiveness);
  const beginner = firstValue(searchParams.beginner);
  const diapause = firstValue(searchParams.diapause);
  const region = firstValue(searchParams.region);
  const sort = firstValue(searchParams.sort);
  const view = firstValue(searchParams.view);

  return {
    q: q || undefined,
    difficulty: includesValue(difficultyLevels, difficulty)
      ? (difficulty as DifficultyLevel)
      : undefined,
    growth: includesValue(growthPaces, growth) ? (growth as GrowthPace) : undefined,
    aggressiveness: includesValue(aggressivenessLevels, aggressiveness)
      ? (aggressiveness as AggressivenessLevel)
      : undefined,
    beginner: beginner === "yes" ? "yes" : undefined,
    diapause: diapause === "yes" || diapause === "no" ? diapause : undefined,
    region: regions.some((item) => item.slug === region) ? region : undefined,
    sort: includesValue(speciesSortModes, sort)
      ? (sort as SpeciesSortMode)
      : defaults?.sort,
    view: includesValue(catalogViews, view) ? (view as CatalogView) : defaults?.view,
  };
}

export function filterSpecies(filters: SpeciesFilters) {
  return speciesCatalog.filter((species) => {
    if (filters.q) {
      const haystack = [
        species.scientificName,
        species.summary.en,
        species.summary.ru,
        ...species.commonNames.map((item) => item.name),
        ...species.highlights.en,
        ...species.highlights.ru,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(filters.q.toLowerCase())) {
        return false;
      }
    }

    if (filters.difficulty && species.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.growth && species.growth !== filters.growth) {
      return false;
    }

    if (filters.aggressiveness && species.aggressiveness !== filters.aggressiveness) {
      return false;
    }

    if (filters.beginner === "yes" && !species.beginnerFriendly) {
      return false;
    }

    if (filters.diapause === "yes" && !species.diapauseRequired) {
      return false;
    }

    if (filters.diapause === "no" && species.diapauseRequired) {
      return false;
    }

    if (filters.region && !species.originRegions.includes(filters.region)) {
      return false;
    }

    return true;
  });
}

export function sortSpecies(items: SpeciesRecord[], sort: SpeciesSortMode = "featured") {
  const sorted = [...items];

  sorted.sort((left, right) => {
    const statusOrder =
      Number(left.status === "draft") - Number(right.status === "draft");

    if (sort === "scientific") {
      return statusOrder || left.scientificName.localeCompare(right.scientificName);
    }

    if (sort === "difficulty") {
      return (
        statusOrder ||
        difficultyWeight[left.difficulty] - difficultyWeight[right.difficulty] ||
        left.scientificName.localeCompare(right.scientificName)
      );
    }

    if (sort === "growth") {
      return (
        statusOrder ||
        growthWeight[left.growth] - growthWeight[right.growth] ||
        left.scientificName.localeCompare(right.scientificName)
      );
    }

    return (
      statusOrder ||
      Number(right.beginnerFriendly) - Number(left.beginnerFriendly) ||
      difficultyWeight[left.difficulty] - difficultyWeight[right.difficulty] ||
      left.scientificName.localeCompare(right.scientificName)
    );
  });

  return sorted;
}

export function getSpeciesBySlug(slug: string) {
  return speciesCatalog.find((species) => species.slug === slug);
}

export function getRegionLabel(slug: string, locale: Locale) {
  const region = regions.find((item) => item.slug === slug);
  return region ? getLocalizedValue(region.label, locale) : slug;
}

export function getLocalizedCommonName(species: SpeciesRecord, locale: Locale) {
  return (
    species.commonNames.find((item) => item.locale === locale && item.primary) ??
    species.commonNames.find((item) => item.locale === locale) ??
    species.commonNames[0]
  );
}

export function getAlternateCommonName(species: SpeciesRecord, locale: Locale) {
  const otherLocale: Locale = locale === "en" ? "ru" : "en";
  const primary = getLocalizedCommonName(species, locale);
  const alternate = species.commonNames.find((item) => item.locale === otherLocale);

  if (!alternate || !primary) {
    return alternate;
  }

  return alternate.name === primary.name ? undefined : alternate;
}

export function getFeaturedSpecies(limit = 3) {
  return speciesCatalog
    .filter((species) => species.beginnerFriendly && species.status === "published")
    .slice(0, limit);
}

export function hasActiveFilters(filters: SpeciesFilters) {
  return Object.entries(filters).some(([key, value]) => {
    if (key === "sort" || key === "view") {
      return false;
    }

    return Boolean(value);
  });
}

export function buildCatalogHref(
  basePath: string,
  filters: SpeciesFilters,
  overrides?: Partial<SpeciesFilters>,
) {
  const params = new URLSearchParams();
  const nextFilters = { ...filters, ...overrides };

  for (const [key, value] of Object.entries(nextFilters)) {
    if (!value) {
      continue;
    }

    params.set(key, value);
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
