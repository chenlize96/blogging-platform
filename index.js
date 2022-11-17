const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};
const auth = require("./src/auth");
const articles = require("./src/articles");
const profile = require("./src/profile");
const following = require("./src/following");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// const upCloud = require('./src/uploadCloudinary.js');

const hello = (req, res) => res.send({ hello: "world" });

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// upCloud.setup(app);

app.get("/", hello);

auth(app);
articles(app);
profile(app);
following(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  const addr = server.address();
  console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
