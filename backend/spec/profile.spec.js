/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;

describe("Validate Profile functionality", () => {
  let cookie;
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

  it("should give me the current headline", (done) => {
    fetch(url("/headline"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie },
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.headline).toEqual("Input your status");
        expect(res.username).toEqual("testUser");
        done();
      });
  });

  it("should update the headline for the logged in user", (done) => {
    // update the headline
    let query = { headline: "Happy" };
    fetch(url("/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", cookie: cookie },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.headline).toEqual("Happy");
        done();
      });
  });
});
