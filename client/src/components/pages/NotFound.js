import React, { Component } from "react";
import Background from "./Background.js";

import "../../css/NotFound.css";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="notFound">
        <Background color={"525252"} />
        <h5>404 Not Found. The page you requested couldn't be found.</h5>
      </div>
    );
  }
}

export default NotFound;
