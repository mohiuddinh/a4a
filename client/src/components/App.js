import React, { Component } from "react";
// import { Router } from "@reach/router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Header from "./pages/Header.js";
import Post from "./pages/Post.js";
import Questions from "./pages/Questions.js";
import EECS from "./pages/EECS.js"
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
      userId: undefined,
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
    this.setState({ userId: undefined });
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
        <Router>
          <Header />
          <Background />
          <Switch>
            <Route  path="/change-password" exact component={ChangePassword} />
            <Route  path="/post" exact component={Post} />
            {/* <Route path='/questions/:questionId' exact component={SinglePostPage} /> */}
            <SinglePostPage path='/questions/:questionId' />
            <Route  path="/questions" exact component={Questions} />
            <Route  path="/login" exact component={Login} />
            <Route  path="/register" exact component={Register} />
            <Route  path="/" exact component={Home} />
            <Route  path="/EECS" exact component={EECS} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
