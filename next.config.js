const withSass = require('@zeit/next-sass');
const cssConfig = { cssModules: true };
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }
}

const plugins = [
  [withSass, cssConfig]
]

module.exports = withPlugins(plugins, nextConfig);
