import React, { useState } from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

const inputs = [
  {
    id: 0,
    name: "Username",
    label: "Username",
    type: "text",
    placeholder: "username",
  },
  {
    id: 1,
    name: "Email",
    label: "Email",
    type: "text",
    placeholder: "a@b.c",
  },
  {
    id: 2,
    name: "Zipcode",
    label: "Zipcode",
    type: "text",
    placeholder: "12345",
  },
  {
    id: 3,
    name: "DoB",
    label: "DoB",
    type: "date",
    // placeholder: "YYYY-MM-DD",
  },
  {
    id: 4,
    name: "Password",
    label: "Password",
    type: "password",
    placeholder: "",
  },
  {
    id: 5,
    name: "Confirm",
    label: "Confirm Password",
    type: "password",
    placeholder: "",
  },
];

function Registration(props) {
  // console.log("registration");

  const [errorStates, setErrorStates] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [errorMsgs, setErrorMsgs] = useState([
    "Username already exists",
    "Expect a@b.c",
    "Zipcode should be 5 digits",
    "Under the age of 18",
    "Passwords do not match",
    "Passwords do not match",
  ]);

  const {
    setUserId,
    setUsername,
    setEmail,
    // setPhone,
    setZip,
    setPassword,
    setHeadline,
    verifyUsername,
    verifyEmail,
    verifyZip,
    verifyPhone,
    verifyPassword,
  } = props.state;
  const [success, setSuccess] = useState(false);
  // let navigate = useNavigate();
  // const [msgName, setMsgName] = useState(false);
  // const [msgEmail, setMsgEmail] = useState(false);
  // const [msgZip, setMsgZip] = useState(false);
  // const [msgPhone, setMsgPhone] = useState(false);
  // const [msgPassword, setMsgPassword] = useState(false);
  const validateAll = function () {
    setSuccess(false);
    var input_username = document.querySelector("input[name=Username]").value;
    var input_email = document.querySelector("input[name=Email]").value;
    var input_zip = document.querySelector("input[name=Zipcode]").value;
    var input_DoB = document.querySelector("input[name=DoB]").value;
    // console.log(input_DoB);
    var input_password = document.querySelector("input[name=Password]").value;
    var input_confirm = document.querySelector("input[name=Confirm]").value;
    var v1 = verifyUsername(input_username);
    var v2 = verifyEmail(input_email);
    var v3 = verifyZip(input_zip);
    var v4 = verifyPhone(input_DoB);
    var v5 = verifyPassword(input_password, input_confirm);
    setErrorStates([!v1, !v2, !v3, !v4, !v5, !v5]);
    let newErrorMsgs = [...errorMsgs];
    // 128999122000
    if (!v1) {
      newErrorMsgs[0] = "Should start with a letter";
      setErrorMsgs(newErrorMsgs);
    }
    if (v1 && v2 && v3 && v4 && v5) {
      let regUser = {
        username: input_username,
        email: input_email,
        dob: new Date(input_DoB).getTime(),
        zipcode: input_zip,
        password: input_password,
      };
      // console.log(regUser);
      fetch(url("/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regUser),
      }).then((res) => {
        // console.log(res);
        // console.log(res.status);
        if (res.status === 200) {
          setErrorStates([false, false, false, false, false, false]);
          // navigate("main");
          setSuccess(true);
        } else {
          newErrorMsgs[0] = "Username already exists";
          setErrorMsgs(newErrorMsgs);
          setErrorStates([true, false, false, false, false, false]);
        }
      });
    }

    if (v1 && v2 && v3 && v4 && v5) {
      // console.log("all correct");
      setUserId(0);
      localStorage.userId = 0;
      setUsername(input_username);
      localStorage.username = input_username;
      setEmail(input_email);
      localStorage.email = input_email;
      setZip(input_zip);
      localStorage.zip = input_zip;
      // setPhone(input_phone);
      // localStorage.phone = input_phone;
      setPassword(input_password);
      localStorage.password = input_password;
      setHeadline("Update your current status");
      localStorage.headline = "Update your current status";
      // navigate("main");
    }
  };

  // useEffect(() => {}, [msgName, msgEmail, msgZip, msgPhone, msgPassword]);

  return (
    <Card sx={{ width: 300, padding: 2, fontSize: 20, opacity: 0.7 }}>
      <Typography>For New Users</Typography>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 0.5 },
        }}
      >
        {inputs.map((input) => (
          <TextField
            fullWidth
            key={input.id + input.name}
            name={input.name}
            label={input.label}
            variant="outlined"
            placeholder={input.placeholder}
            InputLabelProps={{
              shrink: true,
            }}
            type={input.type}
            error={errorStates[input.id]}
            helperText={errorStates[input.id] ? errorMsgs[input.id] : " "}
            required
          ></TextField>
        ))}{" "}
        <br />
        <Button type="submit" variant="outlined" onClick={validateAll}>
          Register
        </Button><br/>
        {success? "Successfully Registered" : " "}
      </Box>
    </Card>
  );
}

export default Registration;
