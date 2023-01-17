// import {Link} from "react-router-dom";
import React, { useRef } from "react";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
// import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import { fontSize } from "@mui/system";
// import {connect} from "react-redux";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function UserStatus(props) {
  const {
    username,
    avatar,
    setAvatar,
    userId,
    headline,
    setHeadline,
    setUserId,
    setUsers,
    setUsername,
    setFiltered,
    setArticles,
    setEmail,
    setZip,
    setPhone,
    setPassword,
    setFollowing,
  } = props.state;
  const textInput = useRef(null);
  let navigate = useNavigate();

  const updateHeadline = () => {
    const inputText = textInput.current.value;
    if (inputText === "") return;
    textInput.current.value = "";
    setHeadline(inputText);
    fetch(url("/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ headline: inputText }),
    });
  };

  const goToProfile = function () {
    navigate("/profile");
  };
  const goToLanding = function () {
    fetch(url("/logout"), {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setUserId(-1);
    setUsers([]);
    setFollowing([]);
    setArticles([]);
    setFiltered([]);
    setUsername("");
    setEmail("");
    setAvatar("");
    setZip("");
    setPhone("");
    setPassword("");
    setHeadline("Update your current status");
    localStorage.clear();
    navigate("/");
  };

  // useEffect(() => {
  //   console.log(userId);
  // }, [userId]);

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
        <Grid sx={{ m: 1 }} item key={username + userId}>
          <Card sx={{ display: "flex", width: 350 }} elevation={0}>
            {avatar && (
              <CardMedia
                component="img"
                sx={{ width: "30%", p: 1 }}
                height="100%"
                image={avatar}
                alt="avatar"
              />
            )}
            <CardContent align="left" sx={{ overflow: "hidden" }}>
              <Typography
                // width="90%"
                component="div"
                // variant="h5"
                // sx={{ flex: 1, flexWrap: "wrap" }}
                style={{ wordWrap: "break-word" }}
              >
                {username || ""}
              </Typography>
              <Typography
                // variant="subtitle1"
                color="text.secondary"
                component="div"
                style={{ wordWrap: "break-word" }}
                sx={{ mb: 1 }}
              >
                {headline || ""}
              </Typography>
              {/* <Box display="flex"> */}
              <Button
                sx={{ width: "auto", mr: 0.5, mt: 0.5 }}
                size="small"
                variant="outlined"
                onClick={goToProfile}
              >
                Profile
              </Button>
              <Button
                sx={{ width: "auto", mr: 0.5, mt: 0.5 }}
                size="small"
                variant="outlined"
                onClick={goToLanding}
              >
                Logout
              </Button>
              {/* </Box> */}
            </CardContent>
          </Card>
          {/* <Divider /> */}
        </Grid>
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
              size="small"
              sx={{ ml: 1, height: "100%" }}
              name="status_headline"
              variant="outlined"
              placeholder="New Status"
              inputRef={textInput}
            />
          </Grid>
          <Grid item>
            <Button
              sx={{ height: "100%" }}
              variant="outlined"
              onClick={updateHeadline}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserStatus;
