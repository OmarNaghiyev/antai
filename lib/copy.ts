import type { Locale } from "@/lib/types";

const siteCopy = {
  en: {
    brand: {
      title: "Antai",
      subtitle: "A field guide for choosing and keeping ant species.",
      footer:
        "Antai is being shaped as a calm, trustworthy ant encyclopedia with strong filtering and clear care guidance.",
      future:
        "Community and AI features can come later, after the database and editorial structure feel solid.",
      language: "Language",
    },
    nav: {
      home: "Home",
      species: "Species",
      choose: "Choose a species",
      beginner: "Beginner guide",
    },
    home: {
      eyebrow: "Living reference",
      title: "An ant keeping encyclopedia that feels warm, searchable, and easy to trust.",
      body:
        "Antai should feel less like a glossy landing page and more like a clear companion for the hobby: structured species data, quick filters, and practical advice that helps people choose well.",
      primaryAction: "Browse the database",
      secondaryAction: "Get help choosing",
      ledgerTitle: "What the MVP should already do well",
      ledgerItems: [
        "Show species as a searchable reference base, not just decorative cards.",
        "Explain why a species is easy, risky, seasonal, or beginner-friendly.",
        "Let people switch between list and card views depending on how they browse.",
      ],
      showcaseTitle: "Start with a few species people actually compare",
      showcaseCta: "Open the full catalog",
      explorerTitle: "Why the product direction matters",
      explorerBody:
        "Most hobby spaces answer questions one thread at a time. This project becomes useful when the same knowledge is structured once and reused everywhere: catalog filters, species pages, beginner guides, and later an AI assistant.",
      noteTitle: "Field note",
      noteBody:
        "The visual direction here leans on paper, earth tones, and compact information blocks so the site feels closer to a reference journal than a luxury showcase.",
      guideTitle: "A calmer first path for beginners",
      guideBody:
        "A new keeper should be able to move from curiosity to a safe shortlist without feeling overwhelmed by setup photos, jargon, or contradictory advice.",
      guideCta: "Read the beginner guide",
    },
    catalog: {
      eyebrow: "Species catalog",
      title: "Filterable ant species database",
      body:
        "Built for quick scanning first. Search by name, narrow by care traits, switch the view, and only then open a full species profile.",
      asideTitle: "Catalog behavior",
      asideBody:
        "List view is better for comparison. Card view is better for browsing. Both should feel native to the same product.",
      results: "matching species",
      emptyTitle: "No species match these filters yet.",
      emptyBody:
        "This is a good future product moment for fallback suggestions and guided recommendations.",
      listHint: "Use list view when you want to compare multiple species quickly.",
    },
    choose: {
      eyebrow: "Guided choice",
      title: "Choose a species with fewer wrong turns",
      body:
        "This flow is meant to reduce regret. It should guide people toward species they can realistically keep, not just species that look impressive in photos.",
      quickStarts: [
        {
          title: "First colony",
          text: "Forgiving species with clear care and strong beginner value.",
          query: "difficulty=beginner&beginner=yes",
        },
        {
          title: "No diapause",
          text: "Options for keepers who want year-round activity.",
          query: "diapause=no",
        },
        {
          title: "Fast growth",
          text: "Species with quicker visible momentum once established.",
          query: "growth=fast",
        },
      ],
      activeResults: "species in your shortlist",
      idleResults: "Start with one or two filters to build a realistic shortlist.",
    },
    guide: {
      eyebrow: "Beginner guide",
      checklist: "First checklist",
      featuredTitle: "Good beginner-facing species to compare next",
      featuredCta: "Open the chooser",
    },
    species: {
      detailEyebrow: "Species profile",
      quickFacts: "Quick fit",
      careProfile: "Care profile",
      notesTitle: "Feeding and notes",
      productTitle: "Why this species matters in the product",
      draftBadge: "Draft",
      draftNotice:
        "This species has been added to the database, but its care profile is still waiting for full editorial review.",
      difficulty: "Difficulty",
      beginnerFit: "Beginner fit",
      diapause: "Diapause",
      colonySize: "Colony size",
      growth: "Growth",
      temperament: "Temperament",
      workerSize: "Worker size",
      temperature: "Temperature",
      humidity: "Humidity",
      proteinFoods: "Protein foods",
      sugarFoods: "Sugar foods",
      origin: "Origin",
      foundingMode: "Founding mode",
      diapauseNote: "Diapause note",
      yes: "Yes",
      no: "No",
      beginnerYes: "Good for a first colony",
      beginnerNo: "Better after some experience",
      openProfile: "Open profile",
      starterFriendly: "Starter friendly",
      needsConfidence: "Needs more confidence",
      listOpen: "View",
    },
    filters: {
      search: "Search",
      searchPlaceholder: "Lasius, Europe, beginner...",
      difficulty: "Difficulty",
      growth: "Growth",
      diapause: "Diapause",
      region: "Region",
      temperament: "Temperament",
      beginnerFit: "Beginner fit",
      sort: "Sort",
      view: "View",
      any: "Any",
      required: "Required",
      notNeeded: "Not needed",
      starterFriendly: "Starter friendly",
      apply: "Apply filters",
      reset: "Reset",
    },
    list: {
      species: "Species",
      commonName: "Common name",
      origin: "Origin",
      care: "Care",
      season: "Season",
      action: "Open",
    },
  },
  ru: {
    brand: {
      title: "Antai",
      subtitle: "Полевой справочник по выбору и содержанию видов муравьев.",
      footer:
        "Antai задуман как спокойная и надежная энциклопедия по ant keeping с сильной фильтрацией и понятными care-профилями.",
      future:
        "Сообщество и AI-функции можно добавить позже, когда база видов и редакционная структура станут крепкими.",
      language: "Язык",
    },
    nav: {
      home: "Главная",
      species: "Виды",
      choose: "Подобрать вид",
      beginner: "Гид для новичка",
    },
    home: {
      eyebrow: "Живая база знаний",
      title: "Энциклопедия по ant keeping, которой приятно пользоваться и которой хочется доверять.",
      body:
        "Antai должен ощущаться не как глянцевый лендинг, а как теплый и удобный спутник в хобби: структурированная база видов, быстрые фильтры и практичные советы, которые помогают выбрать разумно.",
      primaryAction: "Открыть базу видов",
      secondaryAction: "Помочь с выбором",
      ledgerTitle: "Что MVP уже должен делать хорошо",
      ledgerItems: [
        "Показывать виды как полноценную базу знаний, а не только набор декоративных карточек.",
        "Объяснять, почему вид простой, рискованный, сезонный или подходит новичку.",
        "Позволять переключаться между списком и карточками в зависимости от сценария просмотра.",
      ],
      showcaseTitle: "Начать с видов, которые люди реально сравнивают между собой",
      showcaseCta: "Открыть весь каталог",
      explorerTitle: "Почему именно такой продукт имеет смысл",
      explorerBody:
        "Большинство хобби-пространств отвечают на вопросы по одному треду за раз. Этот проект становится ценным, когда одни и те же знания один раз структурируются и потом переиспользуются в фильтрах, карточках видов, гайдах и будущем AI assistant.",
      noteTitle: "Полевое замечание",
      noteBody:
        "Визуальное направление здесь опирается на бумагу, землистые оттенки и компактные информационные блоки, чтобы сайт ощущался скорее как полевой журнал, чем как премиальная витрина.",
      guideTitle: "Более спокойный вход в хобби для новичка",
      guideBody:
        "Новый пользователь должен переходить от любопытства к адекватному shortlist без перегруза сетапами, жаргоном и противоречивыми советами.",
      guideCta: "Читать гид для новичка",
    },
    catalog: {
      eyebrow: "Каталог видов",
      title: "Фильтруемая база видов муравьев",
      body:
        "Сначала быстрое сканирование, потом глубокое чтение. Ищи по названию, сужай список по care-параметрам, меняй режим просмотра и только потом открывай полный профиль вида.",
      asideTitle: "Поведение каталога",
      asideBody:
        "Список лучше для сравнения. Карточки лучше для изучения. Оба режима должны ощущаться частью одного и того же продукта.",
      results: "видов найдено",
      emptyTitle: "По этим фильтрам пока ничего не найдено.",
      emptyBody:
        "В будущем здесь будет хорошее место для fallback-рекомендаций и guided suggestions.",
      listHint: "Список лучше подходит, когда нужно быстро сравнить несколько видов.",
    },
    choose: {
      eyebrow: "Подбор вида",
      title: "Подбери вид с меньшим количеством ошибок",
      body:
        "Этот сценарий должен снижать количество неудачных решений. Он помогает человеку выбрать вид, который он действительно сможет содержать, а не просто тот, что эффектно выглядит на фото.",
      quickStarts: [
        {
          title: "Первая колония",
          text: "Неприхотливые виды с понятным уходом и высокой ценностью для новичка.",
          query: "difficulty=beginner&beginner=yes",
        },
        {
          title: "Без диапаузы",
          text: "Варианты для тех, кто хочет круглогодичную активность.",
          query: "diapause=no",
        },
        {
          title: "Быстрый рост",
          text: "Виды, у которых прогресс заметен быстрее после старта.",
          query: "growth=fast",
        },
      ],
      activeResults: "видов в твоем shortlist",
      idleResults: "Начни с одного-двух фильтров, чтобы собрать реалистичный shortlist.",
    },
    guide: {
      eyebrow: "Гид для новичка",
      checklist: "Первый чеклист",
      featuredTitle: "Какие виды стоит сравнить новичку дальше",
      featuredCta: "Открыть подбор",
    },
    species: {
      detailEyebrow: "Профиль вида",
      quickFacts: "Быстрая оценка",
      careProfile: "Профиль ухода",
      notesTitle: "Кормление и заметки",
      productTitle: "Почему этот вид важен для продукта",
      draftBadge: "Черновик",
      draftNotice:
        "Этот вид уже добавлен в базу, но его care-профиль пока ждет полноценной редакционной проверки.",
      difficulty: "Сложность",
      beginnerFit: "Для новичка",
      diapause: "Диапауза",
      colonySize: "Размер колонии",
      growth: "Рост",
      temperament: "Характер",
      workerSize: "Размер рабочих",
      temperature: "Температура",
      humidity: "Влажность",
      proteinFoods: "Белковая еда",
      sugarFoods: "Углеводы",
      origin: "Происхождение",
      foundingMode: "Тип основания",
      diapauseNote: "Заметка о диапаузе",
      yes: "Да",
      no: "Нет",
      beginnerYes: "Подходит для первой колонии",
      beginnerNo: "Лучше после первого опыта",
      openProfile: "Открыть профиль",
      starterFriendly: "Подходит новичку",
      needsConfidence: "Требует больше уверенности",
      listOpen: "Открыть",
    },
    filters: {
      search: "Поиск",
      searchPlaceholder: "Lasius, Европа, новичок...",
      difficulty: "Сложность",
      growth: "Рост",
      diapause: "Диапауза",
      region: "Регион",
      temperament: "Характер",
      beginnerFit: "Новичок",
      sort: "Сортировка",
      view: "Вид",
      any: "Любой",
      required: "Нужна",
      notNeeded: "Не нужна",
      starterFriendly: "Подходит новичку",
      apply: "Применить фильтры",
      reset: "Сбросить",
    },
    list: {
      species: "Вид",
      commonName: "Обычное название",
      origin: "Регион",
      care: "Уход",
      season: "Сезонность",
      action: "Открыть",
    },
  },
} as const;

export function getSiteCopy(locale: Locale) {
  return siteCopy[locale];
}
