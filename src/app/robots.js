export const dynamic = 'force-static';

export default function robots() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://clb-chauhoanglienxa.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
