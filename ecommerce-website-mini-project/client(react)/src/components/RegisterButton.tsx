import React from "react";
import { Link } from "react-router-dom";

function RegisterButton() {
  return (
    <div>
      <Link
        className="btn btn-sm btn-outline-primary mt-3 w-100"
        to={"/register"}
      >
        Register
      </Link>
    </div>
  );
}

export default RegisterButton;
