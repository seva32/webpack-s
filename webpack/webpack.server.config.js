/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const config = require("./webpack.config");

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === "production";

const plugins = [
  new webpack.IgnorePlugin({
    resourceRegExp: /\.(jpg|png|svg)$/,
    contextRegExp: /images$/,
  }),
  ...config.plugins,
];
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const entry = isProduction
  ? [path.resolve(path.join(__dirname, "./server/index.js"))]
  : [
      "webpack/hot/poll?1000",
      path.resolve(path.join(__dirname, "./server/index.js")),
    ];
// We explicitly set the mode to development, to allow webpack to figure out that we are building for the backend and not the frontend.
module.exports = {
  mode: "development",
  stats: "minimal",
  devtool: "eval-source-map",
  externals: [nodeExternals()],
  name: "server",
  plugins,
  target: "node",
  entry,
  output: {
    publicPath: "/",
    path: path.join(__dirname, "..", "dist"),
    filename: "server.prod.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ...config.resolve.extensions,
    ],
    modules: [path.join(__dirname, "..", "node_modules")],
  },
  module: {
    rules: [...config.module.rules],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};
