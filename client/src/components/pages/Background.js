import React, { Component } from "react";
// import ParticleComponent from "./ParticleComponent";
import "../../css/Background.css";
import ParticlesBg from "particles-bg";

class Background extends Component {
  render() {
    return <ParticlesBg num={25} type="cobweb" bg={true} />;
  }
}

export default Background;
