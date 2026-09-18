const webpack = require('webpack');

const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    eslint: {
      enable: false,
    },
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
        },
      },
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
  jest: {
    configure: {
      roots: ['<rootDir>/src/tests'],
      testMatch: [
        '<rootDir>/src/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/!**/?(*.)(spec|test).{js,jsx,ts,tsx}',
      ],
      moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        '@/assets/(.*)$': '<rootDir>/assets/$1',
        '@/components/(.*)$': '<rootDir>/pages/$1',
        '@/mobx/(.*)$': '<rootDir>/mobx/$1',
        '@/pages/(.*)$': '<rootDir>/pages/$1',
        'swiper/element/bundle': '<rootDir>/swiperBundleMock.js',
      },
      globals: {
        CONFIG: true,
      },
      setupFiles: ['<rootDir>/setEnvVars.js'],
    },
  },
};
