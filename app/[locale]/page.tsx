import Link from "next/link";

import { SpeciesList } from "@/components/species-list";
import { getSiteCopy } from "@/lib/copy";
import { beginnerGuide } from "@/data/guides";
import { getLocalizedValue, getLocaleOrNotFound, toLocalePath } from "@/lib/locale";
import { getFeaturedSpecies } from "@/lib/species";

type LocalizedHomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale: rawLocale } = await params;
  const locale = getLocaleOrNotFound(rawLocale);
  const copy = getSiteCopy(locale);
  const featuredSpecies = getFeaturedSpecies(3);

  return (
    <div className="space-y-14">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-7">
          <div>
            <p className="label-text">{copy.home.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl leading-[0.96] sm:text-6xl">
              {copy.home.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {copy.home.body}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={toLocalePath(locale, "/species")} className="ink-button">
              {copy.home.primaryAction}
            </Link>
            <Link href={toLocalePath(locale, "/choose")} className="quiet-button">
              {copy.home.secondaryAction}
            </Link>
          </div>
        </div>

        <aside className="paper-panel rounded-[30px] px-6 py-6">
          <p className="label-text">{copy.home.noteTitle}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy.home.noteBody}</p>
          <div className="mt-6 border-t border-[var(--line)] pt-5">
            <p className="label-text">{copy.home.ledgerTitle}</p>
            <div className="mt-4 space-y-4">
              {copy.home.ledgerItems.map((item) => (
                <p key={item} className="border-l border-[var(--line-strong)] pl-4 text-sm leading-7 text-[var(--muted)]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="label-text">{copy.home.showcaseTitle}</p>
              <h2 className="mt-3 text-3xl">{copy.nav.species}</h2>
            </div>
            <Link href={toLocalePath(locale, "/species")} className="ink-link text-sm font-semibold">
              {copy.home.showcaseCta}
            </Link>
          </div>

          <SpeciesList items={featuredSpecies} locale={locale} />
        </div>

        <div className="space-y-6">
          <article className="paper-panel rounded-[30px] px-6 py-6">
            <p className="label-text">{copy.home.explorerTitle}</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {copy.home.explorerBody}
            </p>
          </article>

          <article className="paper-panel rounded-[30px] px-6 py-6">
            <p className="label-text">{copy.home.guideTitle}</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {copy.home.guideBody}
            </p>
            <Link href={toLocalePath(locale, "/guides/beginner")} className="mt-5 inline-flex ink-link text-sm font-semibold">
              {copy.home.guideCta}
            </Link>
            <p className="mt-5 border-t border-[var(--line)] pt-5 text-sm leading-7 text-[var(--muted)]">
              {getLocalizedValue(beginnerGuide.excerpt, locale)}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
