import React, { Component } from "react";
import ReactDom from "react-dom";
import Home from "./views/home";

const App = () => {
  const a = { name: 2 };
  const b = new Promise((res, rej) => {
    const xx = { ...a };
    res(xx);
  });
  b.then(console.log);

  return (
    <div>
      <Home />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
