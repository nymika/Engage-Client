/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Redirect } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import {
  Form,
  Button as ReactButton,
  Row,
  Col,
  Collapse,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faPaperPlane,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  Button,
  CircularProgress,
} from "@material-ui/core";
import { ToastContainer} from "react-toastify";
import ErrorToast, {SuccessToast} from "../../error";
import "react-toastify/dist/ReactToastify.css";
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";
import "./addproblem.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BACK_SERVER_URL } from "../../../config/config";
import { tagsData } from "../../../utils";

const SampleTestcase = ({ i, input, output, setInput, setOutput }) => {
  return (
    <div>
      <Table>
        <tbody>
          <br />
          <tr>
            <Form.Group className="input-output">
              <Form.Label className="sample-testcase-input">
                Sample Input {i + 1}
              </Form.Label>
              <Form.Control
                as="textarea"
                name={"input" + (i + 1)}
                rows={3}
                onChange={(e) => setInput([...input, e.target.value])}
              />
              <br />
              <Form.Label className="sample-testcase-output">
                Sample Output {i + 1}
              </Form.Label>
              <Form.Control
                as="textarea"
                name={"output" + (i + 1)}
                rows={3}
                onChange={(e) => setOutput([...output, e.target.value])}
              />
            </Form.Group>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const CreateProblem = () => {
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [problemStatement, setProblemStatement] = useState("");
  const [problemName, setProblemName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [time, setTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [currentTags, setCurrentTags] = useState([]);

  const [children, setChildren] = useState([]); //combining both input & output.
  const [open, setOpen] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [addedProblem, setAddedProblem] = useState(false);
  const reactQuill = useRef();

  const tags = tagsData

  const handleChangeProblemStatement = (value) => {
    setProblemStatement(value);
  };

  const handleTagSelect = (tag) => {
    let newTags;
    if (!currentTags.includes(tag)) {
      newTags = [tag, ...currentTags];
    } else {
      newTags = currentTags.filter((curTag) => curTag !== tag);
    }
    setCurrentTags(newTags);
  };

  const addTestcase = () => {
    setChildren(
      children.concat(
        <SampleTestcase
          key={children.length}
          i={children.length}
          input={input}
          setInput={setInput}
          output={output}
          setOutput={setOutput}
        />
      )
    );
  };

  const handleDelete = () => {
    let newChildren = children;
    newChildren.splice(-1);
    setChildren([...newChildren]);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    var assignmentCode = window.location.pathname.substring(9, 12);
    const accessToken = localStorage.getItem("access-token");

    var ProblemData = {
      assignmentCode,
      problemStatement,
      problemName,
      input: JSON.stringify(input),
      output: JSON.stringify(output),
      explanation,
      time,
      memory,
      tags: currentTags
    }
    setAddedProblem(true);

    //Add Problem into assignments model.
    axios
      .post(`${BACK_SERVER_URL}/api/assignment/addProblem`,
        ProblemData, {
        headers: { authorization: accessToken }
      })
      .then(() => {
        setLoadingSpinner(false);
        SuccessToast("Problem Submitted Successfully")
      })
      .catch((err) => {
        setLoadingSpinner(false);
        const error = err.response ? err.response.data.message : err.message;
        ErrorToast(error )
      });
  };

  const modules = { formula: true };
  modules.toolbar = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  //Formats for editor
  const formats = [
    "header",
    "font",
    "background",
    "code",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "align",
    "direction",
    "link",
    "image",
    "code-block",
    "formula",
    "video",
  ];

  useEffect(() => {
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill });
    enableMathQuillFormulaAuthoring(reactQuill.current);
  }, []);

  var classCode = window.location.pathname.substring(1, 8);
  var assignmentCode = window.location.pathname.substring(9, 12);
  if (addedProblem)
    return <Redirect to={`/${classCode}/${assignmentCode}/problemset`} />;

  return (
    <div className="addproblem-container">
      <ToastContainer />
      <Form onSubmit={onFormSubmit} autoComplete="off">
        <Form.Group>
          <Form.Label className="add-problem-title">
            Problem Name
          </Form.Label>
          <Form.Control
            type="text"
            name="problemName"
            value={problemName}
            placeholder="Problem Name"
            onChange={(e) => {
              setProblemName(e.target.value);
            }}
            required
          />
        </Form.Group>

        <br />

        <Form.Group>
          <div>
            <Form.Label className="add-problem-statement">
              Problem Statement
            </Form.Label>
            <span style={{ float: "right", margin: "10px 0px" }}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ color: "black" }} />{" "}
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
                href="https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference"
              >
                Guide For Math Formulas
              </a>
            </span>
          </div>
          <ReactQuill
            ref={reactQuill}
            modules={modules}
            formats={formats}
            theme="snow"
            value={problemStatement}
            onChange={handleChangeProblemStatement}
            style={{
              wordBreak: "break-all",
              backgroundColor: "#fff",
              marginBottom: "20px",
            }}
            placeholder="Click here to insert text..."
          />
        </Form.Group>

        <Form.Group>{children}</Form.Group>
        <Form.Group>
          <div style={{ display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: "#fff",
                width: "80%",
              }}
              size="large"
              onClick={addTestcase}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Sample Testcase
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ color: "#fff", width: "20%" }}
              size="large"
              onClick={handleDelete}
              disabled={children.length === 0}
              type="button"
            >
              Delete &nbsp; <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="addproblem-explanation">
            Explanation
          </Form.Label>
          <Form.Control
            type="text"
            name="explanation"
            value={explanation}
            placeholder="Explanation"
            onChange={(e) => {
              setExplanation(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <ReactButton
            variant="warning"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            type="button"
            style={{ margin: "15px 0px" }}
          >
            Add Tags
          </ReactButton>
          <Collapse in={open}>
            <div style={{ marginBottom: "15px" }}>
              {tags.map((tag) => (
                <a
                  key={tag}
                  className="createproblem-tags-btn"
                  style={{
                    backgroundColor: currentTags.includes(tag)
                      ? "#4BB543" //#17a2b8"
                      : "#555", //"rgb(15, 5, 54)",
                    padding: "10px",
                    textDecoration: "none",
                  }}
                  onClick={() => handleTagSelect(tag)}
                >
                  <span
                    className="text-sm text-gray"
                    style={{
                      color: currentTags.includes(tag) ? "#fff" : "#fff",
                      fontSize: "13px",
                    }}
                  >
                    {tag}
                  </span>
                </a>
              ))}
            </div>
          </Collapse>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                placeholder="Time (in Seconds)"
                type="number"
                step="any"
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Memory (in MegaBytes)"
                type="number"
                onChange={(e) => setMemory(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={problemStatement === "" || currentTags.length === 0}
          style={{ width: "150px", margin: "10px 0px" }}
        >
          {loadingSpinner ? (
            <>
              <CircularProgress size={"23px"} style={{ color: "white" }} />
            </>
          ) : (
            "Submit"
          )}
          &nbsp;
          {loadingSpinner ? null : <FontAwesomeIcon icon={faPaperPlane} />}
        </Button>
      </Form>
    </div>
  );
};


export default CreateProblem;