import React, { useState, useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";
import { API } from "../../../service/api";
import Post from "./Post";
import { useSearchParams, Link } from "react-router-dom";

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Posts = () => {
  const [posts, setPost] = useState();

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  console.log(category);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" })
        .then((res) => res)
        .catch((err) => err);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          return (
            <Grid item lg={3} sm={4} xs={12} key={post._id}>
              <PostLink to={`/details/${post._id}`}>
                <Post post={post} />
              </PostLink>
            </Grid>
          );
        })
      ) : (
        <Box
          style={{ color: "#878787", margin: "30px 80px", fontSize: "18px" }}
        >
          No posts available to display
        </Box>
      )}
    </>
  );
};

export default Posts;
