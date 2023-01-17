// import {Link} from "react-router-dom";
import React from "react";
// import {connect} from "react-redux";
import Card from "@mui/material/Card";

function WelcomeMsg() {
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2.5vw",
        opacity: 0.7,
        overflow: "auto",
      }}
    >
      Welcome to folksZone
    </Card>
  );
}

export default WelcomeMsg;
