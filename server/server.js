import express from "express";
import webpack from "webpack";

import React from "react";
import ReactDOMServer from "react-dom/server";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import App from "../src/App";
import config from "../webpack.dev.config";

const app = express();

// webpack
const compiler = webpack(config);

if (process.env.NODE_ENV === "development") {
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

app.use(
  express.static("dist")
  // , {
  // index: true,
  // etag: false
  // })
);

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World Seb");
});

app.listen(3000);

console.log(ReactDOMServer.renderToString(<App />));
