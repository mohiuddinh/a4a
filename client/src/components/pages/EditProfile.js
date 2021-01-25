import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";
import ReactHtmlParser from "react-html-parser";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/EditProfile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      description: "",
      username: "",
      iconColor: "",
      major: "",
      occupation: "", 
      email: "", 
      tag: []
    };
  }

  componentDidMount() {
    get(`/api/profile_by_id/${this.props.id}`).then((res) => {
      console.log(res.user);
      const { description, username, iconColor, major, occupation, email, tag } = res.user[0];
      this.setState({
        loading: false,
        description: description,
        username: username,
        iconColor: iconColor,
        major: major,
        occupation: occupation, 
        email: email, 
        tag: tag
      });
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description, iconColor, major, occupation, tag } = this.state;
    const _id = this.props.id;
    post("/api/updateProfile", { description, iconColor, major, occupation, tag, _id }).then((res) => {
      console.log(res); 
      navigate(`/profile/${_id}`);
    });
  };

  render() {
    if(this.state.loading){
      return (<div>Loading...</div>)
    }

    const selectedTags = (tags) => {
      this.setState({ tag: tags });
    };
    
    const color = this.state.iconColor; 
    const { description, iconColor, major, occupation, tag } = this.state;

    return (
      <div className="editProfile">
        <div className="editProfile__container">
          <form onSubmit={this.handleSubmit}>
            <div className="editProfile__info">
              <div className="editProfile__infoContainer">
                <div className="editProfile__infoSub">
                  <AccountCircleIcon style={{ color: { color } }} fontSize="large" />
                </div>
                <div className="editProfile__infoSub">
                  <span>{this.state.username}</span>
                </div>
                <div className="editProfile__infoSub">
                  <span>{this.state.email}</span>
                </div>
              </div>
              <div className="editProfile__infoContainer">
                <div className="editProfile__infoSub">
                  <label htmlFor="tags">Tags</label>
                  <TagsInput selectedTags={selectedTags} tags={this.state.tag} value={tag} />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="major">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={major}
                    onChange={this.onChange}
                    placeholder="i.e. Course 6, Course 8"
                    className="editProfile__textInput"
                    required
                  />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="occupation">Year/Position</label>
                  <input
                    type="text"
                    name="occupation"
                    value={occupation}
                    onChange={this.onChange}
                    placeholder="i.e. Sophomore"
                    className="editProfile__textInput"
                    required
                  />
                </div>
                <div className="editProfile__infoSub">
                  <label htmlFor="iconCOlor">Icon Color</label>
                  <select
                    name="iconColor"
                    id="iconColor"
                    value={iconColor}
                    onChange={this.onChange}
                  >
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
                name="description"
                value={description}
                onChange={this.onChange}
                cols="30"
                rows="10"
                placeholder="type your bio in here :)"
                required
              ></textarea>
            </div>
            <div className="editProfile__submit">
              <input type="submit" value="Save" className="btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
