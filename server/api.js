/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const Question = require("./models/question");
const Comment = require("./models/comment");
const Like = require("./models/like");
const Dislike = require("./models/dislike");
const mongoose = require("mongoose");

// import models so we can interact with the database
const User = require("./models/user");

// import bodyParser
const bodyParser = require("body-parser");

// import nodemailer
const nodemailer = require("nodemailer");

// import crypto
// const crypto = require("crypto");

// import atob
const atob = require("atob");

// import bcrypt
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const axios = require('axios'); 

dotenv.config();

// import from dotenv
const JWT_SECRET = process.env.JWT_SECRET_STR;
const EMAIL_SECRET = process.env.EMAIL_SECRET_STR;
const EMAIL_USERNAME = process.env.MIT_ASK_USERNAME;
const EMAIL_PASSWORD = process.env.MIT_ASK_PASSWORD;

// import jwt
const jwt = require("jsonwebtoken");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { _ } = require("core-js");
const { resolve } = require("../webpack.config");
const { isValidObjectId } = require("mongoose");

// router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.session.user) {
    // not logged in
    return res.send({});
  }
  //console.log(res);
  return res.send(req.session.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.session.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// router.get("/login", function (req, res, next) {
//   return res.render("login", {});
// });

// router.get("/register", function (req, res, next) {
//   return res.render("signup", {});
// });

// reset-password
router.post("/reset-password/:token", async (req, res) => {
  console.log("Accessed reset-password endpoint");
  const { token } = req.params;
  const { password, passwordTwo } = req.body;

  try {
    const result = jwt.verify(token, EMAIL_SECRET);
    const id = result.user;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({ status: "noUserFound" });
    } else {
      var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

      if (!password || typeof password !== "string") {
        return res.json({ status: "error", error: "Invalid password" });
      }

      if (!regex.test(password)) {
        return res.json({
          status: "error",
          error: "Password does not contain any special characters",
        });
      }

      if (password !== passwordTwo) {
        return res.json({ status: "error", error: "Passwords do not match" });
      }

      if (password.length < 8) {
        return res.json({
          status: "error",
          error: "Password is too small. It should be at least 8 characters long",
        });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      await User.updateOne(
        { _id: id },
        {
          $set: { password: passwordHashed },
        }
      );
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "tokenExpired" });
  }
});

// email-password-link
router.post("/email-password-link", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    console.log("user does not exists");
    return res.json({ status: "error" });
  } else {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD },
    });

    jwt.sign({ user: user._id }, EMAIL_SECRET, { expiresIn: 900 }, (err, emailToken) => {
      const url = `https://mit-ask.herokuapp.com/reset-password/${emailToken}`;

      transporter.sendMail({
        from: EMAIL_USERNAME,
        to: user.email,
        subject: "Reset Password for your MIT Ask Account",
        html: `Please click on this link to reset your password: <a href="${url}">${url}</a>`,
      });
    });
    return res.json({ status: "ok" });
  }
});

// login
router.post("/login", async (req, res) => {
  //console.log("Accessed login endpoint");
  const { username, password } = req.body;
  try {
    User.findOne({ username }).then(async (user) => {
      if (!user) {
        //console.log("Accessed login enpoint 2");
        return res.json({ status: "error", error: "Invalid username/password" });
      } else if (!user.isVerified) {
        //console.log("Accessed login enpoint 3");
        return res.json({ status: "error", error: "Your account has not been verified yet" });
      }

      if (await bcrypt.compare(password, user.password)) {
        const sessUser = { id: user._id, username: user.username };
        req.session.user = sessUser;
        const token = jwt.sign(sessUser, JWT_SECRET);
        return res.json({ status: "ok", data: token, userInfo: sessUser });
      } else {
        return res.json({ status: "error", error: "Incorrect password" });
      }
      // the username, password combination is successful
    });
  } catch (e) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
});

// confirmation
router.get("/confirmation/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const result = jwt.verify(token, EMAIL_SECRET);
    const id = result.user;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.json({ status: "noUserFound" });
    } else if (user.isVerified) {
      return res.json({ status: "alreadyVerified" });
    } else {
      await User.updateOne(
        { _id: id },
        {
          $set: { isVerified: true },
        }
      );
      return res.json({ status: "Verified" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: e });
  }
  return res.send({ status: "success!" });
});

