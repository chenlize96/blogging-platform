const Profile = require("./schemas").Profile;

function getUsers(req, res) {
  let target = req.params.user; // endpoint
  let username = req.username; // current username
  if (target) {
    username = target;
  }
  Profile.findOne({ username: username }).exec(function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    if (!data) {
      return res.status(400).send({ result: "User does not exist" });
    }
    return res
      .status(200)
      .send({ username: data.username, following: data.followedUsers });
  });
}

function addUser(req, res) {
  let newUser = req.params.user; // endpoint
  let username = req.username; // current username
  if (username === newUser) {
    return res.status(400).send({ result: "Cannot add yourself" });
  }
  Profile.findOne({ username: username }).exec(function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    // if (!data) {
    //   return res.status(400).send({ result: "User does not exist" });
    // }
    // if (data.followedUsers.includes(newUser)) {
    //   return res.status(400).send({ result: "User already exists" });
    // }
    data.followedUsers.push(newUser);
    return res
      .status(200)
      .send({ username: data.username, following: data.followedUsers });
  });
}

function removeUser(req, res) {
  let newUser = req.params.user; // endpoint
  let username = req.username; // current username
  if (username === newUser) {
    return res.status(400).send({ result: "Cannot delete yourself" });
  }
  Profile.findOne({ username: username }).exec(function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    // if (!data.followedUsers.includes(newUser)) {
    //   return res.status(400).send({ result: "User does not exists" });
    // }
    let newFollowing = data.followedUsers.filter((user) => user !== newUser);
    return res
      .status(200)
      .send({ username: data.username, following: newFollowing });
  });
}

module.exports = (app) => {
  app.get("/following/:user?", getUsers);
  app.put("/following/:user", addUser);
  app.delete("/following/:user", removeUser);
};
