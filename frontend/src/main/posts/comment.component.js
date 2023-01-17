import React, { useRef, useState, useEffect } from "react";
// import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
// import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
// import { closeComments } from "../../actions";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

// const commentsMap = {
//   Mack: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   Jason: "Aliquam vulputate, mauris vitae tincidunt interdum.",
// };

function CommentsModal(props) {
  const {
    commentsModalOpen,
    setCommentsModalOpen,
    setEditModalOpen,
    modalInfo,
    setModalInfo,
    username,
    // setPostsChange,
  } = props.state;
  const [commentChange, setCommentChange] = useState(false);
  const textInput = useRef(null);
  // const commentInput = useRef(null);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%", //800
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    maxHeight: 500,
  };

  useEffect(() => {
    // console.log("comments");
    fetch(url("/articles/" + modalInfo.pid), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCommentChange(false);
        //   console.log(res.articles);
        setModalInfo(res.articles[0]);
      });
    // setCommentChange(false);
  }, [commentChange, modalInfo.pid, setModalInfo]);

  function addNewComment() {
    var tempComment = textInput.current.value;
    if (tempComment === "") {
      return;
    }
    fetch(url("/articles/" + modalInfo.pid), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: tempComment, commentId: -1 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCommentChange(true);
        textInput.current.value = "";
      });
  }

  // function editComment(e,id) {

  //   var tempComment = commentInput.current.value;
  //   if (tempComment === "") {
  //     return;
  //   }
  //   fetch(url("/articles/" + modalInfo.pid), {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify({ text: tempComment, commentId: id }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log(res.articles);
  //       // setCommentChange(true);
  //       setModalInfo(res.articles);
  //       setCommentChange(true);
  //       setPostsChange(true);
  //       // setCommentsModalOpen(false);
  //       // textInput.current.value = "";
  //     });
  // }

  return (
    <Modal
      open={commentsModalOpen}
      onClose={() => {
        setCommentsModalOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Comments on {modalInfo.author}'s Post
        </Typography>
        <TextField
          size="small"
          sx={{ mt: 1, mb: 1 }}
          name="status_headline"
          variant="outlined"
          placeholder="New Comment"
          inputRef={textInput}
          fullWidth
          multiline
        />

        <Button
          sx={{ width: "100%" }}
          variant="outlined"
          onClick={addNewComment}
        >
          Add
        </Button>
        {modalInfo.comments &&
          modalInfo.comments.map((commenter) => {
            return (
              <Paper
                key={commenter.timestamp}
                style={{ padding: "10px 20px", marginTop: 10 }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {commenter.author}
                    </h4>
                    <p style={{ textAlign: "left" }}>{commenter.text} </p>
                    {/* <TextField
                      size="small"
                      sx={{ mt: 1, mb: 1 }}
                      name="status_headline"
                      variant="outlined"
                      placeholder="New Text"
                      inputRef={commentInput}
                      fullWidth
                      multiline
                      defaultValue={commenter.text}
                      disabled={username !== commenter.author}
                    /> */}
                    <div style={{ textAlign: "left", color: "gray" }}>
                      {/* posted on Oct 27, 2022 */}
                      posted on {new Date(commenter.timestamp).toDateString()}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Button
                        disabled={username !== commenter.author}
                        onClick={(e) => {
                          // editComment(e, commenter.id)
                          setCommentsModalOpen(false);
                          // console.log(commenter);
                          setModalInfo(
                            Object.assign(commenter, {
                              type: "comment",
                              pid: modalInfo.pid,
                            })
                          );
                          setEditModalOpen(true);
                        }}
                      >
                        Modify
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
      </Box>
    </Modal>
  );
}

// usersMap, userId, filtered
// const mapStateToProps = (state) => {
//   return {
//     modalOpen: state.modalOpen,
//     postCommented: state.postCommented,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     closeComments: () => dispatch(closeComments()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CommentsModal);
export default CommentsModal;
