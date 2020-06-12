import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function render(Root) {
  ReactDOM.render(<Root />, document.getElementById("root"));
}

render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    render(App);
  });
}
