import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { beginnerGuide } from "../data/guides";
import { regions } from "../data/regions";
import { speciesCatalog } from "../data/species";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function sectionsToMdx() {
  return beginnerGuide.sections
    .map((section) => {
      const body = section.body.en.join("\n\n");
      return `## ${section.title.en}\n\n${body}`;
    })
    .join("\n\n");
}

async function main() {
  for (const region of regions) {
    await prisma.region.upsert({
      where: { slug: region.slug },
      update: {
        name: region.label.en,
        labelRu: region.label.ru,
      },
      create: {
        slug: region.slug,
        name: region.label.en,
        labelRu: region.label.ru,
      },
    });
  }

  for (const region of regions) {
    if (!region.parentSlug) {
      continue;
    }

    const parent = await prisma.region.findUnique({
      where: { slug: region.parentSlug },
      select: { id: true },
    });

    if (!parent) {
      continue;
    }

    await prisma.region.update({
      where: { slug: region.slug },
      data: {
        parentId: parent.id,
      },
    });
  }

  for (const species of speciesCatalog) {
    const regionRecords = await prisma.region.findMany({
      where: {
        slug: {
          in: species.originRegions,
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    await prisma.species.upsert({
      where: { slug: species.slug },
      update: {
        scientificName: species.scientificName,
        genus: species.taxonomy.genus,
        subfamily: species.taxonomy.subfamily,
        tribe: species.taxonomy.tribe,
        beginnerFriendly: species.beginnerFriendly,
        difficulty: species.difficulty,
        colonySizeMin: species.colonySizeMin,
        colonySizeMax: species.colonySizeMax,
        colonyGrowth: species.growth,
        aggressiveness: species.aggressiveness,
        diapauseRequired: species.diapauseRequired,
        diapauseNotes: species.diapauseNotes?.en,
        temperatureMinC: species.temperatureMinC,
        temperatureMaxC: species.temperatureMaxC,
        humidityMin: species.humidityMin,
        humidityMax: species.humidityMax,
        foundingMode: species.foundingMode?.en,
        workerSizeMinMm: species.workerSizeMinMm,
        workerSizeMaxMm: species.workerSizeMaxMm,
        proteinFoods: species.proteinFoods.en,
        sugarFoods: species.sugarFoods.en,
        summary: species.summary.en,
        highlights: species.highlights.en,
        status: species.status,
        commonNames: {
          deleteMany: {},
          create: species.commonNames.map((item) => ({
            locale: item.locale,
            name: item.name,
            isPrimary: Boolean(item.primary),
          })),
        },
        originConnections: {
          deleteMany: {},
          create: regionRecords.map((region) => ({
            regionId: region.id,
          })),
        },
      },
      create: {
        slug: species.slug,
        scientificName: species.scientificName,
        genus: species.taxonomy.genus,
        subfamily: species.taxonomy.subfamily,
        tribe: species.taxonomy.tribe,
        beginnerFriendly: species.beginnerFriendly,
        difficulty: species.difficulty,
        colonySizeMin: species.colonySizeMin,
        colonySizeMax: species.colonySizeMax,
        colonyGrowth: species.growth,
        aggressiveness: species.aggressiveness,
        diapauseRequired: species.diapauseRequired,
        diapauseNotes: species.diapauseNotes?.en,
        temperatureMinC: species.temperatureMinC,
        temperatureMaxC: species.temperatureMaxC,
        humidityMin: species.humidityMin,
        humidityMax: species.humidityMax,
        foundingMode: species.foundingMode?.en,
        workerSizeMinMm: species.workerSizeMinMm,
        workerSizeMaxMm: species.workerSizeMaxMm,
        proteinFoods: species.proteinFoods.en,
        sugarFoods: species.sugarFoods.en,
        summary: species.summary.en,
        highlights: species.highlights.en,
        status: species.status,
        commonNames: {
          create: species.commonNames.map((item) => ({
            locale: item.locale,
            name: item.name,
            isPrimary: Boolean(item.primary),
          })),
        },
        originConnections: {
          create: regionRecords.map((region) => ({
            regionId: region.id,
          })),
        },
      },
    });
  }

  await prisma.guide.upsert({
    where: { slug: beginnerGuide.slug },
    update: {
      title: beginnerGuide.title.en,
      excerpt: beginnerGuide.excerpt.en,
      category: beginnerGuide.category,
      bodyMdx: sectionsToMdx(),
      sortOrder: 1,
      status: "published",
    },
    create: {
      slug: beginnerGuide.slug,
      title: beginnerGuide.title.en,
      excerpt: beginnerGuide.excerpt.en,
      category: beginnerGuide.category,
      bodyMdx: sectionsToMdx(),
      sortOrder: 1,
      status: "published",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
