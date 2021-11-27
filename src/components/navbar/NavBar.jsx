import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import ErrorToast, { SuccessToast } from '../error';
import { AuthContext } from "../../authContext";
import { BACK_SERVER_URL } from "../../config/config";
import logo from '../../assets/microsoft-logo.png'
import "./navbar.css";

export default function NavBar() {
  const accessToken = localStorage.getItem('access-token');

  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;

  const logoutClick = () => {
    axios
      .post(`${BACK_SERVER_URL}/api/user/logout`, {}, {
        headers: {
          authorization: accessToken
        }
      })
      .then(() => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("login");
        localStorage.removeItem("userType")
        setLogin(false);
        SuccessToast("Logged out. Please refresh")
      })
      .catch((err) => {
        ErrorToast("Network Error")
      });
    <Redirect to="/" />;
  };
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navLeft">
          <Link to="/" className="logo" style={{ textDecoration: "none" }}>
            <img src={logo} alt="Logo" className="logo-image" />
            Engage Classroom
          </Link>
        </div>
        <div className="navRight">
          {login ? (
            <>
              {
                (localStorage.getItem("userType") === 'admin') ?         
                  null :
                  <Link to="/mySubmissions" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                    >
                      MY SUBMISSIONS
                    </Button>
                  </Link>
              }

              <Button onClick={logoutClick}
                color="primary"
                variant="contained"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}