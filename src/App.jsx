import React from "react";
// por ahora voy a usar HMR only
// import { hot } from "react-hot-loader/root";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import Home from "./Home";
// import Loader from "./Loader";
import ErrorBoundary from "./ErrorBoundary";

const Posts = loadable(() => {
  pMinDelay(import(/* webpackChunkName: "lazy" */ "./Posts"), 2000);
});

const App = () => (
  <div>
    <ErrorBoundary>
      <Home />
      <Posts />
    </ErrorBoundary>
  </div>
);

export default App;
