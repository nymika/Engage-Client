import React, { useState } from 'react';
import axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import { BACK_SERVER_URL } from "../../config/config";
import ErrorToast, {SuccessToast} from "../error";

const JoinCourse = () => {
    const [classCode, setClassCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const accessToken = localStorage.getItem('access-token');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //Join a course
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${BACK_SERVER_URL}/api/class/join`, {
                classCode
            }, {
                headers: {
                    authorization: accessToken
                }
            })
            .then((res) => {
                SuccessToast("Class Joined successfully")
            })
            .catch((err) => {
                setLoading(false);
                var error = "Unauthorized";
                if (err.response.data.message)
                    error = err.response.data.message;
                ErrorToast(error)
            });

        setOpen(false)
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} fullWidth>
                Join a Class.
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Class code"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ask your teacher for the class code, then enter it here.
                    </DialogContentText>
                    <br />
                    <TextField
                        required
                        id="outlined-required"
                        label="Class Code"
                        name="classCode"
                        onChange={(e) => setClassCode(e.target.value)}
                        defaultValue=""
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit} autoFocus>
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default JoinCourse;