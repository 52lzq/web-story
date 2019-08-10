import React from "react";
import { Header, Paper } from "@/components";
import Body from "./body";

const Home = () => {
  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Header />
      </div>
      <Body />
      {/* <Paper /> */}
    </div>
  );
};

export default Home;
