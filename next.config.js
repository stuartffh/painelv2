/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig