import React from "react";
import ReactDOM from "react-dom";
// import { loadableReady } from "@loadable/component";

import App from "./App";

function render(Root) {
  ReactDOM.render(<Root />, document.getElementById("root"));
}

// loadableReady(() => {
render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    render(App);
  });
}
// });
