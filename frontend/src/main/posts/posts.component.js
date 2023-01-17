import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
// import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const url = (path) => `https://final-backend-lc97.herokuapp.com${path}`;
const itemsPerPage = 10;
function ArticlesPosted(props) {
  const {
    // userId,
    filtered,
    // articles,
    username,
    setArticles,
    postsChange,
    setPostsChange,
    setCommentsModalOpen,
    setModalInfo,
    setEditModalOpen,
  } = props.state;
  // const [postsChange, setPostsChange] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPageCount(Math.ceil(filtered.length / itemsPerPage));
  }, [filtered.length]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // console.log("posts");
    fetch(url("/sorted"), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArticles(res.articles);
        setPostsChange(false);
      });
  }, [setArticles, postsChange, setPostsChange]);

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
      <Grid sx={{ ml: 0.5, mt: 0.5 }} container spacing={1}>
        {filtered
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((article) => {
            return (
              <Grid item key={article.pid}>
                <Card sx={{ width: 200 }}>
                  <CardHeader
                    titleTypographyProps={{ variant: "span" }}
                    subheaderTypographyProps={{ variant: "div" }}
                    title={article.author}
                    subheader={new Date(article.pid).toDateString()}
                  />
                  {article.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.image}
                      alt="temp image"
                    />
                  )}
                  <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography> */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ wordWrap: "break-word" }}
                    >
                      {article.text}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      disabled={username !== article.author}
                      onClick={() => {
                        setModalInfo(article);
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setModalInfo(article);
                        setCommentsModalOpen(true);
                      }}
                    >
                      Comment
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Stack alignItems="center" sx={{ mt: "10px", mb: "10px" }}>
        <Pagination
          count={pageCount}
          variant="outlined"
          color="primary"
          size="large"
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Card>
  );
}

export default ArticlesPosted;
