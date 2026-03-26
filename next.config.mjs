const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
let apiHost = 'localhost';
let apiPort = '5001';
let apiProtocol = 'http';
try {
  const u = new URL(raw);
  apiHost = u.hostname;
  apiProtocol = u.protocol.replace(':', '');
  apiPort = u.port || (apiProtocol === 'https' ? '443' : '80');
} catch {
  /* defaults */
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'nicenailsphoenix.com',
        pathname: '/**',
      },
      {
        protocol: apiProtocol,
        hostname: apiHost,
        pathname: '/uploads/**',
        ...(apiPort && apiPort !== '80' && apiPort !== '443'
          ? { port: apiPort }
          : {}),
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
