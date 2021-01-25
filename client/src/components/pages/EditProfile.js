import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";
import ReactHtmlParser from "react-html-parser";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/EditProfile.css";

class EditProfile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     subject: "",
  //     tag: "",
  //     question: "",
  //     loading: true,
  //   };
  // }

  // componentDidMount() {
  //   get(`/api/question_by_id?id=${this.props.questionId}&type=single`).then((res) => {
  //     this.setState({
  //       subject: res[0].subject,
  //       tag: res[0].tag,
  //       question: res[0].question,
  //       loading: false,
  //     });
  //   });
  // }

  // liftStateUp = (data) => {
  //   this.setState({ question: data });
  // };

  // onChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { subject, tag, question } = this.state;
  //   const _id = this.props.questionId;
  //   post("/api/updatePost", { subject, tag, question, _id }).then((res) => {
  //     navigate(`/questions/${_id}`);
  //   });
  // };

  render() {
    const selectedTags = (tags) => {
      // this.setState({ tag: tags });
    };

    return (
      <div className="editProfile">
        <div className="editProfile__container">
          <form>
            <div className="editProfile__info">
              <div className="editProfile__infoContainer">
                <div className="editProfile__infoSub">
                  <AccountCircleIcon style={{ color: "" }} fontSize="large" />
                </div>
                <div className="editProfile__infoSub">
                  <span>howranwin</span>
                </div>
                <div className="editProfile__infoSub">
                  <span>whr123948@gmail.com</span>
                </div>
              </div>
              <div className="editProfile__infoContainer">
                <div className="editProfile__infoSub">
                  <label htmlFor="tags">Tags</label>
                  <TagsInput selectedTags={selectedTags} tags={[]} />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="major">Major</label>
                  <input
                    type="text"
                    placeholder="i.e. Course 6, Course 8"
                    className="editProfile__textInput"
                    required
                  />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="occupation">Year/Position</label>
                  <input
                    type="text"
                    placeholder="i.e. Sophomore"
                    className="editProfile__textInput"
                    required
                  />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="iconCOlor">Icon Color</label>
                  <select name="iconColor" id="iconColor">
                    <option value="#45b3e0">torquoise-ish</option>
                    <option value="#f85959">calm orange</option>
                    <option value="#36bd4f">bright green</option>
                    <option value="#ffa812">sorta orange</option>
                    <option value="#8a2be2">purple sorta</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="editProfile__bio">
              <label htmlFor="Bio">Biography</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="type your bio in here :)"
                required
              ></textarea>
            </div>
            <div className="editProfile__submit">
              <input type="submit" value="Submit" className="btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
