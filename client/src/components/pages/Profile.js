import React, { Component } from "react";
import { get } from "../../utilities.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { navigate } from "@reach/router";
import SingleQuestion from "./SingleQuestion.js";
import EditProfile from "./EditProfile.js";
import Background from "./Background.js";

import "../../css/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading1: true,
      loading2: true,
      email: "",
      description: "",
      username: "",
      iconColor: "",
      major: "",
      occupation: "",
      questions: [],
    };
  }

  componentDidMount() {
    get(`/api/profile_by_id/${this.props.id}`).then((res) => {
      console.log(res.user);
      const { description, username, iconColor, major, occupation, email } = res.user[0];
      this.setState({
        description: description,
        username: username,
        email: email,
        iconColor: iconColor,
        major: major,
        occupation: occupation,
        loading1: false,
      });
      get(`/api/question_by_user_id/${this.props.id}`).then((questionObjs) => {
        console.log(questionObjs);
        let reversedObjs = questionObjs.reverse();
        this.setState({
          loading2: false,
          questions: reversedObjs,
        });
      });
    });
  }

  newPage = () => {
    console.log(this.props.id);
    navigate(`/profile/edit/${this.props.id}`).then(() => {
      return (
        <EditProfile
          userId={this.props.id}
          description={this.state.description}
          iconColor={this.state.iconColor}
          major={this.state.major}
          occupation={this.state.occupation}
          email={this.state.email}
        />
      );
    });
  };

  render() {
    if (this.state.loading1 && this.state.loading2) {
      return <div>Loading...</div>;
    }

    let questionsList = null;
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        return (
          <SingleQuestion
            key={questionObj._id}
            questionId={questionObj._id}
            subject={questionObj.subject}
            tag={questionObj.tag}
            question={questionObj.question}
            username={questionObj.writer.username}
            userId={this.props.userId}
            url={`/questions/${questionObj._id}`}
            writerId={questionObj.writer._id}
            timestamp={questionObj.createdAt}
          />
        );
      });
    } else {
      questionsList = <p>No Posts</p>;
    }

    return (
      <div className="profile">
        <Background color={"525252"} />
        <div className="profile__container">
          <div className="profile__info">
            <div className="profile__infoSub">
              <AccountCircleIcon style={{ color: this.state.iconColor }} fontSize="large" />
            </div>
            <div className="profile__infoSub">{this.state.username}</div>
            <div className="profile__infoSub">
              <span>Major:</span>
              {this.state.major}
            </div>
            <div className="profile__infoSub">
              <span>Year:</span>
              {this.state.occupation}
            </div>
            <div className="profile__infoSub">{this.state.email}</div>
            <div className="profile__infoSub">
              {this.props.userId === this.props.id ? (
                <button className="btn-userActions btn-slide-edit" onClick={this.newPage}>
                  Edit
                </button>
              ) : null}
            </div>
          </div>
          <div className="profile__main">
            <div className="profile__mainBio">
              <span>Bio:</span>
              <p>{this.state.description}</p>
            </div>
            <div className="profile__mainPosts">
              <span>Posts</span>
              {questionsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
