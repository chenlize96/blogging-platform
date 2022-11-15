// this is profile.js which contains all user profile
// information except passwords which is in auth.js

const profile = {
  username: "DLeebron",
  headline: "This is my headline!",
  email: "foo@bar.com",
  zipcode: 12345,
  dob: "128999122000",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg",
};

// const getHeadline = (req, res) => {
// user = ...
// // this return the requested user headline
// res.send({ username: user[username], headline: user[headline] })
// }

module.exports = (app) => {
  app.get("/headline/:user?", getHeadline);
};
