import type { NextConfig } from 'next';
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
