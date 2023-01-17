import React, { useRef } from "react";
// import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import CardHeader from "@mui/material/CardHeader";
// import Paper from "@mui/material/Paper";
// import { connect } from "react-redux";
import Modal from "@mui/material/Modal";
// import { closeComments } from "../../actions";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;

function EditModal(props) {
  const { editModalOpen, setEditModalOpen, modalInfo, setPostsChange } =
    props.state;

  const textInput = useRef(null);
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

  function editText() {
    var tempText = textInput.current.value;
    if (tempText === "") {
      return;
    }
    let body = { text: tempText };
    if (modalInfo.type) {
      body["commentId"] = modalInfo.id;
    }
    // console.log(body);
    // return;
    fetch(url("/articles/" + modalInfo.pid), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPostsChange(true);
        textInput.current.value = "";
        setEditModalOpen(false);
      });
  }

  return (
    <Modal
      open={editModalOpen}
      onClose={() => {
        setEditModalOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit {modalInfo.author}'s {modalInfo.type ? "Comment" : "Post"}
        </Typography>
        <TextField
          size="small"
          sx={{ mt: 1, mb: 1 }}
          name="status_headline"
          variant="outlined"
          placeholder="New Text"
          inputRef={textInput}
          fullWidth
          multiline
          defaultValue={modalInfo.text}
        />
        <Button sx={{ width: "100%" }} variant="outlined" onClick={editText}>
          Edit
        </Button>
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
export default EditModal;
