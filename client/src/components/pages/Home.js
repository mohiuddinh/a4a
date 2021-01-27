import SearchBar from "./SearchBar";
import React, { Component } from "react";
import Background from "./Background";
import { get, post } from '../../utilities.js'; 

class Home extends Component {

  componentDidMount() {
    post("/api/searchtags").then((res)=>{
      console.log(res); 
    })
  }

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
