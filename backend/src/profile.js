// this is profile.js which contains all user profile
// information except passwords which is in auth.js
const Profile = require("./schemas").Profile;
const uploadImage = require("./uploadCloudinary");

const profile = {
  username: "DLeebron",
  headline: "This is my headline!",
  email: "foo@bar.com",
  zipcode: 12345,
  dob: "128999122000",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg",
};

function getHeadline(req, res) {
  let target = req.params.user; // endpoint
  let username = req.username; // current username
  if (target) {
    Profile.findOne({ username: target }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      if (!data) {
        return res.status(400).send({ result: "User does not exist" });
      }
      return res
        .status(200)
        .send({ username: data.username, headline: data.headline });
    });
  } else {
    // there is no :user
    Profile.findOne({ username: username }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res
        .status(200)
        .send({ username: data.username, headline: data.headline });
    });
  }
}

function updateHeadine(req, res) {
  let username = req.username;
  let newHeadline = req.body.headline;
  if (!newHeadline) {
    return res.sendStatus(400);
  }
  Profile.findOneAndUpdate(
    { username: username },
    { headline: newHeadline },
    { new: true },
    function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res
        .status(200)
        .send({ username: data.username, headline: data.headline });
    }
  );
}

function getEmail(req, res) {
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
    return res.status(200).send({ username: data.username, email: data.email });
  });
}

function updateEmail(req, res) {
  let username = req.username;
  let newEmail = req.body.email;
  if (!newEmail) {
    return res.sendStatus(400);
  }
  Profile.findOneAndUpdate(
    { username: username },
    { email: newEmail },
    { new: true },
    function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res
        .status(200)
        .send({ username: data.username, email: data.email });
    }
  );
}

function getZipcode(req, res) {
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
      .send({ username: data.username, zipcode: data.zipcode });
  });
}

function updateZipcode(req, res) {
  let username = req.username;
  let newZipcode = req.body.zipcode;
  if (!newZipcode) {
    return res.sendStatus(400);
  }
  Profile.findOneAndUpdate(
    { username: username },
    { zipcode: newZipcode },
    { new: true },
    function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res
        .status(200)
        .send({ username: data.username, zipcode: data.zipcode });
    }
  );
}

function getAvatar(req, res) {
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
      .send({ username: data.username, avatar: data.avatar });
  });
}

function updateAvatar(req, res) {
  let username = req.username;
  let newAvatar = req.fileurl;
  // console.log(newAvatar);
  // let newAvatar = req.body.avatar;
  if (!newAvatar) {
    return res.sendStatus(400);
  }
  Profile.findOneAndUpdate(
    { username: username },
    { avatar: newAvatar },
    { new: true },
    function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res
        .status(200)
        .send({ username: data.username, avatar: data.avatar });
    }
  );
}

function getDob(req, res) {
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
    return res.status(200).send({ username: data.username, dob: data.dob });
  });
}

module.exports = (app) => {
  app.get("/headline/:user?", getHeadline);
  app.put("/headline", updateHeadine);
  app.get("/email/:user?", getEmail);
  app.put("/email", updateEmail);
  app.get("/zipcode/:user?", getZipcode);
  app.put("/zipcode", updateZipcode);
  app.get("/avatar/:user?", getAvatar);
  app.put("/avatar", uploadImage("avatar"), updateAvatar);
  // app.put("/avatar", updateAvatar);
  app.get("/dob/:user?", getDob);
};
