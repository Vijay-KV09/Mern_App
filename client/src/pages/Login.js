import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
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
      <Box
        maxWidth={400}
        width="100%"
        padding={4}
        boxShadow="0 10px 20px rgba(0,0,0,0.2)"
        borderRadius={1}
        bgcolor="white"
        textAlign="center"
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase", mb: 2, fontWeight: "bold" }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Type your username"
            value={inputs.email}
            name="email"
            margin="normal"
            type="email"
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            placeholder="Type your password"
            value={inputs.password}
            name="password"
            margin="normal"
            type="password"
            required
            onChange={handleChange}
          />

          <Typography
            variant="body2"
            sx={{ textAlign: "right", mt: 1, mb: 3, cursor: "pointer", color: "#6a11cb" }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: 3,
              mb: 2,
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            color="gray"
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer", "&:hover": { color: "#6a11cb" } }}
          >
            Or Sign Up Using
          </Typography>
        </form>
      </Box>
    </div>
  );
};

export default Login;
