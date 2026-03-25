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
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      /** Gallery seed (nicenailsphoenix.com); pathname /** avoids micromatch issues with .jpg in segment */
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
};

export default nextConfig;
