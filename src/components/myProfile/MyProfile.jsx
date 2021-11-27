import React, { useEffect, useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import Dashboard from "./dashboard";
import FacultyProfile from "./FacultyProfile";
import StudentProfile from "./StudentProfile";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);

  //Set User
  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    axios.post(`${BACK_SERVER_URL}/api/user/profile`, {}, {
      headers: {
        authorization: accessToken
      }
    })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("userType", res.data.userType)
      })
      .catch((err) => {
        console.log(err)
        const error = "Error";
        ErrorToast(error)
      });
  }, [])

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="dashboard-spinner">
        <BeatLoader color={"#343a40"} size={30} loading={loader} />
      </div>
      <Dashboard user={user} />
      {
        (user.userType === 'admin') ?
          <FacultyProfile user={user} /> :
          <StudentProfile user={user} />
      }
    </div>
  );
};

export default MyProfile;