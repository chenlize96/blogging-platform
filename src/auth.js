let sessionUser = {};
let cookieKey = "sid";
const md5 = require("md5");

let userObjs = {};

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

  let user = userObjs[username];

  if (!user) {
    return res.sendStatus(401);
  }

  // TODO: create hash using md5, user salt and request password, check if hash matches user hash
  let hash = md5(password + user.salt);

  if (hash === user.hash) {
    // TODO: create session id, use sessionUser to map sid to user username
    // let sid = 0 // CHANGE THIS!

    let sid = req.cookies[cookieKey];
    sessionUser[sid] = username;

    // Adding cookie for session id
    res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true });
    let msg = { username: username, result: "success" };
    res.send(msg);
  } else {
    res.sendStatus(401);
  }
}

function register(req, res) {
  // Application/JSON -> Postman -> Body -> JSON {"username": "zzzz", "password": 1234}
  let username = req.body.username;
  let password = req.body.password;
  // supply username and password
  if (!username || !password) {
    return res.sendStatus(400);
  }

  let salt = username + new Date().getTime();
  // let hash = 0 // TODO: Change this to use md5 to create a hash
  let hash = md5(password + salt);
  // TODO: Change this to store object with username, salt, hash
  userObjs[username] = { username, salt, hash };

  let msg = { username: username, result: "success" };
  res.send(msg);
}

module.exports = (app) => {
  app.post("/login", login);
  app.post("/register", register);
  app.use(isLoggedIn);
};
