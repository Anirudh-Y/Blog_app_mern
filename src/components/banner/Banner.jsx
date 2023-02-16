import React from 'react'
import { Box, Typography, styled } from '@mui/material'

const Image = styled(Box)`
  background: url(https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg) no-repeat center;
  background-size: cover;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const Banner = () => {
  return (
    <Image>
      <Typography variant='h1'>Blog</Typography>
      <Typography variant='h6'>Code for Interview</Typography>
    </Image>
  )
}

export default Banner