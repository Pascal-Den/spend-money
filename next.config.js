/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "specials-images.forbesimg.com",
      },
      {
        protocol: "https",
        hostname: "neal.fun",
      },

      {
        protocol: "https",
        hostname: "forbes.ua",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
