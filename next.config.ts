/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },

  // Optimasi performa
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    // Enable SWC minification untuk performa lebih baik
    swcMinify: true,
  },

  // Kompresi untuk mengurangi ukuran bundle
  compress: true,

  // Optimasi gambar
  images: {
    formats: ["image/webp", "image/avif"],
  },

  // Bundle analyzer & optimasi webpack
  webpack(config, { dev, isServer }) {
    // Optimasi untuk production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
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
  },
};

module.exports = nextConfig;
