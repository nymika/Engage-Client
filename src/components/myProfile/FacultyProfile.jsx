import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Button
} from '@mui/material';
import "flag-icon-css/css/flag-icon.min.css";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import CourseCard from "./courseCard/CourseCard";
import newCourse from '../../assets/new-course1.png';
import "./MyProfile.css";

const FacultyProfile = ({ user }) => {
    const [myCourses, setmyCourses] = useState([]);

    //Set courses created by faculty.
    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        axios.post(`${BACK_SERVER_URL}/api/class/faculty`, {}, {
            headers: {
                authorization: accessToken
            }
        })
            .then((res) => {
                setmyCourses(res.data);
            })
            .catch((err) => {
                console.log(err)
                const error = "Error";
                ErrorToast(error)
            })
    }, [user])

    return (
        <div className="dashboard-right">
            <div className="dashboard-top-right">
                <div className="courses-text-container">
                    {(myCourses[0]) ? (
                        <div >
                            <h1 className="signin-title">My Created Courses:</h1>
                            <hr />
                            {myCourses.map((tdd) =>
                                <div key={tdd.classCode}>
                                    <CourseCard title={tdd.className}
                                        subheader={tdd.classCode}
                                        subjectCode={tdd.subjectCode} />
                                    <br />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="dashboard-courses-no-data">
                            <p className="dashboard-courses-no-data-title">
                                You have not created any classroom yet.
                            </p>
                        </div>
                    )}
                </div>

                <div className="courses-image-container">
                    <Link to="/createCourse"><Button variant="contained" fullWidth>Create a Course</Button></Link>
                    <img src={newCourse} alt="NewCourse" className="new-course-image" />
                </div>
            </div>
            <br /> <br />
        </div>
    );
};

export default FacultyProfile;