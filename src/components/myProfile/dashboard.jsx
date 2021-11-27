import React from 'react';
import {
    MailOutline,
    PermIdentity,
} from "@material-ui/icons";
import Avatar from '@mui/material/Avatar';

const Dashboard = (props) => {
    const user = props.user;
    function stringToColor(string) {
        let hash = 0;
        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        return color;
    }

    function stringAvatar(name) {
        if (name) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name[0].toUpperCase()}${name[1].toUpperCase()}`,
            };
        }
    }
    return (
        <div className="dashboard-left">
            <div className="dashboard-top">
                {
                    (user.firstname && user.lastname) ?
                        <Avatar {...stringAvatar(user.firstname[0] + user.lastname[0])} /> :
                        <Avatar {...stringAvatar("user")} />
                }
                <div className="dashboard-top-title">
                    <span className="dashboard-username">
                        {user.firstname + " " + user.lastname}
                    </span>
                    <span className="dashboard-user-title">{user.email}</span>
                </div>
            </div>
            <div className="dashboard-bottom">
                <span className="dashboard-content-title">Account Details</span>
                <div className="dashboard-info">
                    <PermIdentity className="dashboard-image" />
                    <span className="dashboard-info-title">{user.userType}</span>
                </div>
                <span className="dashboard-content-title">Contact Details</span>
                <div className="dashboard-info">
                    <MailOutline className="dashboard-icon" />
                    <span className="dashboard-info-title">{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;