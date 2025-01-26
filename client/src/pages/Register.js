import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          width="100%"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          padding={4}
          boxShadow="0 10px 20px rgba(0,0,0,0.2)"
          borderRadius={1}
          bgcolor="white"
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Register Form
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              border: "1px solid black",
              borderRadius: "10px",
              color: "white",
              background: "darkblue",
              padding: "5px 15px",
              marginBottom: 3,
            }}
          >
            Register
          </Typography>

          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
            fullWidth
          />
          <TextField
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"email"}
            required
            fullWidth
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"password"}
            required
            fullWidth
          />

          <Button
            type="submit"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                background: "linear-gradient(to right, #2575fc, #6a11cb)",
              },
            }}
            variant="contained"
          >
            Submit
          </Button>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              borderRadius: 3,
              marginTop: 2,
              color: "#6a11cb",
              fontWeight: "bold",
              "&:hover": { color: "#2575fc" },
            }}
          >
            Already Registered? Please Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Register;
