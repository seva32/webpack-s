/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import config from "./webpack.config.babel";

// const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

export default {
  devtool: "inline-source-map",

  entry: {
    app: ["webpack-hot-middleware/client?reload=true", "./src/index.js"],
    // hmr: [
    //   `webpack-dev-server/client?http://${host}:${port}`,
    //   // "webpack/hot/only-dev-server",  // Hot reload only when compiled successfully
    //   "webpack/hot/dev-server", // refresh on failure
    // ],
  },

  target: "web",

  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name].js", // Capture name from the entry
    chunkFilename: "[name].bundle.js",
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
      template: path.join(__dirname, "..", "public/index.html"),
    }),
    ...config.plugins,
  ],

  resolve: {
    extensions: [...config.resolve.extensions],
    modules: [path.join(__dirname, "..", "src"), "node_modules"],
    alias: {
      "babel-plugin-syntax-dynamic-import":
        "@babel/plugin-syntax-dynamic-import",
    },
  },

  devServer: {
    contentBase: path.join(__dirname, "..", "dist"),
    // hotOnly: true, // Don't refresh if hot loading fails
    hot: true, // to refresh on errors
    inline: true,
    disableHostCheck: true,
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
