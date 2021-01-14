import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Header from "./pages/Header.js";
import Post from "./pages/Post.js";
import Questions from "./pages/Questions.js";
import Background from "./pages/Background.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ChangePassword from "./pages/ChangePassword.js";
import SinglePostPage from './pages/SinglePostPage.js'; 

import "../css/utilities.css";
import "../css/App.css";
import "../css/scrollbar.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: null });
    post("/api/logout");
  };

  render() {
    return (
      <>
        {/* <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <NotFound default />
        </Router> */}
        <div>
        <Header />
          <Background />
          <Router>
            <ChangePassword  path="/change-password" />
            <Post  path="/post" />
            <SinglePostPage path='/questions/:questionId' />
            <Questions path="/questions" />
            <Login  path="/login"/>
            <Register  path="/register"/>
            <Home  path="/" />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
