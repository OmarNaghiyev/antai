import type { GuideRecord } from "@/lib/types";

export const beginnerGuide: GuideRecord = {
  slug: "beginner-guide",
  title: {
    en: "Beginner guide",
    ru: "Гид для новичка",
  },
  excerpt: {
    en: "A calmer first path into ant keeping: choose the right species, keep the first setup simple, and avoid the mistakes that usually create frustration.",
    ru: "Более спокойный вход в ant keeping: выбрать подходящий вид, не усложнить первый сетап и избежать ошибок, которые чаще всего портят старт.",
  },
  category: "beginner",
  sections: [
    {
      title: {
        en: "1. Start with the species, not the enclosure",
        ru: "1. Начинай с вида, а не с формикария",
      },
      body: {
        en: [
          "The first good decision is not which nest looks beautiful. It is choosing a species that fits your patience, your room conditions, and your appetite for seasonal care.",
          "A forgiving species with clear community knowledge will teach more than a spectacular species that creates stress from week one.",
        ],
        ru: [
          "Первое правильное решение связано не с тем, какой формикарий красивее. Важнее выбрать вид, который подходит под твоё терпение, условия в комнате и готовность к сезонному уходу.",
          "Неприхотливый вид с понятной care-базой даст больше пользы, чем эффектный вид, который начнет создавать стресс уже в первые недели.",
        ],
      },
    },
    {
      title: {
        en: "2. Keep the first setup boring on purpose",
        ru: "2. Сделай первый сетап нарочно скучным",
      },
      body: {
        en: [
          "A simple tube or compact founding setup is usually better than a large decorative habitat. Stability, visibility, and low escape risk matter more than aesthetics at the start.",
          "You can always scale the colony later. The first goal is calm observation and predictable maintenance.",
        ],
        ru: [
          "Простая пробирка или компактный стартовый сетап почти всегда лучше большого декоративного жилища. На старте важнее стабильность, обзор и низкий риск побегов, чем внешний вид.",
          "Расширить колонию можно позже. Первая цель — спокойное наблюдение и предсказуемый уход.",
        ],
      },
    },
    {
      title: {
        en: "3. Treat feeding like a routine, not improvisation",
        ru: "3. Относись к кормлению как к рутине, а не к импровизации",
      },
      body: {
        en: [
          "Most colonies benefit from a repeatable pattern: sugar source, protein source, clean water, and notes on how the workers respond.",
          "That habit becomes especially valuable when you later compare species or build a larger knowledge base.",
        ],
        ru: [
          "Большинству колоний подходит повторяемый режим: источник сахара, источник белка, чистая вода и заметки о реакции рабочих.",
          "Эта привычка особенно полезна позже, когда ты начинаешь сравнивать виды или расширять собственную базу знаний.",
        ],
      },
    },
    {
      title: {
        en: "4. Respect diapause when the species needs it",
        ru: "4. Уважай диапаузу, если вид в ней нуждается",
      },
      body: {
        en: [
          "One of the biggest beginner mistakes is assuming all ants can be kept the same way year-round. Temperate species often need a proper winter slowdown, while tropical species usually do not.",
          "That is why seasonal behavior should be visible directly in filters and quick facts, not buried inside long text.",
        ],
        ru: [
          "Одна из самых частых ошибок новичка — считать, что всех муравьев можно держать одинаково круглый год. Умеренные виды часто требуют полноценной зимней паузы, а тропические обычно нет.",
          "Именно поэтому сезонность должна быть видна прямо в фильтрах и quick facts, а не теряться внутри длинного текста.",
        ],
      },
    },
    {
      title: {
        en: "5. Build confidence with one healthy colony first",
        ru: "5. Сначала набери уверенность на одной здоровой колонии",
      },
      body: {
        en: [
          "A single well-kept colony teaches more than several rushed experiments. Good UX should help users say 'not yet' to advanced species without feeling like they are missing out.",
          "That is part of what makes a trustworthy encyclopedia different from a hype-driven catalog.",
        ],
        ru: [
          "Одна хорошо содержимая колония учит большему, чем несколько поспешных экспериментов. Хороший UX должен помогать пользователю спокойно сказать «не сейчас» сложному виду, а не создавать ощущение упущенной возможности.",
          "Именно это отличает надежную энциклопедию от каталога, построенного только на хайпе.",
        ],
      },
    },
  ],
};
