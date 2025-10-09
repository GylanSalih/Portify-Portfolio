/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
        // Optimize bundle
        experimental: {
          // optimizeCss: true, // Deaktiviert - verursacht critters Fehler
          optimizePackageImports: ['lucide-react', 'framer-motion'],
        },
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Bundle splitting for heavy libraries
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        gsap: {
          test: /[\\/]node_modules[\\/]gsap[\\/]/,
          name: 'gsap',
          chunks: 'all',
          priority: 20,
        },
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three',
          chunks: 'all',
          priority: 20,
        },
        framer: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: 'framer',
          chunks: 'all',
          priority: 20,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;
