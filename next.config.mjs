import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'], // Remove 'image/png' as it's not supported
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.aaruaaru.com',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Optimize media loading
  webpack(config) {
    // Performance optimizations
    config.optimization = {
      ...config.optimization,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            priority: 20,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight((item) => item);
              return `${cacheGroupKey}-${moduleFileName}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Optimize video loading
    config.module.rules.push({
      test: /\.(mp4|webm|ogv)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024, // 10kb - inline if smaller
        },
      },
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]',
            publicPath: '/_next',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });

    // Optimize SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    // Optimize fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024, // 8kb - inline if smaller
        },
      },
      generator: {
        filename: 'static/fonts/[name].[hash][ext]',
      },
    });

    return config;
  },

  // Performance optimizations
  experimental: {
    optimizeCss: {
      cssModules: true,
      pruneSource: true,
      inlineThreshold: 10 * 1024,
    },
    turbo: {
      loaders: {
        '.mp4': ['file-loader'],
        '.webm': ['file-loader'],
        '.svg': ['@svgr/webpack'],
        '.css': ['style-loader', 'css-loader'],
        '.module.css': ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Enhanced Turbo Pack optimizations
      resolveAlias: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
      },
      // Advanced build cache configuration
      buildCache: {
        skipHashing: ['*.html', '*.json'],
        hardSourceCache: true,
        version: '1',
      },
      // Enhanced parallel processing
      parallel: {
        workers: 'auto',
        workerThreads: true,
      },
      // Module resolution optimizations
      moduleResolution: 'bundler',
      // Advanced prefetching
      prefetch: {
        strategy: 'hover',
        threshold: 100,
      },
      // Memory and performance optimizations
      memoryLimit: 4096,
      codeSplitting: {
        maxInitialRequests: 25,
        maxAsyncRequests: 30,
        minSize: 20000,
        maxSize: 244000,
      },
      // Enable SWC minification
      swcMinify: true,
      // Enable React server components
      serverComponents: true,
      // Enable incremental bundling
      incrementalBundling: true,
      // Enable build caching
      cache: {
        type: 'filesystem',
        cacheDirectory: '.next/cache',
        compression: 'gzip',
      },
    },
    serverActions: {
      bodySizeLimit: '2mb',
    },
    scrollRestoration: true,
    // Add modern optimizations
    optimizePackageImports: ['react-icons', 'date-fns', 'lodash'],
    optimizeFonts: true,
    instrumentationHook: true,
    adjustFontFallbacks: true,
  },

  // Cache and compression
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Output configuration
  output: 'standalone',

  // Caching and security headers
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects and rewrites
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Environment configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Build optimization
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production' ? {
  //     exclude: ['error', 'warn'],
  //   } : false,
  // },

  // Logging and monitoring
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default NextBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(
  nextConfig
);
