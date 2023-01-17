// import { Link } from "react-router-dom";
import React, { useEffect } from "react";
// import {connect} from "react-redux";
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
import WelcomeMsg from "./components/welcome.component";
import UserStatus from "./components/status.component";
import UploadArticle from "./components/upload.component";
import SearchBar from "./components/search.component";
import FriendsFollowed from "./components/friends.component";
import ArticlesPosted from "./posts/posts.component";
import CommentsModal from "./posts/comment.component";
import EditModal from "./posts/edit.component";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

// const followedMap = {
//   1: [2, 3, 4],
//   2: [3, 4, 5],
//   3: [4, 5, 6],
//   4: [5, 6, 7],
//   5: [6, 7, 8],
//   6: [7, 8, 9],
//   7: [8, 9, 10],
//   8: [9, 10, 1],
//   9: [10, 1, 2],
//   10: [1, 2, 3],
// };

function Main(props) {
  const {
    setHeadline,
    setUsername,
    setFollowing,
    setArticles,
    // avatar,
    commentsModalOpen,
    editModalOpen,
    setAvatar,
  } = props.state;

  useEffect(() => {
    // console.log("main");
    fetch(url("/headline"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setHeadline(res.headline);
        setUsername(res.username);
      });
    fetch(url("/avatar"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAvatar(res.avatar);
      });
    fetch(url("/followingCombo"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFollowing(res.followingInfo);
      });
    fetch(url("/sorted"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res.articles);
      });
  }, [setFollowing, setHeadline, setUsername, setArticles, setAvatar]);

  return (
    <Box
      sx={{
        // display:"flex",
        justifyContent: "center",
        // alignItems: "center",
        display: "grid",
        gridTemplateColumns: "30% 25% 25% 20%",
        // gap: 1,
        // padding: 1,
        m: 2,
        height: "700px",
        gridTemplateRows: "30% 10% 60%",
        gridTemplateAreas: `"status text text card"
                            "status search search search"
                            "friends posts posts posts"`,
      }}
    >
      <Box sx={{ p: 0.5, gridArea: "status" }}>
        <UserStatus state={props.state} />
      </Box>
      <Box sx={{ p: 0.5, gridArea: "text" }}>
        <UploadArticle state={props.state} />
      </Box>
      <Box sx={{ p: 0.5, gridArea: "card" }}>
        <WelcomeMsg />
      </Box>
      <Box sx={{ p: 0.5, gridArea: "search" }}>
        <SearchBar state={props.state} />
      </Box>
      <Box sx={{ p: 0.5, gridArea: "friends" }}>
        <FriendsFollowed state={props.state} />
      </Box>
      <Box sx={{ p: 0.5, gridArea: "posts" }}>
        <ArticlesPosted state={props.state} />
      </Box>
      {commentsModalOpen && <CommentsModal state={props.state} />}
      {editModalOpen && <EditModal state={props.state} />}
    </Box>

    // <div>
    //   <h2>Main</h2>
    //   <ul>
    //     <li>{username}</li>
    //     <li>{email}</li>
    //     <li>{zip}</li>
    //     <li>{phone}</li>
    //     <li>{password}</li>
    //   </ul>
    //   <Link to={"/"}>Home</Link>
    // </div>
  );
}

export default Main;
