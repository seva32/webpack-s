import React, { useState } from "react";
import "./home.css";
import "./home.scss";
import * as Styles from "./home.style";

function Home() {
  const [name, setName] = useState("Seb");
  return (
    <div>
      <h1>Home Pages Now Ready</h1>
      <p className="para">Un ejemplo de paragraph tambien</p>
      <div className="bck" />
      <button
        type="button"
        onClick={() => {
          setName("Nemo");
        }}
      >
        {name}
      </button>
      <Styles.StyledImage />
    </div>
  );
}

export default Home;
