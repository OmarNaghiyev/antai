# Antai

Antai is a pet-project concept for the ant keeping community: a clean, consumer-facing site with a strong species database, practical filters, species care pages, and beginner-friendly guides.

## 1. Short Architecture Primer

For this MVP, the safest architecture is **database-first content**, not forum-first and not CMS-first.

- **Core domain**: `Species`, localized names, origin regions, care requirements, and beginner guides.
- **Read experience**: the public site renders catalog pages, species detail pages, and beginner guide pages.
- **Write experience**: for the first version, content is maintained through typed seed files plus Prisma Studio instead of a full editorial backend.
- **Filtering logic**: important species attributes live in structured columns, not only in rich text. That keeps the catalog fast and makes future AI/RAG use much easier.
- **Future AI layer**: later, an assistant can answer from the same canonical source of truth: structured species tables + curated guides.

### Why this shape is pragmatic

- You want search/filtering to be the main feature, so relational data matters more than a CMS page builder.
- You do not need a community/forum in MVP, so avoid moderation/auth complexity for now.
- You can launch with 30-100 good species profiles and a small guide library before building admin complexity.
- The same data model can later power SEO pages, comparison tools, and an AI assistant.

## 2. Recommended Stack

### App

- **Next.js App Router + TypeScript**
- Why: one codebase for pages, routing, server rendering, metadata, and future API routes.

### UI

- **Tailwind CSS v4**
- **Custom design system first**, then optionally `shadcn/ui` when you want more reusable primitives
- Why: fast MVP styling, easy tokenization, and clean responsive UI.

### Data

- **PostgreSQL**
- **Prisma ORM**
- **Prisma Studio** for manual editing during early content population
- Why: relational filters, easy migrations, and a smooth path from seed data to real production data.

### Content strategy

- **Typed seed files** for species and starter guides in MVP
- **MDX or stored rich text later** when guide content grows
- Why: structured data should be strict early; guide authoring can evolve later.

### Deploy

- **Vercel** for the app
- **Managed Postgres** for production
- Local development can start with a normal local Postgres instance.

## 3. Project Structure

```text
app/
  choose/
  guides/beginner/
  species/
components/
data/
lib/
prisma/
generated/
```

### Suggested responsibilities

- `app/`: routes, page composition, SEO metadata
- `components/`: reusable UI blocks
- `data/`: typed seed content used by the UI and later by DB seed scripts
- `lib/`: domain types, labels, filters, and helper functions
- `prisma/`: schema and seed entrypoint

## 4. Example Database Shape

### Core tables

- `Species`
- `SpeciesCommonName`
- `Region`
- `SpeciesRegion`
- `Guide`

### Species fields that should stay structured

- `scientificName`
- `difficulty`
- `beginnerFriendly`
- `colonySizeMin`, `colonySizeMax`
- `colonyGrowth`
- `aggressiveness`
- `temperatureMinC`, `temperatureMaxC`
- `humidityMin`, `humidityMax`
- `diapauseRequired`, `diapauseNotes`
- `proteinFoods`, `sugarFoods`
- `summary`
- `highlights`

### Why this schema works

- The catalog filters rely on real columns, not text parsing.
- Local/common names can be multilingual through a dedicated join table.
- Regions stay normalized, so later you can build geographic browsing or a taxonomic tree-like experience.
- Guides stay separate from species data but can still reference it later.

The first draft schema already lives in [prisma/schema.prisma](/c:/Users/Omar/Desktop/Personal/IT/antai/prisma/schema.prisma).

## 5. MVP Roadmap

### Phase 1. Foundation

- Define the domain schema
- Create typed seed content
- Build the visual shell and navigation

### Phase 2. Catalog

- Build `/species`
- Add filtering by difficulty, beginner-friendly, diapause, growth, region, aggressiveness
- Add empty states and SEO metadata

### Phase 3. Species pages

- Build `/species/[slug]`
- Show care requirements, origin, feeding, colony profile, common names
- Add related species / beginner alternatives

### Phase 4. Beginner education

- Build `/guides/beginner`
- Build `/choose`
- Add guided decision copy and curated starting recommendations

### Phase 5. Real database

- Connect the UI to Prisma + Postgres
- Seed local data into DB
- Use Prisma Studio as the first lightweight admin workflow

### Phase 6. Production polish

- SEO, sitemap, metadata, OG images
- Images and icon system
- Analytics
- Content QA by actual ant keepers

### Phase 7. Future expansions

- Admin UI
- User accounts and saved comparisons
- AI assistant grounded in the site database and guides

## 6. What This Repository Starts With

This starter repo is intentionally shaped for the MVP:

- home page
- species catalog page with filtering
- species detail pages
- guided species selection page
- beginner guide page
- Prisma schema draft
- typed seed data and seed script structure

Right now the UI reads from local typed data so we can move fast before wiring the real database.

## 7. Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Prepare the database later when you are ready:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 8. Product Notes

- Do not build forum/community features yet.
- Treat species care values as curated editorial data, not user-generated claims.
- Before shipping publicly, have every species card reviewed by experienced keepers or primary references.

## 9. Sources Used For Current Stack Direction

- Next.js App Router guides: https://nextjs.org/docs/app/guides
- Next.js routing and `searchParams` guidance: https://nextjs.org/docs-wip/app/building-your-application/routing
- Next.js MDX guide: https://nextjs.org/docs/pages/building-your-application/configuring/mdx
- Prisma Postgres + Prisma config guide: https://www.prisma.io/docs/guides/prisma-postgres
- Prisma Client reference: https://www.prisma.io/docs/v6/orm/reference/prisma-client-reference
- Prisma Studio: https://www.prisma.io/studio
# antai
