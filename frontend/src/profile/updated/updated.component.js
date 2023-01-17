import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

const inputs = [
  // {
  //   id: 0,
  //   name: "UpdatedUsername",
  //   label: "Username",
  //   type: "text",
  //   placeholder: "username",
  //   errorMessage: "Expect ^[a-zA-Z][a-zA-Z0-9]*",
  // },
  {
    id: 0,
    name: "UpdatedEmail",
    label: "Email",
    type: "text",
    placeholder: "a@b.c",
  },
  {
    id: 1,
    name: "UpdatedZipcode",
    label: "Zipcode",
    type: "text",
    placeholder: "12345",
  },
  // {
  //   id: 3,
  //   name: "UpdatedPhone",
  //   label: "Phone",
  //   type: "text",
  //   placeholder: "123-123-1234",
  // },
  {
    id: 2,
    name: "UpdatedPassword",
    label: "Password",
    type: "password",
    placeholder: "",
  },
  {
    id: 3,
    name: "UpdatedConfirm",
    label: "Confirm Password",
    type: "password",
    placeholder: "",
  },
];

const updateMsgs = [
  "Expect a@b.c",
  "Zipcode should be 5 digits",
  "Passwords do not match",
  "Passwords do not match",
];

function UpdatedInfo(props) {
  const [updateStates, setUpdateStates] = useState([
    false,
    false,
    false,
    false,
  ]);

  const {
    // setUsername,
    setEmail,
    // setPhone,
    setZip,
    setPassword,
    // verifyUsername,
    verifyEmail,
    verifyZip,
    // verifyPhone,
    verifyPassword,
  } = props.state;

  const validateUpdates = function () {
    // var input_username = document.querySelector("input[name=UpdatedUsername]");
    var input_email = document.querySelector("input[name=UpdatedEmail]");
    var input_zip = document.querySelector("input[name=UpdatedZipcode]");
    // var input_phone = document.querySelector("input[name=UpdatedPhone]");
    var input_password = document.querySelector("input[name=UpdatedPassword]");
    var input_confirm = document.querySelector("input[name=UpdatedConfirm]");
    var [v1, v2, v3] = [true, true, true];
    if (input_email.value !== "") {
      if (verifyEmail(input_email.value)) {
        setEmail(input_email.value);
        updateEmail(input_email.value);
        input_email.value = "";
      } else {
        v1 = false;
      }
    }
    if (input_zip.value !== "") {
      if (verifyZip(input_zip.value)) {
        setZip(input_zip.value);
        updateZipcode(input_zip.value);
        input_zip.value = "";
      } else {
        v2 = false;
      }
    }
    if (input_password.value !== "" || input_confirm.value !== "") {
      if (verifyPassword(input_password.value, input_confirm.value)) {
        setPassword(input_password.value);
        updatePassword(input_password.value);
        input_password.value = "";
        input_confirm.value = "";
      } else {
        v3 = false;
      }
    }
    // console.log([!v1, !v2, !v3, !v3]);
    setUpdateStates([!v1, !v2, !v3, !v3]);
  };

  function updateEmail(email) {
    fetch(url("/email"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email }),
    });
  }

  function updateZipcode(zipcode) {
    fetch(url("/zipcode"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ zipcode: zipcode }),
    });
  }

  function updatePassword(password) {
    fetch(url("/password"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: password }),
    });
  }

  return (
    <Card sx={{ width: 300, padding: 2, fontSize: 20, opacity: 0.7 }}>
      <Typography>Update Info</Typography>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 0.5 },
        }}
      >
        {inputs.map((input) => (
          <TextField
            fullWidth
            key={input.id + input.name}
            name={input.name}
            label={input.label}
            InputLabelProps={{
              shrink: true,
            }}
            type={input.type}
            variant="outlined"
            placeholder={input.placeholder}
            error={updateStates[input.id]}
            helperText={updateStates[input.id] ? updateMsgs[input.id] : " "}
          ></TextField>
        ))}{" "}
        <br />
        <Button type="submit" variant="outlined" onClick={validateUpdates}>
          Update
        </Button>
      </Box>
    </Card>
  );
}

export default UpdatedInfo;
