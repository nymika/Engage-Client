import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer} from "react-toastify";
import ErrorToast, {SuccessToast} from "../error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Chip from "@material-ui/core/Chip";
import { BACK_SERVER_URL, JDoodleclientId, JDoodleclientSecret } from "../../config/config";
import CodeEditor from "./codeEditor/CodeEditor";
import ResultTable from "./resultTable/ResultTable";
import ProblemSubmission from "../userSubmission/ProblemSubmission"
import "./problem.css";

const Problem = () => {
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [problemDoesNotExists, setProblemDoesNotExists] = useState(false);
  const [problem, setProblem] = useState({});
  const [language, setLanguage] = useState("C++");
  const [darkMode, setDarkMode] = useState(true);
  const [code, setCode] = useState("");
  const [results, setResults] = useState([]);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const accessToken = localStorage.getItem("access-token");
  const problemId = window.location.pathname.substring(13);
  const assignmentCode = window.location.pathname.substring(1, 4);

  const languageExtention = {
    C: "c",
    "C++": "cpp17",
    Java: "java",
    Python3: "python3",
  };

  const versionIndex = {
    C: "4",
    "C++": "0",
    Java: "3",
    Python3: "3",
  };

  useEffect(() => {
    //Get problem details
    axios
      .post(`${BACK_SERVER_URL}/api/assignment/ProblemDetail`, {
        assignmentCode,
        problemId
      }, {
        headers: { authorization: accessToken }
      })
      .then((res) => {
        if (!res.data) {
          setProblemDoesNotExists(true);
        }
        else {
          setProblem(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        ErrorToast(error )
      });

    return () => { };
  }, [window.location.pathname.substring(9)]);

  const handleLanguageSelect = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  const handleModeChange = (themeMode) => {
    setDarkMode(themeMode);
  };

  const onCodeChange = (newValue) => {
    setCode(newValue);
  };

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const submit = (e) => {
    e.preventDefault();
    const operation = e.currentTarget.value.toString();
    if (operation === "runcode")
      setRunLoading(true);
    else
      setSubmitLoading(true);

    const accessToken = localStorage.getItem("access-token");
    const UserId = parseJwt(accessToken);

    var data = {
      assignmentCode: window.location.pathname.substring(1, 4),
      problemId: window.location.pathname.substring(13),
      problemName: problem.problemName,
      UserId: UserId._id,
      source_code: code,
      language: languageExtention[language],
      versionIndex: versionIndex[language],
      stdin: problem.input,
      clientId: JDoodleclientId,
      clientSecret: JDoodleclientSecret,
      operation: operation,
    }

    //send problemData to create new submission.
    axios
      .post(`${BACK_SERVER_URL}/api/submission/new`, data, {
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        if (operation === "runcode") setRunLoading(false);
        else {
          setRunLoading(false);
          setSubmitLoading(false);
          SuccessToast("Submission done")
        }
        setResults(res.data.result);
        if (resultRef.current) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setRunLoading(false);
        setSubmitLoading(false);
        const error = err.response ? err.response.data.message : err.message;
        ErrorToast(error )
      });
  };

  return problemDoesNotExists ? (
    <>
      <h1>Not Found</h1>
    </>
  ) : loading ? (
    <div className="problem-loading-spinner">
      <BeatLoader color={"#343a40"} size={30} loading={loading} />
    </div>
  ) : (
    <div>
      <div className="problem-container">
        <ToastContainer />
        <div className="problem-title-wrapper">
          <div className="problem-title">
            <FontAwesomeIcon
              title="Happy Coding!"
              className="problem-code-icon"
              icon={faCode}
            />
            {problem.problemName}
          </div>
          <div className="problem-details">
            <div className="problem-details-item">
              <Chip
                label={"Time: " + problem.time + "s"}
                variant="outlined"
                color="primary"
                style={{ fontWeight: "600", fontSize: "medium" }}
              />
            </div>
            <div className="problem-details-item">
              <Chip
                label={"Memory: " + problem.memory + "MB"}
                variant="outlined"
                color="primary"
                style={{ fontWeight: "600", fontSize: "medium" }}
              />
            </div>
          </div>
        </div>
        <div className="problem-statement-wrapper">
          <div
            className="problem-statement"
            dangerouslySetInnerHTML={{
              __html: problem.problemStatement
                ? problem.problemStatement.replace(/<br>/g, " ")
                : null,
            }}
          />
        </div>
        <div className="problem-sample-test-wrapper">
          {problem.sampleTestcases &&
            problem.sampleTestcases.map((testcase, index) => (
              <div className="problem-sample-test" key={index}>
                <div className="problem-sample-test-input">
                  <span className="problem-sample-test-input-title">
                    Sample Input {index + 1}
                  </span>
                  <pre className="problem-sample-test-input-content">
                    {testcase.input}
                  </pre>
                </div>
                <div className="problem-sample-test-output">
                  <span className="problem-sample-test-output-title">
                    Sample Output {index + 1}
                  </span>
                  <pre className="problem-sample-test-output-content">
                    {testcase.output}
                  </pre>
                </div>
              </div>
            ))}
          {problem.explanation ? (
            <div className="problem-sample-test-explanation">
              <span className="problem-sample-test-explanation-title">
                Explanation :{" "}
              </span>
              <div className="problem-sample-test-explanation-content">
                {problem.explanation}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {
        (localStorage.getItem("userType") !== 'admin') ?
          <>
            <CodeEditor
              language={language}
              handleLanguageSelect={handleLanguageSelect}
              darkMode={darkMode}
              handleModeChange={handleModeChange}
              onCodeChange={onCodeChange}
              submit={submit}
              runLoading={runLoading}
              submitLoading={submitLoading}
            />
            <ResultTable results={results} resultRef={resultRef} />
            <br />
            <br />
          </> :
          <ProblemSubmission problemId={problemId} assignmentCode={assignmentCode} />
      }
    </div>
  );
};

export default Problem;