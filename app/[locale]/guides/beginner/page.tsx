import Link from "next/link";

import { SpeciesCard } from "@/components/species-card";
import { getSiteCopy } from "@/lib/copy";
import { beginnerGuide } from "@/data/guides";
import { getLocalizedValue, getLocaleOrNotFound, toLocalePath } from "@/lib/locale";
import { getFeaturedSpecies } from "@/lib/species";

type LocalizedGuidePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const checklist = {
  en: [
    "Choose the species before choosing a decorative setup.",
    "Keep the first enclosure simple and easy to monitor.",
    "Treat feeding like a repeatable routine.",
    "Always check whether the species needs diapause.",
  ],
  ru: [
    "Сначала выбрать вид, а уже потом декоративный сетап.",
    "Сделать первый дом простым и удобным для наблюдения.",
    "Превратить кормление в повторяемую рутину.",
    "Всегда проверять, нужна ли виду диапауза.",
  ],
} as const;

export default async function LocalizedGuidePage({
  params,
}: LocalizedGuidePageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);
  const featuredSpecies = getFeaturedSpecies(2);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="label-text">{copy.guide.eyebrow}</p>
          <h1 className="mt-4 text-5xl leading-[0.98]">
            {getLocalizedValue(beginnerGuide.title, locale)}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {getLocalizedValue(beginnerGuide.excerpt, locale)}
          </p>
        </div>

        <aside className="paper-panel rounded-[30px] px-6 py-6">
          <p className="label-text">{copy.guide.checklist}</p>
          <div className="mt-4 space-y-4">
            {checklist[locale].map((item) => (
              <p key={item} className="border-l border-[var(--line-strong)] pl-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </p>
            ))}
          </div>
        </aside>
      </section>

      <section className="paper-panel rounded-[32px] px-6 py-7 sm:px-8">
        <div className="space-y-8">
          {beginnerGuide.sections.map((section) => (
            <article key={section.title.en} className="border-b border-[var(--line)] pb-8 last:border-b-0 last:pb-0">
              <h2 className="text-3xl">{getLocalizedValue(section.title, locale)}</h2>
              <div className="article-prose mt-5 space-y-4">
                {getLocalizedValue(section.body, locale).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="label-text">{copy.guide.featuredTitle}</p>
            <h2 className="mt-3 text-3xl">{copy.nav.species}</h2>
          </div>
          <Link href={toLocalePath(locale, "/choose?beginner=yes")} className="ink-link text-sm font-semibold">
            {copy.guide.featuredCta}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredSpecies.map((species) => (
            <SpeciesCard key={species.slug} species={species} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
