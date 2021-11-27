import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CreateAssignment from "./components/createAssignment/createAssignment";
import ProblemSet from "./components/problemset/ProblemSet";
import Problem from "./components/problem/Problem";
import AddProblem from "./components/problem/addproblem/AddProblem";
import NavBar from "./components/navbar/NavBar";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/home/Home";
import UserSubmission from "./components/userSubmission/UserSubmission";
import MyProfile from "./components/myProfile/MyProfile";
import CreateCourse from "./components/createCourse/createCourse.jsx";
import ErrorRoutes from "./components/404Error/404Page";
import { AuthContext } from "./authContext";

import "./App.css";

const App = () => {
  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;
  return (
    <div style={{ height: "100%" }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/createCourse" component={CreateCourse} />
          <Route exact path="/:classCode/createAssignment" component={CreateAssignment} />
          <Route exact path="/:classCode/:assignmentCode/addproblem" component={AddProblem} />
          <Route exact path="/:classCode/:assignmentCode/problemset" component={ProblemSet} />
          <Route exact path="/:assignmentCode/problem/:ProblemId" component={Problem} />
          <Route exact path="/mySubmissions" component={UserSubmission} />
          {
            login ? <Route exact path="/" component={MyProfile} /> : <Route exact path="/" component={Home} />
          }
          <Route component={ErrorRoutes}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
