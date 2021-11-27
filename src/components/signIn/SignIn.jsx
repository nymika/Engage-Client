import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  CircularProgress,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {ToastContainer} from "react-toastify";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import { AuthContext } from "../../authContext";
import "./signIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${BACK_SERVER_URL}/api/user/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("access-token", res.data.token);
        localStorage.setItem("login", true);
        setLogin(true);
      })
      .catch((err) => {
        setLoading(false);
        ErrorToast("Invalid Username or Password!" )
      });
  };

  if (login) return <Redirect to="/" />;

  return (
    <Grid align="center" className="signin-container">
      <ToastContainer />
      <Paper className="signin-paper">
        <Grid align="center">
          <Avatar className="signin-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <h2 className="signin-title">Sign In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter your email address"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="signin-btn"
          onClick={handleSignIn}
          fullWidth
        >
          {loading ? (
            <CircularProgress size={"23px"} style={{ color: "white" }} />
          ) : (
            "Sign In"
          )}
        </Button>

        <Typography style={{ color: "#424040" }}>
          Don't have an account?
          <Link to="/signup" style={{ margin: "5px", cursor: "pointer", color: "#000000", fontWeight: "bold"}}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
