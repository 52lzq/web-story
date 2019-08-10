import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./views";

const App = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
