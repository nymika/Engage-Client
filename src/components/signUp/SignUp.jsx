import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { AuthContext } from "../../authContext";
import { ToastContainer } from "react-toastify";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import "./signUp.css";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");

  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;

  const handleChangeUserType = (event) => {
    setUserType(event.target.value);
  };

  const validateEmail = (e) => {
    const emailreg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!e.target.value.match(emailreg))
      setEmailError("Please enter a valid email address!");
    else setEmailError("");
    setEmail(e.target.value);
  };

  const validatePassword = (e) => {
    const passwordreg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!e.target.value.match(passwordreg))
      setPasswordError(
        "Use 8 or more characters with a mix of captial letters, numbers & symbols :)"
      );
    else setPasswordError("");
    setPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    const passwordreg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!e.target.value.match(passwordreg))
      setPasswordError(
        "Use 8 or more characters with a mix of letters, numbers & symbols :)"
      );
    else setPasswordError("");
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      userType,
    }

    axios
      .post(`${BACK_SERVER_URL}/api/user/signup`, data)
      .then((res) => {
        localStorage.setItem("access-token", res.data.token);
        localStorage.setItem("login", true);
        setLogin(true);
      })
      .catch((err) => {
        setLoading(false);
        const error = err.response ? err.response.data.message : err.message;
        ErrorToast(error)
      });
  };

  if (login) return <Redirect to="/" />;

  return (
    <Grid align="center" className="signup-container">
      <ToastContainer />
      <Paper className="signup-paper">
        <Grid align="center">
          <Avatar className="signup-avatar">
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="signup-title">Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="signup-name-container">
            <TextField
              fullWidth
              id="firstname"
              name="firstname"
              label="First Name"
              placeholder="Enter your First Name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
              required
            />
            <TextField
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            helperText={emailError}
            onChange={(e) => validateEmail(e)}
            error={emailError.length > 0}
          />
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            id="password"
            value={password}
            helperText={passwordError}
            onChange={(e) => validatePassword(e)}
            error={passwordError.length > 0}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Enter your password again"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            helperText={passwordError}
            onChange={(e) => validateConfirmPassword(e)}
            error={passwordError.length > 0}
          />

          <FormControl fullWidth>
            <InputLabel id="userType">User Type</InputLabel>
            <Select
              label="userType"
              id="userType"
              value={userType}
              onChange={(e) => handleChangeUserType(e)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Instructor</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            style={{ marginTop: "30px" }}
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "30px" }}
          >
            {loading ? (
              <CircularProgress size={"23px"} style={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
