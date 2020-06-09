require("dotenv").config({ silent: true });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/,
        // options: {
        //       babelrc: true,
        //     },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: true, // // if hmr does not work, this is a forceful method.
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true,
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: true,
            },
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "resolve-url-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
              outputPath: "svg",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};
