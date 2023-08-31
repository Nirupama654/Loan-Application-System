import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from "../Navbar/Navbar";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(<></>);

  const handleSetAlert = (message, status) => {
    const bg = status == "success" ? "success" : "danger";
    setAlert(
      <div
        className={`alert alert-${bg} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{message}</strong>
      </div>
    );
  };

  const handleRegister = async () => {
    setAlert(<></>);
    const obj = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`http://localhost:5001/register`, obj);
      const apiData = await response.data;
      console.log("API data : ", apiData);
      handleSetAlert(apiData.message, "success");
    } catch (err) {
      handleSetAlert(err.response.data.message, "failure");
    }
  };

  return (
   <>
   <Navbar/>
    <div className="container my-3 p-3 card">
      <div className="container">{alert}</div>
      <div className="card-header">
        <h3 className="text-center">Register</h3>
      </div>

      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput1"
          className="col-sm-2 col-form-label"
        >
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="input your email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col">
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="input your password here"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div class="valid-feedback">Looks good!</div>
      </div>
      <div className="col-auto">
        <button className="btn btn-secondary mb-3" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
   </>
  );
};

export default Register;

