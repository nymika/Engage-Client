import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton
} from '@mui/material';
import { BACK_SERVER_URL } from "../../../config/config";
import ErrorToast from "../../error";
import "./CourseCard.css"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

const CourseCard = (props) => {
  const [assignments, setAssignments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");

    //Display Assignments of this Course.
    axios.post(`${BACK_SERVER_URL}/api/assignment/display`, {
      classCode: props.subheader
    }, {
      headers: {
        authorization: accessToken
      }
    })
      .then((res) => {
        setAssignments(res.data.assignments);
      })
      .catch((err) => {
        console.log(err)
        const error = "Error";
        ErrorToast(error)
      });
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar {...stringAvatar(props.title)} />
        }

        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }

        title={props.title}
        subheader={`ClassCode is: ${props.subheader}`}
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="assignments-add-heading">
            <p className="signin-title">Assignments:</p>
            <div className="addassignments">
              <Link to={`${props.subheader}/createAssignment`} >
                <Avatar className="signin-avatar">
                  <AddCircleIcon />
                </Avatar>
              </Link>
            </div>
          </div>
          <hr />
          {(assignments) ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {assignments.map((tdd) =>
                  <Grid item xs={4} key={tdd.assignment_code}>
                    <Link to={`/${props.subheader}/${tdd.assignment_code}/problemset`}>
                      <Button variant="contained">
                        {tdd.assignment_code}
                      </Button>
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          ) : null}
        </CardContent>
      </Collapse>
    </Card >
  )
}

export default CourseCard;