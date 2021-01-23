import React, { Component } from "react";
import { Router, Link, Redirect, navigate } from "@reach/router";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Header from "./pages/Header.js";
import Post from "./pages/Post.js";
import Questions from "./pages/Questions.js";
import Background from "./pages/Background.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import EmailPasswordLink from "./pages/EmailPasswordLink.js";
import SinglePostPage from "./pages/SinglePostPage.js";
import Confirmation from "./pages/Confirmation.js";
import ResetPassword from "./pages/ResetPassword.js";
import Edit from './pages/Edit.js'; 
import SearchResults from './pages/SearchResults.js'; 
import NoResults from './pages/NoResults'; 
import EECS from "./pages/EECS.js";
import Physics from "./pages/Physics.js";
import Math from './pages/Math.js'; 
import Chemistry from './pages/Chemistry.js'; 
import Econ from './pages/Econ.js'; 
import Social from './pages/Social.js'; 
import Clubs from './pages/Clubs.js'; 

import "../css/utilities.css";
import "../css/App.css";
import "../css/scrollbar.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  liftStateUp = (data) => {
    this.setState({ userId: data });
  };

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user) {
        this.setState({ userId: user.id });
      }
    });
  }

  handleLogout = () => {
    this.setState({ userId: null });
    post("/api/logout").then(()=>{
      navigate('/')
    });
  };

  render() {
    return (
      <>
        <div>
          <Header userId={this.state.userId} handleLogout={this.handleLogout} />
          <Background />
          <Router>
            <ResetPassword path="/reset-password/:token" />
            <EmailPasswordLink path="/email-password-link" />
            <Confirmation path="/confirmation/:token" />
            <SearchResults path="/questions/search/:query" />
            <NoResults path="/questions/noresults" />
            {this.state.userId ? (
              <Post path="/post" writerId={this.state.userId} />
            ) : (
              <Redirect from="/post" to="/login" />
            )}
            <Edit path="/questions/edit/:questionId" writerId={this.state.userId} />
            <SinglePostPage path="/questions/:questionId" writerId={this.state.userId} />
            <Questions path="/questions" userId={this.state.userId} />
            <EECS path="/questions/eecs" userId={this.state.userId} />
            <Physics path="/questions/physics" userId={this.state.userId} />
            <Math path="/questions/math" userId={this.state.userId} />
            <Chemistry path="/questions/chemistry" userId={this.state.userId} />
            <Econ path="/questions/econ" userId={this.state.userId} />
            <Social path="/questions/social" userId={this.state.userId} />
            <Clubs path="/questions/clubs" userId={this.state.userId} />
            {this.state.userId ? (
              <Redirect from="/login" to="/" />
            ) : (
              <Login path="/login" liftStateUp={this.liftStateUp} />
            )}
            <Register path="/register" />
            <Home path="/" />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
