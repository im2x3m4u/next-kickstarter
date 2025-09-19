/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
=======
  // Optimasi performa
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Enable SWC minification untuk performa lebih baik
    swcMinify: true,
  },
  // Kompresi untuk mengurangi ukuran bundle
  compress: true,
  // Optimasi gambar
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Bundle analyzer untuk debugging
  webpack(config, { dev, isServer }) {
    // Optimasi untuk production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
>>>>>>> cc4c140 (add: CRUD user management, change password)
  },
};

module.exports = nextConfig;
