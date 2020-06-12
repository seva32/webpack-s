/* eslint-disable no-unused-vars */
import React from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

import Home from "./Home";
import Loader from "./Loader";
import ErrorBoundary from "./ErrorBoundary";

// con webpackPrefetch :
// <link rel="prefetch href="lazy-chunk.js"> en el <head>
const Posts = loadable(() => {
  pMinDelay(
    import(/* webpackChunkName: "lazy" , webpackPrefetch: true */ "./Posts"),
    {
      fallback: <div>Loading...</div>,
    },
    20000
  );
});

const App = () => (
  <div>
    <ErrorBoundary>
      <Home />
      <div>Holacito</div>
      <Posts />
    </ErrorBoundary>
  </div>
);

export default App;
