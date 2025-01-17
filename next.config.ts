import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/secure/dashboard',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
