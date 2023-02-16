import React from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { API } from "../../service/api";
import axios from "axios";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  }
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin: 50px 0 0;
  font-size: 18px;
  border: none;

  &:focus-visible {
    outline: none;
  }
`;

const PublishButton = styled(Button)`
  text-transform: none;
  background-color: #2b3a55;
  color: #fff;
  height: 40px;
  width: 100px;

  &:hover {
    background-color: #2b3a55cc;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createDate: new Date(),
};

const UpdatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : "https://miuc.org/wp-content/uploads/2017/01/Study-Computer-Science-1280x720.jpg";

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

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // API call
        const response = await API.uploadFile(data)
          .then((res) => res)
          .catch((err) => err);
        post.picture = response.data.imageUrl;
      }
    };

    getImage();
    post.categories = searchParams.get("category") || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    const response = await API.updatePost(post)
      .then((res) => res)
      .catch((err) => err);
    if (response.isSuccess) {
      navigate("/details/" + id);
    }
  };

  return (
    <Container>
      <Image src={url} alter="post image" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircle fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            setFile(file);
          }}
        />
        <InputTextField
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <PublishButton variant="contained" onClick={updateBlogPost}>
          Update
        </PublishButton>
      </StyledFormControl>
      <Textarea
        placeholder="Tell your story..."
        minRows={5}
        name="description"
        value={post.description}
        onChange={handleChange}
      />
    </Container>
  );
};

export default UpdatePost;
