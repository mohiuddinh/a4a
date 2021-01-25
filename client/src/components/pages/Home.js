import SearchBar from "./SearchBar";
import React, { Component } from "react";
import Background from "./Background";

class Home extends Component {
  render() {
    return (
      <div>
        <Background color={"525252"} />
        <SearchBar url="search" />
      </div>
    );
  }
}

export default Home;
