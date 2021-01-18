import React, { Component, useState, useEffect } from "react";
import { Link } from "@reach/router";

import "../../css/Confirmation.css";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

function Confirmation(props) {
  const [verificationMessage, setVerificationMessage] = useState("");
  const token = props.token;
  // console.log(token);

  useEffect(() => {
    fetch(`/api/confirmation/${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.status);
        if (data.status === "noUserFound") {
          setVerificationMessage("Uh oh, no user has been found with this email. ");
        } else if (data.status === "alreadyVerified") {
          setVerificationMessage("You have already been verified!");
        } else {
          setVerificationMessage("You have been successfully verified!");
        }
      });
  }, []);

  return (
    <div className="confirmation">
      <h5>
        <span id="verification-message">{verificationMessage}</span> Please navigate back to{" "}
        <Link to="/login" style={link_style}>
          <span className="confirmation__toLogin">login page</span>
        </Link>{" "}
        to sign on!
      </h5>
    </div>
  );
}

export default Confirmation;
