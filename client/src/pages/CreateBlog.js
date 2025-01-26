import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}
        style={{
          marginTop: "40px",
          height: "85vh",
      }}>
        <Box
          width={"50%"}
          padding={1}
          margin="auto"
          display="flex"
          flexDirection={"column"}
          marginTop="10px"
          boxShadow="5px 5px 5px white"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={1}
            color="#74D4FF"
          >
            Create A Blog
          </Typography>
          <InputLabel
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color:"red"
            }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            placeholder="title..."
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{fontSize: "24px", fontWeight: "bold" ,color:"red"}}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            placeholder="hell boy is dead..."
            required
          />
          <InputLabel
            sx={{
              mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold",
              color:"red"
             }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
