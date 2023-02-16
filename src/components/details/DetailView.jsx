import React from "react";
import { Typography, Box, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../../service/api";
import { Edit, Delete } from "@mui/icons-material";
import { DataContext } from "../context/DataProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "./comments/Comments";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createDate: new Date(),
};

const Container = styled(Box)(({theme})=>({
  margin: '50px 100px',
  [theme.breakpoints.down('md')] : { 
    margin: '0',
  }
}))

const Image = styled("img")({
  width: "100%",
  height: "70vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)`
  color: #878787;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const { id } = useParams();

  const [post, setPost] = useState(initialPost);
  const {account} = useContext(DataContext);

  const navigate = useNavigate()

  const imageUrl =
    "https://miuc.org/wp-content/uploads/2017/01/Study-Computer-Science-1280x720.jpg";

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id)
        .then((res) => res)
        .catch((err) => err);

      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async () => {
    let response = await API.deletePost(id);
    if(response.isSuccess){
      navigate('/')
    }
  }

  return (
    <Container>
      <Image src={post.picture || imageUrl} alt="blog" />
      <Box style={{ float: "right" }}>
        {account.username === post.username ? (
          <>
          <Link to={`/update/${post._id}`}>
            <EditIcon color="primary" />
            </Link>
            <DeleteIcon color="error" onClick={deleteBlog}/>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography>{post.username}</Typography>
        <Typography>{new Date(post.createDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
