// web/webpack.config.js

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = path.resolve(__dirname, '../')
const webpackEnv = process.env.NODE_ENV || 'development'

const tsLoader = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  exclude: /node_modules/,
  use: {
    loader: 'ts-loader',
    options: {
      reportFiles: ['!src/**']
    }
  }
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
}

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },
  devtool: 'source-map',

  // ...the rest of your config

  module: {
    rules: [tsLoader, imageLoaderConfiguration]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      __DEV__: process.env.NODE_ENV === 'production' || true
    })
  ],

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      '@bugsnag/react-native': path.resolve(
        __dirname,
        '../mocked_modules/@bugsnag'
      ),
      'react-native-device-info': path.resolve(
        __dirname,
        '../mocked_modules/react-native-device-info'
      ),
      'react-native-gesture-handler': path.resolve(
        __dirname,
        '../mocked_modules/react-native-gesture-handler'
      ),
      'react-native-code-push': path.resolve(
        __dirname,
        '../mocked_modules/react-native-code-push'
      ),
      '@': path.resolve(__dirname, '../src')
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js'
    ]
  }
}
