import React, { useEffect, useState } from "react";
import axios from "axios";
import "flag-icon-css/css/flag-icon.min.css";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import CourseCard from "./courseCard/CourseCard";
import JoinCourse from "../joinCourse/joinCourse";
import newCourse from '../../assets/new-course1.png';
import "./MyProfile.css";

const StudentProfile = ({ user }) => {
    const [myCourses, setmyCourses] = useState([]);
    const [load, setLoad] = useState(true);

    //Set courses joined by student
    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        axios.post(`${BACK_SERVER_URL}/api/class/`, {}, {
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
    }, [load])

    return (
        <div className="dashboard-right">
            <div className="dashboard-top-right">
                <div className="courses-text-container">
                    {(myCourses[0]) ? (
                        <div >
                            <h1 className="signin-title">My Joined Courses:</h1>
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
                                You have not joined any classroom yet.
                            </p>
                        </div>
                    )}
                </div>

                <div className="courses-image-container">
                    <JoinCourse />
                    <img src={newCourse} alt="NewCourse" className="new-course-image" />
                </div>
            </div>
            <br /> <br />
        </div>
    );
};

export default StudentProfile;