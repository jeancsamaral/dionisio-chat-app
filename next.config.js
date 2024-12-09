/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Adicione esta linha
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['nvd5fkqlcztyyji3.public.blob.vercel-storage.com','images.unsplash.com','ui-avatars.com','qaas-atom-bucket.s3.us-east-2.amazonaws.com','firebasestorage.googleapis.com'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
}

module.exports = nextConfig