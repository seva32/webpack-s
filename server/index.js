require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    [
      "css-modules-transform",
      {
        camelCase: true,
        extensions: [".css", ".scss"],
      },
    ],
    "dynamic-import-node",
  ],
});
// require("@babel/polyfill"); ya esta en webpack
global.Promise = require("bluebird");

require.extensions[".svg"] = () => {};

require("./server.js");
