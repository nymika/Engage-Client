import React from "react";
import bg from '../../assets/bg.png';
import './Home.css'

const Home = () => {
  return (
    <div className="flex-container" style={{ backgroundColor: "#ffffff", height: "100%" }}>
      <div className="text-container">
        <h1 className="h1Text">Simplified Teaching Experience</h1>
        <hr />
        <h2 className="h2Text">The future of automated grading is here.</h2>
        <br />
        <h3 className="h3Text"> Offer autograded programming assignments to your students..</h3>
      </div>
      <div className="bg-container">
        <img src={bg} alt="Logo" className="bg-image" />
      </div>
    </div>
  );
};

export default Home;
