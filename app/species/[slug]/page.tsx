import { redirect } from "next/navigation";

type LegacySpeciesDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacySpeciesDetailPage({
  params,
}: LegacySpeciesDetailPageProps) {
  const { slug } = await params;
  redirect(`/en/species/${slug}`);
}
