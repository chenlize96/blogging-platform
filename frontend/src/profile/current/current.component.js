import React from "react";
import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";
function CurrentInfo(props) {
  //   let navigate = useNavigate();
  const { username, email, zip, phone } = props.state;

  // useEffect(() => {
  //   // console.log("first ");
  // }, [username, email, zip, phone, password]);
  return (
    <Card sx={{ width: 300, padding: 2, fontSize: 20, opacity: 0.7 }}>
      <Typography>Current Info</Typography>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 0.5 },
        }}
      >
        <TextField
          label="Username"
          fullWidth
          value={username || ""}
          InputProps={{
            readOnly: true,
          }}
          helperText=" "
          variant="filled"
        />
        <TextField
          label="Email"
          fullWidth
          value={email || ""}
          InputProps={{
            readOnly: true,
          }}
          helperText=" "
          variant="filled"
        />
        <TextField
          label="Zipcode"
          fullWidth
          value={zip || ""}
          InputProps={{
            readOnly: true,
          }}
          helperText=" "
          variant="filled"
        />
        <TextField
          label="DoB"
          fullWidth
          value={new Date(phone).toDateString() || ""}
          InputProps={{
            readOnly: true,
          }}
          helperText=" "
          variant="filled"
        />
        {/* <TextField
          label="Password"
          fullWidth
          value={password}
          type="password"
          InputProps={{
            readOnly: true,
          }}
          helperText=" "
          variant="filled"
        /> */}
      </Box>
    </Card>
  );
}

export default CurrentInfo;
