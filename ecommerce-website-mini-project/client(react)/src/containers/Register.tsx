import React, { useState } from "react";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const onInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(email, password, name);
    const { data } = await UserService.register(name, email, password);
    console.log(data);
    history.push("/login");
  };
  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-3">
        <h4 className="text-center mb-4 mt-3">Create Account</h4>
        <form>
          <div className="form-group m-3">
            <label>Your Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group m-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="xyz@abc.com"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group m-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary m-4"
              onClick={(e) => onSubmit(e)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
