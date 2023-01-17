// import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
// import {connect} from "react-redux";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

function SearchBar(props) {
  const { articles, setFiltered } = props.state;
  const [query, setQuery] = useState("");
  const textInput = useRef(null);

  const updateQuery = () => {
    const inputText = textInput.current.value;
    setQuery(inputText.toLowerCase());
  };

  useEffect(() => {
    // console.log(query);
    const filteredRows = articles.filter((article) => {
      if (article.author.toLowerCase().includes(query)) {
        return true;
      }
      // if (article.title.toLowerCase().includes(query)) {
      //   return true;
      // }
      if (article.text.replace("\n", " ").toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    setFiltered(filteredRows);
  }, [query, setFiltered, articles]);

  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // fontSize: "1.5vw",
        opacity: 0.7,
      }}
    >
      <TextField
        name="keyword"
        fullWidth
        variant="outlined"
        autoComplete="off"
        placeholder="Search Posts by Author/Text"
        inputRef={textInput}
        onChange={updateQuery}
      />
    </Card>
  );
}

export default SearchBar;
