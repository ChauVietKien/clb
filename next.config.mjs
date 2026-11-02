/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.fdad1-4.fna.fbcdn.net",
      },
      {
        hostname: "scontent.fdad1-1.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
