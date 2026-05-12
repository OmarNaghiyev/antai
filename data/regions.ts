import type { LocalizedText } from "@/lib/types";

export type RegionRecord = {
  slug: string;
  label: LocalizedText;
  parentSlug?: string;
};

export const regions: RegionRecord[] = [
  {
    slug: "europe",
    label: {
      en: "Europe",
      ru: "Европа",
    },
  },
  {
    slug: "south-europe",
    label: {
      en: "Southern Europe",
      ru: "Южная Европа",
    },
    parentSlug: "europe",
  },
  {
    slug: "western-asia",
    label: {
      en: "Western Asia",
      ru: "Западная Азия",
    },
  },
  {
    slug: "southeast-asia",
    label: {
      en: "Southeast Asia",
      ru: "Юго-Восточная Азия",
    },
  },
  {
    slug: "north-africa",
    label: {
      en: "North Africa",
      ru: "Северная Африка",
    },
  },
  {
    slug: "north-america",
    label: {
      en: "North America",
      ru: "Северная Америка",
    },
  },
  {
    slug: "unreviewed",
    label: {
      en: "Needs curation",
      ru: "Требует курации",
    },
  },
];
