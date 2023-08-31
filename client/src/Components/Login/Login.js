import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [alert,setAlert] = useState(<></>);
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSetAlert = (message,status) => {
      const bg = status == "success" ? "success" : "danger"
      setAlert(
        <div
          className={`alert alert-${bg} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{message}</strong> 
        </div>
      );
    }

    const handleLogin = async() => {
      setAlert(<></>);
      const obj = {
        email: email,
        password: password,
      };

      try{
        const response = await axios.post(`http://localhost:5001/login`, obj);
        const apiData = await response.data;
        console.log("API data : ", apiData);
        handleSetAlert(apiData.message,"success");
        // console.log(login)
        login(obj);
        navigate('/business');
      }catch(err){
        handleSetAlert(err.response.data.message,"failure");
      }
    }


    
  return (
   <>
  
    <div className="container my-3 p-3 card">
       <div className="container">
        {alert}
      </div>
      <div className="card-header">
        <h3 className="text-center">Login</h3>
      </div>
      
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="col-sm-2 col-form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput"
            placeholder="input your email here"
            onChange={(e)=>{
                setEmail(e.target.value)
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
              onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-success mb-3" onClick={handleLogin}>
            Login
          </button>
        </div>
      
    </div>
   </>
  );
};

export default Login;
