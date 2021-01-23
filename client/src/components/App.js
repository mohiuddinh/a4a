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

  liftStateUp = (data) => {
    this.setState({ userId: data });
  };

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user.id });
      }
    });
  }

  // handleLogin = (res) => {
  //   console.log(`Logged in as ${res.profileObj.name}`);
  //   const userToken = res.tokenObj.id_token;
  //   post("/api/login", { token: userToken }).then((user) => {
  //     this.setState({ userId: user.id });
  //     post("/api/initsocket", { socketid: socket.id });
  //   });
  // };

  handleLogout = () => {
    this.setState({ userId: null });
    post("/api/logout");
  };

  // fixed Login and Register spelling

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
          <Header userId={this.state.userId} handleLogout={this.handleLogout} />
          <Background />
          <Router>
            <ResetPassword path="/reset-password/:token" />
            <EmailPasswordLink path="/email-password-link" />
            <Confirmation path="/confirmation/:token" />
            {this.state.userId ? <Post  path="/post" writerId={this.state.userId}/> : <Redirect from='/post' to='/login' />}
            <SearchResults path='/questions/search/:query' />
            <NoResults path='/questions/noresults' />
            <Edit path='/questions/edit/:questionId' writerId={this.state.userId} />
            <SinglePostPage path='/questions/:questionId' writerId={this.state.userId}/>
            <Questions path="/questions" userId={this.state.userId}/>
            {this.state.userId ? <Redirect from='/login' to='/' /> : <Login  path="/login" liftStateUp={this.liftStateUp}/>}
            <Register  path="/register"/>
            <Home  path="/" />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
