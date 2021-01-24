import { navigate } from "@reach/router";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { post } from "../../utilities";

//props: questionId, commentId, userId

function Delete(props) {
  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let variable = {};

              if (props.question){
                console.log('questions')
                variable = { _id: props.questionId }
                post("/api/deletePost", variable)
                  .then((res) => {
                    console.log(res);
                    if (res.success) {
                      navigate("/");
                      //alert("Your question has been successfully deleted!");
                    } else {
                      alert("Oops, there was an error. Please try again later!");
                    }
                  })
              } else {
                console.log('comments');
                variable = { _id: props.commentId }
                console.log(variable); 
                post("/api/deleteComment", variable)
                  .then((res) => {
                    console.log(res);
                    if (res.success) {
                      window.location.reload();
                      //alert("Your comment has been successfully deleted!");
                    } else {
                      alert("Oops, there was an error. Please try again later!");
                    }
                  })
              }
              
              
            },
          },
        },
        {
          label: "No",
          onClick: () => console.log("clicked no"),
        },
      ],
    });
  };

  return (
    <div className="container">
      <button onClick={submit} className="btn-userActions btn-slide-delete">
        Delete
      </button>
    </div>
  );
}

export default Delete;
