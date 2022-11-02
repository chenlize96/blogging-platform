/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;
console.log("login.spec");
describe("Validate Registration and Login functionality", () => {
    let cookie;
  it("register new user", (done) => {
    let regUser = { username: "mrj3", password: "1234" };
    fetch(url("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regUser),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("mrj3");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("login user", (done) => {
    let loginUser = { username: "mrj3", password: "1234" };
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        console.log(res.headers.get('set-cookie'));
        cookie = res.headers.get('set-cookie');
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("mrj3");
        expect(res.result).toEqual("success");
        done();
      });
  });

  it("logout user", (done) => {
    let loginUser = { username: "mrj3", password: "1234" };
    beforeEach((done) => {
      fetch(url("/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          cookie = "sid=" + res["sid"];
          done();
        });
    });
    fetch(url("/logout"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.result).toEqual("OK");
        done();
      });
  });

  it("get articles", (done) => {
    let loginUser = { username: "mrj3", password: "1234" };
    fetch(url("/articles"), {
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        expect(res.status).toEqual(200);
        cookie = res.headers.get('cookie');
        return res.json();
      })
      .then((res) => {
        // cookie = "sid=" + res["sid"];
        expect(res.length).toBeGreaterThan(0);
        expect(res.result).toEqual("success");
        done();
      });
  });
});
