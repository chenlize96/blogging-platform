import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./auth/auth.component";
import Main from "./main/main.component";
import Profile from "./profile/profile.component";

function App() {
  const [userId, setUserId] = useState(-1);
  const [users, setUsers] = useState(
    localStorage.users ? JSON.parse(localStorage.users) : []
  );
  const [avatar, setAvatar] = useState("");
  // console.log(localStorage);
  const [following, setFollowing] = useState([]);
  const [postsChange, setPostsChange] = useState(false);
  const [articles, setArticles] = useState(
    localStorage.articles ? JSON.parse(localStorage.articles) : []
  );
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [headline, setHeadline] = useState("Update your current status");
  const [usersMap, setUsersMap] = useState({
    1: "Bret",
    2: "Antonette",
    3: "Samantha",
    4: "Karianne",
    5: "Kamren",
    6: "Leopoldo_Corkery",
    7: "Elwyn.Skiles",
    8: "Maxime_Nienow",
    9: "Delphine",
    10: "Moriah.Stanton",
  });

  const verifyUsername = (input) => {
    // start with a letter
    const regex = /^[a-zA-Z]/;
    return regex.test(input);
  };
  const verifyEmail = (input) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/;
    return regex.test(input);
  };
  const verifyZip = (input) => {
    const regex = /^[0-9]{5}$/;
    return regex.test(input);
  };
  // check if the year is leap year
  function isLeapYear(y) {
    // console.log(y);
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      return false;
    }
    return true;
  }
  const verifyPhone = (input) => {
    if (!input || input === "") {
      return false;
    }
    var today = new Date();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var yyyy = today.getFullYear() - 18;
    if (mm === 2 && dd >= 28) {
      dd = isLeapYear(yyyy) ? 28 : 29;
    }
    var oldDate = new Date(yyyy + "-" + mm + "-" + dd).getTime();
    // let dob = document.querySelector("input[name=birth]");
    let bday = new Date(input).getTime();
    if (oldDate < bday) {
      // dob.setCustomValidity("You are under the age of 18");
      return false;
    }
    return true;
  };
  const verifyPassword = (input1, input2) => {
    return input1 !== "" && input1 === input2;
  };
  const state = {
    userId,
    setUserId,
    users,
    setUsers,
    avatar,
    setAvatar,
    username,
    setUsername,
    following,
    setFollowing,
    postsChange,
    setPostsChange,
    filtered,
    setFiltered,
    articles,
    setArticles,
    commentsModalOpen,
    setCommentsModalOpen,
    editModalOpen,
    setEditModalOpen,
    modalInfo,
    setModalInfo,
    email,
    setEmail,
    zip,
    setZip,
    phone,
    setPhone,
    headline,
    setHeadline,
    usersMap,
    setUsersMap,
    password,
    setPassword,
    verifyUsername,
    verifyEmail,
    verifyZip,
    verifyPhone,
    verifyPassword,
  };
  useEffect(() => {
    // console.log(userId);
    if (userId === -1) {
      // console.log(localStorage);
      // setArticles(JSON.parse(localStorage.articles));  NEVER USE
      setEmail(localStorage.email);
      setHeadline(localStorage.headline);
      setPassword(localStorage.password);
      setPhone(localStorage.phone);
      setUserId(parseInt(localStorage.userId));
      setUsername(localStorage.username);
      // setUsers(JSON.parse(localStorage.users));  NEVER USE
      // console.log(JSON.parse(localStorage.users));
      setZip(localStorage.zip);
      // setUsersMap
    }
  }, [userId]);
  return (
    <Router>
      <div className="myApp">
        <Routes>
          <Route path="/" element={<Auth state={state} />} />
          <Route path="/main" element={<Main state={state} />} />
          <Route path="/profile" element={<Profile state={state} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
