// import { Link } from "react-router-dom";
import React from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import axios from "axios";
import Login from "./login/login.component";
import Registration from "./registration/registration.component";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {connect} from "react-redux";
// import { styled } from '@mui/material/styles';
// import Paper from "@mui/material/Paper";

// const url = "https://jsonplaceholder.typicode.com/users";
// const postsUrl = "https://jsonplaceholder.typicode.com/posts";

function Auth(props) {
  // const { setUsers, setArticles } = props.state;
  // console.log("auth");

  // let navigate = useNavigate();
  // let start = new Date(2022, 9, 20).getTime();

  // useEffect(() => {
  //   axios.get(url).then(function (response) {
  //     setUsers(response.data);
  //     localStorage.users = JSON.stringify(response.data);
  //   });
  //   axios.get(postsUrl).then(function (response) {
  //     const articlesWithTimestamps = response.data.map((article, key) => {
  //       article["image"] = "https://i.postimg.cc/wjrcvrtn/2.png";
  //       article["timestamp"] = new Date(start - key * 216000000).toDateString();
  //       return article;
  //     });
  //     setArticles(articlesWithTimestamps);
  //     localStorage.articles = JSON.stringify(articlesWithTimestamps);
  //   });
  // }, [setUsers, setArticles, start]);

  // useEffect(() => {
  //   if (logState) {
  //     navigate("main");
  //   }
  // }, [logState, navigate]);

  return (
    <div>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="5px"
        mb="50px"
        spacing={2}
        align="center"
      >
        <Grid item xs={12}>
          <Card sx={{ width: 300, padding: 2, fontSize: 30, opacity: 0.7 }}>
            Welcome to folksZone
          </Card>
        </Grid>
        <Grid item>
          <Registration state={props.state} />
        </Grid>
        <Grid item>
          <Login state={props.state} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Auth;
