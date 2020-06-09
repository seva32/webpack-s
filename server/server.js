import express from "express";

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const app = express();

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
