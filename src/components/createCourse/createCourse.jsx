import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    CircularProgress,
} from "@material-ui/core";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContainer } from "react-toastify";
import ErrorToast, { SuccessToast } from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import "./createCourse.css"

const CreateCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem('access-token');

    //Create new course
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${BACK_SERVER_URL}/api/class/create`, {
                className: courseName, subjectCode
            }, {
                headers: {
                    authorization: accessToken
                }
            })
            .then((res) => {
                SuccessToast("Class Created Successfully")
            })
            .catch((err) => {
                setLoading(false);
                var error = "Unauthorized";
                if (err.response.data.message)
                    error = err.response.data.message;
                ErrorToast(error)
            });
    };
    return (
        <Grid align="center" className="signin-container">
            <ToastContainer />
            <Paper className="signin-paper">
                <Grid align="center">
                    <Avatar className="signin-avatar">
                        <AddCircleIcon />
                    </Avatar>
                    <h2 className="signin-title">Create new Course</h2>
                </Grid>
                <br />
                <TextField
                    label="Course Name"
                    placeholder="Enter course name"
                    id="courseName"
                    name="courseName"
                    onChange={(e) => setCourseName(e.target.value)}
                    autoFocus
                    fullWidth
                    required
                />
                <TextField
                    label="Subject Code"
                    placeholder="Enter subject Code"
                    name="subjectCode"
                    id="subjectCode"
                    onChange={(e) => setSubjectCode(e.target.value)}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className="signin-btn"
                    onClick={handleSubmit}
                    fullWidth
                >
                    {loading ? (
                        <>
                            <CircularProgress size={"23px"} style={{ color: "white" }} />
                            <Redirect to="/" />
                        </>
                    ) : (
                        "Create New Course"
                    )}
                </Button>
            </Paper>
        </Grid>
    )
}

export default CreateCourse;