const Article = require("./schemas").Article;
const Profile = require("./schemas").Profile;
const uploadImage = require("./uploadCloudinary");

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
    // Article.find({ author: username }).exec(function (err, data) {
    //   if (err) {
    //     return res.status(500).send({ result: "Server Error" });
    //   }
    //   return res.status(200).send({ articles: data });
    // });
    Profile.findOne({ username: username }).exec(async function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      let names = [username].concat(data.following);
      let msg = await Promise.all(
        names.map(async (user) => await Article.find({ author: user }))
      );
      return res.status(200).send({ articles: msg.flat() });
    });
  }
}

async function addArticle(req, res) {
  let username = req.username; // current username
  let text = req.body.text;
  // let image = req.body.postImg;
  // console.log(image);
  // let image;
  // console.log(req.body);
  // if (req.body.fd) {
  //   image = req.body.fd.fileurl;
  // }
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
    image: "",
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
  // console.log(commentId);
  if (commentId === undefined) {
    // update text
    Article.findOneAndUpdate(
      { pid: target, author: username },
      { text: text },
      { new: true },
      function (err, data) {
        if (err) {
          return res.status(500).send({ result: "Server Error" });
        }
        if (!data) {
          return res.status(400).send({ result: "Unauthorized to update" });
        }
        // if (data.author !== username) {
        //   return res
        //     .status(400)
        //     .send({ result: "The user does not own the article" });
        // }
        // data.text = text;
        return res.status(200).send({ articles: data });
      }
    );
  } else {
    // update comment
    let idx = Number(commentId);
    Article.findOne({ pid: target }).exec(function (err, data) {
      if (err) {
        return res.status(500).send({ result: "Server Error" });
      }
      if (!data) {
        return res.status(400).send({ result: "Post ID does not exist" });
      }
      let comments = data.comments;
      let curLen = comments.length;
      let timestamp = new Date();
      if (idx === -1) {
        comments.push({
          text: text,
          timestamp: timestamp,
          author: username,
          id: curLen,
        });
      } else {
        comment = comments.filter((comment) => comment.id == idx);
        if (comment.length === 0) {
          return res.status(400).send({ result: "Array Index Out Of Bounds" });
        }
        comment[0]["text"] = text;
      }
      Article.findOneAndUpdate(
        { pid: target },
        { comments: comments },
        { new: true },
        function (err, data) {
          if (err) {
            return res.status(500).send({ result: "Server Error" });
          }
          return res.status(200).send({ articles: data });
        }
      );
    });
  }
}

// function uploadPostImg(req, res) {
//   let username = req.username;
//   let curPostImg = req.fileurl;
//   // console.log(curPostImg);
//   return res.status(200).send({ username: username, postImg: curPostImg });
// }

async function addArticleWithImg(req, res) {
  let username = req.username; // current username
  let text = req.body.text;
  let curPostImg = req.fileurl;
  // console.log(curPostImg);
  // console.log(text);
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
    image: curPostImg,
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
  app.put("/articles/:id", updateArticle);
  app.post("/article", addArticle);
  app.post("/articleWithImg", uploadImage("post"), addArticleWithImg);
  // app.put("/postImg", uploadImage("postImg"), uploadPostImg);
};
