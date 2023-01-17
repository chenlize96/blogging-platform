/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;

describe("Validate Article functionality", () => {
  let cookie;
  let numOfArticles = -1;
  it("register new user", async (done) => {
    let regUser = {
      username: "testUser",
      email: "a@b.c",
      dob: 128999122000,
      zipcode: 77025,
      password: "123",
    };
    await fetch(url("/delete/testUser"), { method: "DELETE" });
    fetch(url("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regUser),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("login user", (done) => {
    let loginUser = { username: "testUser", password: "123" };
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        cookie = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("should give me no article", (done) => {
    fetch(url("/articles"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.articles instanceof Array) {
          expect(res.articles.length).toEqual(0);
          numOfArticles = res.articles.length;
        }
        done();
      });
  });

  it("should add new article, return list of articles with new article", (done) => {
    // add a new article
    let post = { text: "new post" };
    fetch(url("/article"), {
      method: "POST",
      headers: { "Content-Type": "application/json", cookie: cookie },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        let cur = res.articles;
        if (cur instanceof Array) {
          expect(cur.length).toEqual(numOfArticles + 1);
          var last = cur[cur.length - 1];
          expect(last.text).toEqual("new post");
          expect(last.author).toEqual("testUser");
        }
        done();
      });
  });

  it("should return all articles authored by testUser", (done) => {
    // validate that the correct article is returned
    fetch(url("/articles/testUser"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        let cur = res.articles;
        if (cur instanceof Array) {
          var last = cur[cur.length - 1];
          expect(last.author).toEqual("testUser");
          expect(last.text).toEqual("new post");
        }
        done();
      });
  });
});
