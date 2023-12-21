/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
  webpack: (config) => {
    // Disable the canvas alias
    config.resolve.alias.canvas = false;

    return config;
  },
  experimental: {
    disableOptimizedLoading: true, // Disable prefetching globally
  },
};