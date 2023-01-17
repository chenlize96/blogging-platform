// import {Link} from "react-router-dom";
import React, { useEffect, useRef } from "react";
// import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CurrentInfo from "./current/current.component";
import UpdatedInfo from "./updated/updated.component";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function Profile(props) {
  const { setEmail, setZip, setUsername, avatar, setAvatar, setPhone } =
    props.state; // avatar, dob
  // const [q, setQ] = useState("");
  const avatarInput = useRef(null);

  let navigate = useNavigate();
  const goToMain = function () {
    navigate("/main");
  };

  function uploadAvatar() {
    document.getElementById("avatarControl").value = "";
    var tempAvatar = avatarInput.current;
    if (!tempAvatar) {
      return;
    }
    const fd = new FormData();
    fd.append("image", tempAvatar);
    fetch(url("/avatar"), {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setAvatar(res.avatar);
        avatarInput.current = null;
      });
  }

  useEffect(() => {
    // console.log("profile");
    fetch(url("/email"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setEmail(res.email);
        setUsername(res.username);
      });
    fetch(url("/zipcode"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setZip(res.zipcode);
      });
    fetch(url("/dob"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPhone(res.dob);
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
  }, [setAvatar, setEmail, setUsername, setZip, setPhone]);

  return (
    <Grid
      container
      // display="flex"
      justifyContent="center"
      alignItems="center"
      mt="5px"
      mb="50px"
      spacing={2}
      // direction="column"
      // align="center"
    >
      <Grid
        item
        container
        // direction="row"
        justifyContent="center"
        alignItems="center"
        // xs={6}
      >
        <Grid item sx={{ m: 2 }}>
          <Card
            sx={{
              width: 300,
              height: 150,
              padding: 2,
              fontSize: 30,
              opacity: 0.7,
            }}
          >
            <CardContent sx={{ m: 1 }}>
              Welcome to folksZone
              <Button fullWidth variant="outlined" onClick={goToMain}>
                Go to the Main page
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={{ m: 2 }}>
          <Card
            sx={{
              width: 300,
              height: 150,
              padding: 2,
              fontSize: 30,
              opacity: 0.7,
            }}
          >
            {avatar && <CardMedia
              component="img"
              sx={{ width: "25%", p: 1 }}
              height="60%"
              image={avatar}
              alt="avatar"
            />}
            <Button
              variant="text"
              component="label"
              fullWidth
              // sx={{ height: "100%" }}
              // onClick={() => {
              //   console.log("123");
              // }}
            >
              {/* Add Image */}
              <input
                type="file"
                name="avatar"
                onChange={(e) => (avatarInput.current = e.target.files[0])}
                id="avatarControl"
              />
              <input type="submit" value="Upload" onClick={uploadAvatar} />
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Grid
        item
        container
        // direction="row"
        justifyContent="center"
        alignItems="center"
        // xs={6}
      >
        <Grid item sx={{ m: 2 }}>
          <CurrentInfo state={props.state} />
        </Grid>
        <Grid item sx={{ m: 2 }}>
          <UpdatedInfo state={props.state} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;
