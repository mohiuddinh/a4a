import React, { Component } from "react";
// import ParticleComponent from "./ParticleComponent";
import "../../css/Background.css";
import ParticlesBg from "particles-bg";

class Background extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   color: this.props.color,
    // };
  }


  render() {
    return <ParticlesBg num={25} type="cobweb" bg={true} color={this.props.color} />; //code used from react particle-bg library (https://www.npmjs.com/package/particles-bg)
  }
}

export default Background;
