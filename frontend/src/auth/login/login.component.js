import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function Login(props) {
  // console.log("login");
  // const {
  // setUserId,
  // users,
  // setUsername,
  // setPassword,
  // setEmail,
  // setPhone,
  // setZip,
  // setHeadline,
  //   setLogState
  // } = props.state;
  const [loginMsg, setLoginMsg] = useState(false);

  let navigate = useNavigate();

  function validateRegistered(username, password) {
    let logUser = { username: username, password: password };
    fetch(url("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(logUser),
    }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        setLoginMsg(false);
        navigate("main");
      } else {
        setLoginMsg(true);
      }
    });
  }

  const checkPassword = function () {
    const password = document.querySelector(
      "input[name=registeredPassword]"
    ).value;
    const username = document.querySelector(
      "input[name=registeredUsername]"
    ).value;
    validateRegistered(username, password);
  };

  // const checkPassword = function () {
  //   const password = document.querySelector("input[name=registeredPassword]");
  //   const username = document.querySelector("input[name=registeredUsername]");
  //   // console.log(password.value + username.value)
  //   const formula = (data) =>
  //     data.username === username.value &&
  //     data.address.street === password.value;
  //   users.some(function (el) {
  //     if (formula(el)) {
  //       setMsg(false);
  //       // console.log(el);
  //       setUserId(el.id);
  //       localStorage.userId = el.id;
  //       setUsername(username.value);
  //       localStorage.username = username.value;
  //       setEmail(el.email);
  //       localStorage.email = el.email;
  //       setZip(el.address.zipcode);
  //       localStorage.zip = el.address.zipcode;
  //       setPhone(el.phone);
  //       localStorage.phone = el.phone;
  //       setPassword(password.value);
  //       localStorage.password = password.value;
  //       setHeadline(el.company.catchPhrase);
  //       localStorage.headline = el.company.catchPhrase;
  //       navigate("main");
  //       return true;
  //     }
  //     setMsg(true);
  //     return false;
  //   });
  // };

  // useEffect(() => {}, [msg]);

  return (
    <Card sx={{ width: 300, padding: 2, fontSize: 20, opacity: 0.7 }}>
      <Typography>For Registered Users</Typography>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 0.5 },
        }}
      >
        <TextField
          fullWidth
          error={loginMsg}
          name="registeredUsername"
          label="Username"
          variant="outlined"
          // placeholder="Andy"
          // defaultValue="Andy"
          helperText={loginMsg ? "Incorrect username or password" : " "}
          required
        />
        <TextField
          fullWidth
          name="registeredPassword"
          label="Password"
          variant="outlined"
          type="password"
          // defaultValue="123"
          required
        />{" "}
        <br />
        <Button
          sx={{ mt: 1 }}
          type="submit"
          variant="outlined"
          onClick={checkPassword}
        >
          Login
        </Button>
      </Box>
    </Card>
  );
}

export default Login;
