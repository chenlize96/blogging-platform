const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};
const auth = require("./src/auth");
const articles = require("./src/articles");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// const upCloud = require('./src/uploadCloudinary.js');

// let articles = [
//   { id: 0, author: "Mack", body: "Post 1" },
//   { id: 1, author: "Jack", body: "Post 2" },
//   { id: 2, author: "Zack", body: "Post 3" },
// ];

const hello = (req, res) => res.send({ hello: "world" });

const addUser = (req, res) => {
  (async () => {
    const connector = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // TODO: add a user to the database
    const username = req.params.uname;
    // console.log(req.params.uname);
    let user = await connector.then(async () => {
      return createUser(username);
    });
    res.send({ name: user.username });
  })();
};

async function createUser(username) {
  return new User({
    username,
    created: Date.now(),
  }).save();
}

const getArticles = (req, res) => res.send(articles);

const getArticle = (req, res) => res.send(articles[req.params.id]);

const addArticle = (req, res) => {
  let post = req.body;
  // console.log(post);
  let article = { id: articles.length, author: post.author, body: post.body };
  articles.push(article);
  res.send(articles);
};

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// upCloud.setup(app);

app.get("/", hello);
// app.post("/users/:uname", addUser);
auth(app);
articles(app);
// app.get("/articles", getArticles);
// app.get("/articles/:id", getArticle);
// app.post("/article", addArticle);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  const addr = server.address();
  console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