// register
router.post("/register", async (req, res) => {
  const { fullName, username, email, password: plainTextPassword, passwordTwo } = req.body;

  var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (!regex.test(plainTextPassword)) {
    return res.json({ status: "error", error: "Password does not contain any special characters" });
  }

  if (plainTextPassword !== passwordTwo) {
    return res.json({ status: "error", error: "Passwords do not match" });
  }

  if (plainTextPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password is too small. It should be at least 8 characters long",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const user = await User.create({
      fullName,
      username,
      email,
      password,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD },
    });

    jwt.sign({ user: user._id }, EMAIL_SECRET, (err, emailToken) => {
      const url = `https://mit-ask.herokuapp.com/confirmation/${emailToken}`;

      transporter.sendMail({
        from: EMAIL_USERNAME,
        to: user.email,
        subject: "Account Verification Token",
        html: `Please click on this link to confirm your email: <a href="${url}">${url}</a>`,
      });
    });
    console.log("User created successfully:", user);
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.keyPattern.username) {
      // duplicate key
      return res.json({ status: "error", error: "Username already exists" });
    } else if (error.keyPattern.email) {
      return res.json({ status: "error", error: "A username with this email already exists" });
    }
    throw error;
  }
  res.json({
    status: "ok",
    ok: "An email with the verification link has been sent! Please check your inbox or junk mail!",
  });
});

router.get("/post", (req, res) => {
  // empty selector means get all documents
  Question.find({}).populate('writer').then((questions) => res.send(questions));
});

router.post("/search", (req, res) => {
  console.log(req.body.query); 
  let userPattern = new RegExp(req.body.query)
  Question.find({subject: {$regex:userPattern}})
  .select("_id subject")
  .then((question)=>{
    console.log(question)
    res.json(question)
  }).catch(err=>{
    console.log(err)
  })
});

router.post("/post", auth.ensureLoggedIn, (req, res) => {
  // console.log(req.body);
  let newQuestion = new Question(req.body);
  // console.log(newQuestion);
  newQuestion.save().then((question) => res.send(question));
});

router.get("/question_by_id", (req, res) => {
  let type = req.query.type;
  let questionId = req.query.id;

  if (type === "array") {
  }
  Question.find({ _id: { $in: questionId } })
    .populate("writer")
    .exec((err, product) => {
      if (err) {
        return req.status(400).send(err);
      }
      return res.status(200).send(product);
    });
});

router.post("/saveComment", auth.ensureLoggedIn, (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({ questionId: req.body.questionId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getLikes", (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", auth.ensureLoggedIn, (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(variable);
  //save the like information data in MongoDB
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    //In case disLike Button is already clicked, we need to decrease the dislike by 1
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", auth.ensureLoggedIn, (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/unDisLike", auth.ensureLoggedIn, (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDisLike", auth.ensureLoggedIn, (req, res) => {
  let variable = {};
  if (req.body.questionId) {
    variable = { questionId: req.body.questionId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const disLike = new Dislike(variable);
  //save the like information data in MongoDB
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    //In case Like Button is already clicked, we need to decrease the like by 1
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post('/deletePost', auth.ensureLoggedIn, (req, res) => {
  console.log(req.body); 
  Question.findOneAndDelete(req.body).exec((err, deleteResult)=>{
    if (err) res.status(400).json( {success: false, err} ); 
    res.status(200).json({ success: true })
  })
});

router.post('/deleteComment', auth.ensureLoggedIn, (req, res) => {
  Comment.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { writer: mongoose.Types.ObjectId("6009d372cad12d0733b393d5"), content: "[removed]" } },
    { returnOriginal: false }
  ).exec((err, result) => {
    if (err) res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, data: result });
  });
});

router.post('/updatePost', auth.ensureLoggedIn, (req, res) => {
  Question.findOneAndUpdate(
    { _id: req.body._id }, 
    { $set: { subject: req.body.subject, tag: req.body.tag, question: req.body.question } }, 
    { returnOriginal: false }).exec((err, result)=>{
      if (err) res.status(400).json({ success: false, err }); 
      res.status(200).json({ success: true, data: result }); 
    })
  }); 


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
