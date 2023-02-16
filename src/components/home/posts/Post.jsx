import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { addEllipsis } from '../../utils/common-utils';

const Container = styled(Box)`
    border: solid 1px #d3cede;
    border-radius: 10px; 
    margin: 10px;
    height: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;

    & > p {
        padding: 0 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height: '150px',
});

const Text = styled(Typography)`
    margin: 10px 0 0;
    color: #878787;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const Description = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    margin: 20px;
`;

const Post = ({post}) => {

    const imgUrl = 'https://miuc.org/wp-content/uploads/2017/01/Study-Computer-Science-1280x720.jpg';

  return (
    <Container>
        <Image src={post.picture || imgUrl} alt='Blog' />
        <Text>{post.categories}</Text>
        <Heading>{addEllipsis(post.title, 20)}</Heading>
        <Text>{post.username}</Text>
        <Description>{addEllipsis(post.description,100)}</Description>
    </Container>
  )
}

export default Post