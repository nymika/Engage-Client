import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip ,
  Button
 } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { BeatLoader } from "react-spinners";
import { ToastContainer} from "react-toastify";
import ErrorToast from "../error";
import { BACK_SERVER_URL } from "../../config/config";
import Sidebar from "../sidebar/SideBar";
import "./problemset.css";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { id: "id", label: "#", minWidth: 10 },
  { id: "name", label: "Problem Name", minWidth: 100 },
  { id: "tags", label: "Tags", minWidth: 200 },
  { id: "testcases", label: "Sample Testcases", minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "950px", 
  },
  container: {
    maxHeight: 950,
  },
});

export default function ProblemSet() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allProblems, setAllProblems] = useState([]);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagsSelected, setTagsSelected] = useState(false);
  var classCode = window.location.pathname.substring(1, 8);
  var assignmentCode = window.location.pathname.substring(9, 12);
  const accessToken = localStorage.getItem("access-token");

  //display all problems of the assignment.
  useLayoutEffect(() => {
    axios
      .post(`${BACK_SERVER_URL}/api/assignment/displayProblem`, {
        assignmentCode
      }, {
        headers: { authorization: accessToken }
      })
      .then((res) => {
        let problems = res.data.problems;
        setAllProblems(problems);
        setRows(problems);
        setLoader(false);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        ErrorToast(error )
      });
  }, []);

  //Filter problems by search and Tags.
  useEffect(() => {
    const getPageData = () => {
      let filtered = allProblems;
      if (searchQuery) {
        filtered = allProblems.filter((p) =>
          p.problemName.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setTagsSelected(false);
        setRows(filtered);
      } else if (!tagsSelected) {
        setRows(filtered);
      }
    };
    getPageData();

    // eslint-disable-next-line
  }, [searchQuery, allProblems]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return (
    <div className="problemset-container">
      <ToastContainer />
      <div className="problemset-left">
        {
          (localStorage.getItem("userType") === 'admin') ?
            (<div className="new-problem">
              <Link to={`/${classCode}/${assignmentCode}/addproblem`}>
                <Button variant="contained" color="primary" fullWidth>
                  Add new Problem
                </Button>
              </Link>
            </div>) : null
        }
        <Sidebar
          problems={allProblems}
          setRows={setRows}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tagsSelected={tagsSelected}
          setTagsSelected={setTagsSelected}
        />
      </div>

      <div className="problemset-right">
        <SearchBar
          value={searchQuery}
          onChange={(newValue) => setSearchQuery(newValue)}
          onRequestSearch={() => setSearchQuery(searchQuery)}
          className="problem-searchbar"
          onCancelSearch={() => setSearchQuery("")}
        />
        <div className="problemset-spinner">
          <BeatLoader color={"#343a40"} size={30} loading={loader} />
        </div>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <p className="column-title">{column.label}</p>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id === "id" ? page * rowsPerPage + index + 1 : row[column.id];
                          if (column.id === "tags") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div
                                  style={{ display: "flex", columnGap: "5px" }}
                                >
                                  {value.map((tag, i) => (
                                    <Chip
                                      key={i}
                                      label={tag}
                                      variant="outlined"
                                      color="primary"
                                      style={{ display: "flex" }}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                            );
                          } else if (column.id === "testcases") {
                            let badgeColor = "#FF980d";
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Chip
                                  label={row.sampleTestcases.length}
                                  style={{
                                    fontWeight: "bold",
                                    color: "white",
                                    display: "flex",
                                    backgroundColor: badgeColor,
                                    maxWidth:100,
                                    justifyContent: "center"
                                  }}
                                />
                              </TableCell>
                            );
                          } else if (column.id === "name") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Link
                                  to={`/${assignmentCode}/problem/${allProblems[index]._id}`}
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    textDecoration: "none",
                                    color: "#1a237e",
                                  }}
                                >
                                  {row.problemName}
                                </Link>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    color: "#1a237e",
                                  }}
                                >
                                  {value}
                                </span>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
