import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authService from "../services/authService";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import keyImage from "../assets/login_image.jpg";

const { login, getUser } = authService;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const token = response.token;
      Cookies.set("authToken", token);
      const userResponse = await getUser(token);
      const user = userResponse.user;
      Cookies.set("user", JSON.stringify(user));
      navigate("/welcome");
    } catch (err) {
      if (err.errors) {
        const serverErrors = err.errors.map((error) => error.msg).join(", ");
        setError(serverErrors);
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={keyImage} alt="Key" style={{ height: "500px" }} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            padding: 2,
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            sx={{ opacity: 0.9, color: "#5862F5", fontWeight: "bold" }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ opacity: 0.5, color: "#5862F5", fontWeight: "bold" }}
          >
            Login to continue where you left off
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              textAlign: "center",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              label="Email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#5862F5",
                  },
                },
                "& .MuiInputLabel-root": {
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "#5862F5",
                  opacity: 0.8,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#5862F5",
                  },
                },
                "& .MuiInputLabel-root": {
                  opacity: 0.8,
                },
                "& label.Mui-focused": {
                  color: "#5862F5",
                  opacity: 0.8,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#5862F5",
                color: "white",
                fontWeight: "bold",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "#4B4DF7",
                },
              }}
            >
              Login
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          )}
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                color: "#808080",
              }}
            >
              Don't have an account?{" "}
              <Button
                onClick={handleRegister}
                sx={{
                  background: "none",
                  border: "none",
                  color: "#7D97F4",
                  textDecoration: "none",
                  cursor: "pointer",
                  padding: 0,
                  "&:hover": {
                    color: "#4B4DF7",
                    background: "none",
                  },
                }}
              >
                Sign up
              </Button>
            </Typography>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;
