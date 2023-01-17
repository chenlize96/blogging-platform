import React, { useRef } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function UploadArticle(props) {
  const textInput = useRef(null);
  const imageInput = useRef(null);
  const { setPostsChange } = props.state;

  const clearPost = function () {
    textInput.current.value = "";
    imageInput.current = null;
    document.getElementById("fileControl").value = "";
  };

  const addTempArticle = function () {
    var tempArticle = textInput.current.value;
    var tempImg = imageInput.current;
    if (tempArticle === "") {
      return;
    }
    if (!tempImg) {
      fetch(url("/article"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: tempArticle }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((res) => {
          setPostsChange(true);
        })
        .catch((e) => {});
    } else {
      const fd = new FormData();
      fd.append("text", tempArticle);
      fd.append("image", tempImg);
      fetch(url("/articleWithImg"), {
        method: "POST",
        credentials: "include",
        body: fd,
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((res) => {
          setPostsChange(true);
        })
        .catch((e) => {});
    }
    clearPost();
  };

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
        spacing={1}
        direction="column"
        sx={{
          display: "block",
          // mt: 0.1,
        }}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          // sx={{ mb: 1 }}
          spacing={2}
        >
          <Grid item>
            <Button
              // variant="contained"
              component="label"
              sx={{ height: "100%" }}
            >
              <input
                type="file"
                name="avatar"
                onChange={(e) => (imageInput.current = e.target.files[0])}
                id="fileControl"
              />
              {/* <input type="submit" value="Upload"  */}
              {/* // onClick={uploadAvatar} */}
              {/* /> */}
            </Button>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Your post here"
              multiline
              rows={4}
              // fullWidth
              // maxRows={4}
              sx={{
                width: "100%",
                mr: 1,
              }}
              inputRef={textInput}
              // value={value}
              // onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          sx={{ mb: 1 }}
          spacing={1}
        >
          <Grid item>
            <Button sx={{ p: 0.5 }} variant="outlined" onClick={clearPost}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button sx={{ p: 0.5 }} variant="outlined" onClick={addTempArticle}>
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>

    // <Card
    //   sx={{
    //     height: "100%",
    //     // justifyContent:"space-around",
    //     alignItems: "flex-start",
    //     // display: "flex",
    //     // height: "100%",
    //     // justifyContent: "center",
    //     // alignItems: "center",
    //     // fontSize: "1.5vw",
    //     opacity: 0.7,
    //     overflow: "auto",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       display: "inline-grid",
    //       gridTemplateColumns: "40% 60%",
    //       height: "99%",
    //       gridTemplateRows: "80% 20%",
    //       gridTemplateAreas: `"addBtn text"
    //                         "cancel post"`,
    //     }}
    //     spacing={1}
    //   >
    //     <Box sx={{ gridArea: "addBtn" }}>
    //       <Button variant="contained" component="label" sx={{ height: 100 }}>
    //         Add Image
    //         <input type="file" hidden />
    //       </Button>
    //     </Box>
    //     <Box sx={{ gridArea: "cancel" }}>
    // <Button sx={{ mb: 1, p: 0.5 }} variant="outlined">
    //   Cancel
    // </Button>
    //     </Box>
    //     <Box sx={{ gridArea: "post" }}>
    // <Button sx={{ mb: 1, p: 0.5 }} variant="outlined">
    //   Post
    // </Button>
    //     </Box>
    //     <Box sx={{ gridArea: "text" }}>
    // <TextField
    //   id="outlined-multiline-flexible"
    //   label="Your post here"
    //   multiline
    //   rows={4}
    //   // maxRows={4}
    //   sx={{
    //     width: 300,
    //     mr: 1,
    //   }}
    //   // value={value}
    //   // onChange={handleChange}
    // />
    //     </Box>
    //   </Box>
    // </Card>
  );
}

export default UploadArticle;
