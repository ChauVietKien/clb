export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://clb-chauhoanglienxa.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
