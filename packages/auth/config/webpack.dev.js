const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  // Specify publicPath to avoid main.js fetching problem on nested routes, because by default webpack use relative path to the nested routes
  // for example for route /auth/signin, it will try to fetch /auth/main.js which does not exist
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
}

module.exports = merge(commonConfig, devConfig);