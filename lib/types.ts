export const locales = ["en", "ru"] as const;

export const difficultyLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;

export const growthPaces = ["slow", "medium", "fast"] as const;

export const aggressivenessLevels = [
  "calm",
  "moderate",
  "aggressive",
] as const;

export const catalogViews = ["list", "cards"] as const;

export const speciesSortModes = [
  "featured",
  "scientific",
  "difficulty",
  "growth",
] as const;

export type Locale = (typeof locales)[number];
export type DifficultyLevel = (typeof difficultyLevels)[number];
export type GrowthPace = (typeof growthPaces)[number];
export type AggressivenessLevel = (typeof aggressivenessLevels)[number];
export type CatalogView = (typeof catalogViews)[number];
export type SpeciesSortMode = (typeof speciesSortModes)[number];

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type LocalizedName = {
  locale: Locale;
  name: string;
  primary?: boolean;
};

export type SpeciesRecord = {
  slug: string;
  scientificName: string;
  taxonomy: {
    genus: string;
    subfamily?: string;
    tribe?: string;
  };
  commonNames: LocalizedName[];
  difficulty: DifficultyLevel;
  beginnerFriendly: boolean;
  colonySizeMin?: number;
  colonySizeMax?: number;
  colonySizeLabel: LocalizedText;
  growth: GrowthPace;
  aggressiveness: AggressivenessLevel;
  diapauseRequired: boolean;
  diapauseNotes?: LocalizedText;
  temperatureMinC?: number;
  temperatureMaxC?: number;
  humidityMin?: number;
  humidityMax?: number;
  foundingMode?: LocalizedText;
  workerSizeMinMm?: number;
  workerSizeMaxMm?: number;
  proteinFoods: LocalizedList;
  sugarFoods: LocalizedList;
  originRegions: string[];
  summary: LocalizedText;
  highlights: LocalizedList;
  features: LocalizedList;
  status: "draft" | "published";
};

export type GuideSection = {
  title: LocalizedText;
  body: LocalizedList;
};

export type GuideRecord = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: "beginner";
  sections: GuideSection[];
};

export type SpeciesFilters = {
  q?: string;
  difficulty?: DifficultyLevel;
  growth?: GrowthPace;
  aggressiveness?: AggressivenessLevel;
  beginner?: "yes";
  diapause?: "yes" | "no";
  region?: string;
  sort?: SpeciesSortMode;
  view?: CatalogView;
};

export const difficultyLabels: Record<Locale, Record<DifficultyLevel, string>> = {
  en: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  },
  ru: {
    beginner: "Для новичков",
    intermediate: "Средний",
    advanced: "Продвинутый",
    expert: "Экспертный",
  },
};

export const growthLabels: Record<Locale, Record<GrowthPace, string>> = {
  en: {
    slow: "Slow",
    medium: "Medium",
    fast: "Fast",
  },
  ru: {
    slow: "Медленный",
    medium: "Средний",
    fast: "Быстрый",
  },
};

export const aggressivenessLabels: Record<
  Locale,
  Record<AggressivenessLevel, string>
> = {
  en: {
    calm: "Calm",
    moderate: "Moderate",
    aggressive: "Aggressive",
  },
  ru: {
    calm: "Спокойный",
    moderate: "Умеренный",
    aggressive: "Агрессивный",
  },
};

export const speciesSortLabels: Record<Locale, Record<SpeciesSortMode, string>> = {
  en: {
    featured: "Featured",
    scientific: "Scientific name",
    difficulty: "Difficulty",
    growth: "Growth pace",
  },
  ru: {
    featured: "Рекомендуемые",
    scientific: "Научное название",
    difficulty: "Сложность",
    growth: "Темп роста",
  },
};

export const catalogViewLabels: Record<Locale, Record<CatalogView, string>> = {
  en: {
    list: "List",
    cards: "Cards",
  },
  ru: {
    list: "Список",
    cards: "Карточки",
  },
};
