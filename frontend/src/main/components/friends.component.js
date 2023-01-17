// import {Link} from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
// import {connect} from "react-redux";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function FriendsFollowed(props) {
  const textInput = useRef(null);
  const { following, setFollowing, username, setPostsChange } = props.state;
  const [followedState, setFollowedState] = useState(false);
  const [followedMsg, setFollowedMsg] = useState("Cannot add yourself");
  const [followedChange, setFollowedChange] = useState(false);

  const addNewUser = function () {
    var tempUserName = textInput.current.value;
    if (tempUserName === "") {
      return;
    }
    if (tempUserName === username) {
      setFollowedMsg("Cannot add yourself");
      setFollowedState(true);
      return;
    }
    if (following.some((o) => o.username === tempUserName)) {
      setFollowedMsg("User was already added");
      setFollowedState(true);
      return;
    }
    fetch(url("/following/" + tempUserName), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        // setFollowing(res.following);
        setFollowedChange(true);
        setPostsChange(true);
        textInput.current.value = "";
        setFollowedState(false);
      })
      .catch((e) => {
        setFollowedMsg("User does not exist");
        setFollowedState(true);
      });
  };

  const removeFollowed = (name) => {
    fetch(url("/following/" + name), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // setFollowing(res.following);
        setFollowedChange(true);
        setPostsChange(true);
      });
  };

  useEffect(() => {
    // console.log("loop");
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
        setFollowedChange(false);
      });
  }, [followedChange, setFollowing]);

  return (
    <Card
      sx={{
        // display: "flex",
        height: "100%",
        // justifyContent:"space-around",
        alignItems: "flex-start",
        // fontSize: "1.5vw",
        opacity: 0.7,
        overflow: "auto",
      }}
    >
      <Grid
        container
        // spacing={0.5}
        // direction="column"
        // sx={{
        //   display: "block",
        //   // mt: 0.1,
        // }}
      >
        {following.map((element) => {
          return (
            <Grid sx={{ m: 1 }} item key={element.username + element.headline}>
              <Card sx={{ display: "flex", width: 350 }}>
                <CardMedia
                  component="img"
                  sx={{ width: "25%", p: 1 }}
                  height="60%"
                  image={element.avatar}
                  alt="avatar"
                />

                <CardContent align="left" sx={{ overflow: "hidden" }}>
                  <Typography
                    // width="90%"
                    component="div"
                    // variant="h5"
                    // sx={{ flex: 1, flexWrap: "wrap" }}
                    style={{ wordWrap: "break-word" }}
                  >
                    {element.username}
                  </Typography>
                  <Typography
                    // variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    style={{ wordWrap: "break-word" }}
                    sx={{ mb: 1 }}
                  >
                    {element.headline}
                  </Typography>
                  {/* <Box display="flex"> */}
                  <Button
                    sx={{ width: "auto" }}
                    size="small"
                    variant="outlined"
                    onClick={() => removeFollowed(element.username)}
                  >
                    Unfollow
                  </Button>
                  {/* </Box> */}
                </CardContent>
              </Card>
              {/* <Divider /> */}
            </Grid>
          );
        })}
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ mb: 1, mt: 0.5 }}
          spacing={1}
        >
          <Grid item>
            <TextField
              sx={{ height: "100%" }}
              name="new_user"
              variant="outlined"
              placeholder="Username"
              inputRef={textInput}
              size="small"
              error={followedState}
              helperText={followedState ? followedMsg : " "}
            />
          </Grid>
          <Grid item>
            <Button
              sx={{ height: "100%" }}
              variant="outlined"
              onClick={addNewUser}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FriendsFollowed;
