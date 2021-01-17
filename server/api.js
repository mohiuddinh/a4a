/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const Question = require('./models/question');
const Comment = require('./models/comment'); 
const Like = require('./models/like');
const Dislike = require('./models/dislike'); 

// import models so we can interact with the database
const User = require("./models/user");

// import bodyParser
const bodyParser = require("body-parser");

// import bcrypt
const bcrypt = require("bcryptjs");

// import jwt
const jwt = require("jsonwebtoken");
const JWT_SECRET = "askljdhaksh*&#^$*&@kjashdkjashd*&^1827368jkasdk87ty8asyuidhbkj";

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");


// router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.session.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.session.user);
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

// change-password
router.post("/change-password", async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be at least 6 characters",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const _id = user.id;

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
try{
  User.findOne({ username }).then(async (user) => {
    if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const sessUser = { id: user._id, username: user.username }
    req.session.user = sessUser; 
    //console.log(req.session.user);
    //res.json({ msg: 'Logged in successfully', sessUser});
    const token = jwt.sign( sessUser, JWT_SECRET);
    return res.json({ status: "ok", data: token, userInfo: sessUser });
  }
    // the username, password combination is successful
    
}); } catch(e){
  return res.json({ status: "error", error: "Invalid username/password" });}
});

// register
router.post("/register", async (req, res) => {
  const { username, password: plainTextPassword, passwordTwo, fullName, email } = req.body;

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
    console.log(plainTextPassword);
    console.log(passwordTwo);
    console.log(email);
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
    const response = await User.create({
      fullName,
      username,
      email,
      password,
    });
    console.log("User created successfully:", response);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already exists" });
    }
    throw error;
  }
  res.json({ status: "ok" });
});



router.get("/post", (req, res) => {
  // empty selector means get all documents
  Question.find({}).then((questions) => res.send(questions));
});

router.post('/post', auth.ensureLoggedIn, (req, res) => {
  let newQuestion = new Question(req.body); 
  newQuestion.save().then((question) => res.send(question));
})

router.get('/question_by_id', (req, res) => {
  let type = req.query.type; 
  let questionId = req.query.id; 

  if (type === 'array'){

  }
  Question.find({ '_id': {$in: questionId}}).populate('writer').exec((err, product) => {
    if (err) {return req.status(400).send(err)} 
    return res.status(200).send(product)
  })

})

router.post('/saveComment', auth.ensureLoggedIn, (req, res) => {
  const comment = new Comment(req.body) 

    comment.save((err, comment ) => {
        if(err) return res.json({ success:false, err})

        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.json({ success:false, err })
            return res.status(200).json({ success:true, result })
        })

    })
});


router.post("/getComments", (req, res) => {

    Comment.find({ "questionId": req.body.questionId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

router.post('/getLikes', (req, res) => {
  let variable = {}
  if(req.body.questionId){
    variable = {questionId: req.body.questionId}
  } else {
    variable = {commentId: req.body.commentId}
  }

  Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
}); 

router.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.questionId) {
        variable = { questionId: req.body.questionId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
}); 

router.post("/upLike", auth.ensureLoggedIn, (req, res) => {

    let variable = {}
    if (req.body.questionId) {
        variable = { questionId: req.body.questionId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const like = new Like(variable)
    //save the like information data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to decrease the dislike by 1 
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })
}); 

router.post("/unLike", auth.ensureLoggedIn, (req, res) => {

    let variable = {}
    if (req.body.questionId) {
        variable = { questionId: req.body.questionId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
}); 

router.post("/unDisLike", auth.ensureLoggedIn, (req, res) => {

    let variable = {}
    if (req.body.questionId) {
        variable = { questionId: req.body.questionId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })
});

router.post("/upDisLike", auth.ensureLoggedIn, (req, res) => {

    let variable = {}
    if (req.body.questionId) {
        variable = { questionId: req.body.questionId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })
}); 


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
