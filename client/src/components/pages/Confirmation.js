import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { navigate } from "@reach/router";

function Confirmation(props) {
  const token = props.token;
  console.log(token);

  fetch(`/api/confirmation/${token}`).then((res) => {
    console.log(res.status);
    navigate("/login");
  });

  return (
    <div>
      <h1>HIHIHI</h1>
    </div>
  );
}

export default Confirmation;
