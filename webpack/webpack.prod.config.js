/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const config = require("./webpack.config");

module.exports = {
  devtool: "source-map",

  entry: {
    app: ["@babel/polyfill", "./src/index.js"],
    vendor: ["semantic-ui-react", "styled-components"],
  },

  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js",
  },

  mode: "production",

  target: "web",

  module: {
    rules: [...config.module.rules],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "..", "/public/index.html"),
    }),
    ...config.plugins,
  ],

  resolve: {
    extensions: [...config.resolve.extensions],
  },

  // trabaja junto a miniCssExtractPlugin para generar un solo js con los styles
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles-opt",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        // vendor: {
        //   chunks: "initial",
        //   test: "vendor",
        //   name: "vendor",
        //   enforce: true,
        // },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
};
