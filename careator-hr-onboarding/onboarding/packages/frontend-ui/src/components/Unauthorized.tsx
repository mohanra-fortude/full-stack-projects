import React from "react";
import "../styles/ErrorPage.css";
import { Button } from "antd";

function Unauthorized() {
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <div className="error">
      {/* <img src="../../Images/Logo.svg" alt="" /> */}
      <p className="message">
        <h3>Sorry, you are not authorized to view this page! 😥 </h3>
        <Button
          onClick={goBack}
          className="button"
          type="primary"
          shape="round"
          value="large"
        >
          Go Back
        </Button>
      </p>
    </div>
  );
}
export default Unauthorized;
