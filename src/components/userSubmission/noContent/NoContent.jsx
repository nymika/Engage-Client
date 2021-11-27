import React from "react";
import Card from "@material-ui/core/Card";
import "./noContent.css";

const NoContent = () => {
  return (
    <div className="nocontent-container">
      <Card className="nocontent-card">
        <div>
          <p className="nocontent-title">
            No submissions yet!
          </p>
          <hr />
          <p className="nocontent-content">
            Happy Coding!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NoContent;
