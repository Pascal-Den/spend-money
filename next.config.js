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
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
