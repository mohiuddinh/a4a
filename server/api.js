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

// import models so we can interact with the database
const User = require("./models/user");

// import bodyParser
const bodyParser = require("body-parser");

// import nodemailer
const nodemailer = require("nodemailer");

// import bcrypt
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// import from dotenv
const JWT_SECRET = process.env.JWT_SECRET_STR;
const EMAIL_SECRET = process.env.EMAIL_SECRET_STR;
const EMAIL_USERNAME = process.env.MIT_ASK_USERNAME;
const EMAIL_PASSWORD = process.env.MIT_ASK_PASSWORD;

// import jwt
const jwt = require("jsonwebtoken");

// import authentication library
// const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { _ } = require("core-js");

// router.post("/login", auth.login);
// router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/login", function (req, res, next) {
  return res.render("login", {});
});

router.get("/register", function (req, res, next) {
  return res.render("signup", {});
});

// change-password
router.post("/change-password", async (req, res) => {
  const { token, newPassword: plainTextPassword, newPasswordTwo } = req.body;

  console.log(req.body);

  var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (!regex.test(plainTextPassword)) {
    return res.json({ status: "error", error: "Password does not contain any special characters" });
  }

  if (plainTextPassword !== newPasswordTwo) {
    return res.json({ status: "error", error: "Passwords do not match" });
  }

  if (plainTextPassword.length < 8) {
    return res.json({
      status: "error",
      error: "Password too small. Should be at least 8 characters",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const _id = user.id;

    console.log(_id);

    const password = await bcrypt.hash(plainTextPassword, 10);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: ";))" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET);

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
});

// register
router.post("/register", async (req, res) => {
  const { fullName, username, email, password: plainTextPassword, passwordTwo } = req.body;

  // console.log(req.body);

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
      error: "Password too small. Should be at least 8 characters",
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

    console.log(user);

    try {
      var transporter = nodemailer.createTransport({
        service: "MIT Ask",
        auth: { user: EMAIL_USERNAME, pass: EMAIL_PASSWORD },
      });

      const emailToken = jwt.sign(
        {
          user: _.pick(user, "id"),
        },
        EMAIL_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const url = `http://localhost:3000/confirmation/${emailToken}`;

      await transporter.sendMail({
        from: "no-reply@mitask.com",
        to: user.email,
        subject: "Account Verification Token",
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      });
    } catch (error) {
      console.log(error);
    }
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
  // res.json({ status: "ok" });
});

router.get("/post", (req, res) => {
  // empty selector means get all documents
  Question.find({}).then((questions) => res.send(questions));
});

router.post("/post", (req, res) => {
  let newQuestion = new Question({
    subject: req.body.subject,
    tag: req.body.tag,
    question: req.body.question,
  });
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
