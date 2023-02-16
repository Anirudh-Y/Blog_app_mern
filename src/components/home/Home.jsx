import { Typography, Box, Grid, styled } from "@mui/material";
import React from "react";
import Banner from "../banner/Banner";
import Categories from "../categories/Categories";
import Posts from "./posts/Posts";

const Home = () => {
  return (
    <Box>
      <Banner />
      <Grid container>
        <Grid item xs={12} sm={2}>
          <Categories />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Posts />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
