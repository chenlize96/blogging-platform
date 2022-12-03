const User = require("./schemas").User;
const Profile = require("./schemas").Profile;
const Article = require("./schemas").Article;
let sessionUser = {};
let cookieKey = "sid";
const md5 = require("md5");

function isLoggedIn(req, res, next) {
  // likely didn't install cookie parser
  if (!req.cookies) {
    return res.sendStatus(401);
  }
  let sid = req.cookies[cookieKey];
  // no sid for cookie key
  if (!sid) {
    return res.sendStatus(401);
  }
  let username = sessionUser[sid];
  // no username mapped to sid
  if (username) {
    req.username = username;
    next();
  } else {
    return res.sendStatus(401);
  }
}

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  // supply username and password
  if (!username || !password) {
    return res.sendStatus(400);
  }
  User.find({ username: username }, function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    if (data.length === 0) {
      return res.sendStatus(401);
    }
    let cur = data[0];
    let hash = md5(password + cur.salt);
    if (hash === cur.hash) {
      let sid = req.cookies[cookieKey];
      sessionUser[sid] = username;
      // Adding cookie for session id
      res.cookie(cookieKey, sid, {
        maxAge: 3600 * 1000,
        httpOnly: true,
        SameSite: "None",
        secure: true,
      });
      let msg = { username: username, result: "success" };
      return res.status(200).send(msg);
    } else {
      return res.sendStatus(401);
    }
  });
}

function register(req, res) {
  // Application/JSON -> Postman -> Body -> JSON {"username": "zzzz", "password": 1234}
  // { username, email, dob, zipcode, password}
  let username = req.body.username;
  let email = req.body.email;
  let dob = req.body.dob;
  let zipcode = req.body.zipcode;
  let password = req.body.password;
  // supply username and password
  if (!username || !email || !dob || !zipcode || !password) {
    return res.sendStatus(400);
  }
  User.find({ username: username }, function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    if (data.length > 0) {
      return res.status(400).send({ result: "Username already exists" });
    }
    let salt = username + new Date().getTime();
    let hash = md5(password + salt);
    createUser(username, salt, hash);
    createProfile(username, email, zipcode, dob);
    let msg = { result: "success", username: username };
    res.send(msg);
  });
}

function logout(req, res) {
  let sid = req.cookies[cookieKey];
  delete sessionUser[sid];
  // res.clearCookie(cookieKey);
  res.send("OK");
}

async function createUser(username, salt, hash) {
  return new User({
    username: username,
    salt: salt,
    hash: hash,
  }).save();
}

async function createProfile(username, email, zipcode, dob) {
  return new Profile({
    username: username,
    email: email,
    zipcode: zipcode,
    dob: dob,
    headline: "Input your status",
    following: [],
    avatar: "https://i.postimg.cc/fW7KK5F0/1.png", // default
  }).save();
}

function updatePassword(req, res) {
  let username = req.username;
  let newPassword = req.body.password;
  // console.log(newPassword);
  if (!newPassword) {
    return res.sendStatus(400);
  }
  // update salt and hash
  let salt = username + new Date().getTime();
  let hash = md5(newPassword + salt);
  User.findOneAndUpdate(
    { username: username },
    { salt: salt, hash: hash },
    { new: true },
    function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      let msg = { username: data.username, result: "success" };
      res.send(msg);
    }
  );
}

// personal usage
function deleteUser(req, res) {
  let username = req.params.user;
  User.deleteOne({ username: username }, function (err, obj) {});
  Profile.deleteOne({ username: username }, function (err, obj) {});
  Article.deleteOne({ author: username }, function (err, obj) {});
  let msg = {
    username: username,
    result: "delete all infos about " + username,
  };
  res.send(msg);
}

module.exports = (app) => {
  app.post("/login", login);
  app.post("/register", register);
  app.delete("/delete/:user", deleteUser);
  app.use(isLoggedIn);
  app.put("/logout", logout);
  app.put("/password", updatePassword);
};
