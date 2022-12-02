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
      .send({ username: data.username, following: data.following });
  });
}

function addUser(req, res) {
  let newUser = req.params.user; // endpoint
  let username = req.username; // current username
  if (username === newUser) {
    return res.status(400).send({ result: "Cannot add yourself" });
  }
  Profile.findOne({ username: newUser }).exec(function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    if (!data) {
      return res.status(400).send({ result: "User does not exist" });
    } else {
      Profile.findOne({ username: username }).exec(function (err, data) {
        if (err) {
          return res.status(500).send({ result: "Server Error" });
        }
        // if (!data) {
        //   return res.status(400).send({ result: "User does not exist" });
        // }
        // if (data.following.includes(newUser)) {
        //   return res.status(400).send({ result: "User already exists" });
        // }
        let newFollowing = data.following;
        newFollowing.push(newUser);
        Profile.findOneAndUpdate(
          { username: username },
          { following: newFollowing },
          { new: true },
          function (err, data) {
            if (err) {
              return res.status(500).send({ result: "Server Error" });
            }
            return res
              .status(200)
              .send({ username: data.username, following: data.following });
          }
        );
      });
    }
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
    // if (!data.following.includes(newUser)) {
    //   return res.status(400).send({ result: "User does not exists" });
    // }
    let newFollowing = data.following.filter((user) => user !== newUser);
    Profile.findOneAndUpdate(
      { username: username },
      { following: newFollowing },
      { new: true },
      function (err, data) {
        if (err) {
          return res.status(500).send({ result: "Server Error" });
        }
        return res
          .status(200)
          .send({ username: data.username, following: data.following });
      }
    );
  });
}

module.exports = (app) => {
  app.get("/following/:user?", getUsers);
  app.put("/following/:user", addUser);
  app.delete("/following/:user", removeUser);
};
