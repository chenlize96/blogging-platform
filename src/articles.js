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
  if (!text) {
    return res.sendStatus(400);
  }
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

function updateArticle(req, res) {
  let target = Number(req.params.id); // endpoint: post id which is a number
  let username = req.username; // current username
  let text = req.body.text;
  let commentId = req.body.commentId;
  if (!text || !target) {
    return res.sendStatus(400);
  }
  if (!commentId) {
    // update text
    Article.findOne({ pid: target }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      if (!data) {
        return res.status(400).send({ result: "Post ID does not exist" });
      }
      if (data.author !== username) {
        return res
          .status(400)
          .send({ result: "The user does not own the article" });
      }
      data.text = text;
      return res.status(200).send({ articles: data });
    });
  } else {
    // update comment
    Article.findOne({ pid: target }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      if (!data) {
        return res.status(400).send({ result: "Post ID does not exist" });
      }
      // update comment
      return res.status(200).send({ articles: data });
    });
  }
}

module.exports = (app) => {
  app.get("/articles/:id?", getArticles);
  app.put("/articles/:id", updateArticle);
  app.post("/article", addArticle);
};
