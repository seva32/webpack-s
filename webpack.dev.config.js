/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const config = require("./webpack.config");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

module.exports = {
  devtool: "inline-source-map",

  entry: {
    app: ["@babel/polyfill", "./src/index.js"],
    hmr: [
      `webpack-dev-server/client?http://${host}:${port}`,
      // "webpack/hot/only-dev-server",  // Hot reload only when compiled successfully
      "webpack/hot/dev-server", // refresh on failure
    ],
  },

  target: "web",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js", // Capture name from the entry
    publicPath: "/",
  },

  mode: "development",

  // How to resolve encountered imports
  module: {
    rules: [...config.module.rules],
  },
  // webpack.NamedModulesPlugin(). If you run webpack in development mode, it will be on by default
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(), // communicate changes to WDS, or use --hot in cli
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "public/index.html"),
    }),
    ...config.plugins,
  ],

  resolve: {
    extensions: [...config.resolve.extensions],
  },

  devServer: {
    contentBase: path.join(__dirname, "src"),
    // hotOnly: true, // Don't refresh if hot loading fails
    hot: true, // to refresh on errors
    compress: true,
    port,
    publicPath: "/",
    stats: "errors-only",
    open: true, // Open the page in browser
    // historyApiFallback: {
    // rewrites: [
    //   { from: /^\/$/, to: "/views/landing.html" },
    //   { from: /^\/subpage/, to: "/views/subpage.html" },
    //   { from: /./, to: "/views/404.html" },
    // ],
    // index: "/", // si el html no existe para una ruta vuelve a index y no 404
    // },
    overlay: true,
  },
};
