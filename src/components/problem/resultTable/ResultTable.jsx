import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIncon from "@material-ui/icons/HighlightOff";

import "./resultTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

const ResultTable = ({ results, resultRef }) => {
  const classes = useStyles();
  return (
    <div className="main">
      <p className="nomenclature">Note</p>
      <p className="notes">AC: "Accepted",
        WA: "Wrong Answer",
        CE: "Compilation Error",
        RTE: "Runtime Error",
        TLE: "Time Limit Exceeded",
        MLE: "Memory Limit Exceeded"</p>
      <TableContainer
        component={Paper}
        className="result-table-container"
        ref={resultRef}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="result-table-header">
                #
              </TableCell>
              <TableCell align="center" className="result-table-header">
                Verdict
              </TableCell>
              <TableCell align="center" className="result-table-header">
                Input
              </TableCell>
              <TableCell align="center" className="result-table-header">
                Output
              </TableCell>
              <TableCell align="center" className="result-table-header">
                Time
              </TableCell>
              <TableCell align="center" className="result-table-header">
                Memory
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {results ?
              results.map((result, index) => {
                return [
                  <TableRow key={index}>
                    <TableCell align="center" className="result-table-content">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" className="result-table-content">
                      <span style={{ alignItems: "center" }}>
                        {result.status === 'AC' ? (
                          <CheckCircleIcon className="result-table-accepted-icon" />
                        ) : (
                          <>
                            <CancelIncon className="result-table-error-icon" />
                            <p>{result.status}</p>
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="result-table-content">
                      {result.input}
                    </TableCell>
                    <TableCell align="center" className="result-table-content">
                      {result.output}
                    </TableCell>
                    <TableCell align="center" className="result-table-content">
                      {result.cpuTime} ms
                    </TableCell>
                    <TableCell align="center" className="result-table-content">
                      {result.memory / 1000} MB
                    </TableCell>
                  </TableRow>,
                ];
              }) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResultTable;
