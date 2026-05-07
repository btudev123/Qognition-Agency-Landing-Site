/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'ph-files.imgix.net' },
      { protocol: 'https', hostname: 'ph-avatars.imgix.net' },
      { protocol: 'https', hostname: 'api.producthunt.com' }
    ]
  },
  turbopack: {},
  async redirects() {
    return [
      {
        source: '/locations/usa',
        destination: '/regions/usa',
        permanent: true
      },
      {
        source: '/locations/uk',
        destination: '/regions/uk',
        permanent: true
      },
      {
        source: '/locations/uae-ksa',
        destination: '/regions/uae-ksa',
        permanent: true
      },
      {
        source: '/locations/india',
        destination: '/regions/india',
        permanent: true
      },
      {
        source: '/locations/australia',
        destination: '/regions/australia',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
