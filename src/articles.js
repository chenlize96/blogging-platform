const Article = require("./schemas").Article;

function getArticles(req, res) {
  let target = req.params.id; // endpoint
  let username = req.username; // current username
  let isNum = Number(target);
  if (target && !isNum) {
    // username cannot be number
    Article.find({ author: target }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res.status(200).send({ articles: data });
    });
  } else if (target && isNum) {
    Article.find({ pid: isNum }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res.status(200).send({ articles: data });
    });
  } else {
    // there is no :id
    Article.find({ author: username }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      return res.status(200).send({ articles: data });
    });
  }
}

async function addArticle(req, res) {
  let username = req.username; // current username
  let text = req.body.text;
  let timestamp = new Date();
  await new Article({
    author: username,
    text: text,
    date: timestamp,
    pid: timestamp.getTime(),
    comments: [],
  }).save();
  Article.find({ author: username }).exec(function (err, data) {
    if (err) {
      return res.status(500).send({ result: "Server Error" });
    }
    res.status(200).send({ articles: data });
  });
}

module.exports = (app) => {
  app.get("/articles/:id?", getArticles);
  //   app.put("/articles/:id", updateArticle);
  app.post("/article", addArticle);
};
