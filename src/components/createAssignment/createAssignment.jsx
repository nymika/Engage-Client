import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import {
    Grid,
    Paper,
    TextField,
    Button,
    CircularProgress,
} from "@material-ui/core";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { ToastContainer} from "react-toastify";
import { BACK_SERVER_URL } from "../../config/config";
import ErrorToast, {SuccessToast}  from "../error";

const CreateAssignment = () => {
    const [assignmentCode, setAssignmentCode] = useState("");
    const [classCode, setClassCode] = useState(window.location.pathname.substring(1, 8));
    const [loading, setLoading] = useState(false);
    const [deadline, setDeadline] = useState(new Date());
    const [created, setCreated] = useState(false);
    const accessToken = localStorage.getItem('access-token');

    const handleChangeDeadline = (newValue) => {
        setDeadline(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        //Create new Assignment
        axios
            .post(`${BACK_SERVER_URL}/api/assignment/createNew`, {
                assignment_code: assignmentCode,
                classCode,
                deadline
            }, {
                headers: {
                    authorization: accessToken
                }
            })
            .then((res) => {
                setCreated(true);
                SuccessToast("Assignment Created Successfully")
            })
            .catch((err) => {
                setLoading(false);
                var error = "Unauthorized";
                if (err.response.data.message)
                    error = err.response.data.message;
                ErrorToast(error)
            });
    };

    if (created) return <Redirect to={`/${classCode}/${assignmentCode}/problemset`} />;
    return (
        <Grid align="center" className="signin-container">
            <ToastContainer />
            <Paper className="signin-paper">
                <Grid align="center">
                    <h2 className="signin-title">Create new Assignment</h2>
                </Grid>
                <TextField
                    label="Assignment Code"
                    placeholder="Enter Assignment Code"
                    name="assignmentCode"
                    id="assignmentCode"
                    onChange={(e) => setAssignmentCode(e.target.value)}
                    fullWidth
                    required
                />
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Deadline"
                        value={deadline}
                        onChange={handleChangeDeadline}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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
                        </>
                    ) : (
                        "Create New Assignment"
                    )}
                </Button>
            </Paper>
        </Grid>
    )
}

export default CreateAssignment;