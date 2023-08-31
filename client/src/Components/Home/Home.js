import React from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container m-3 justify-content-center">
        <h1 className="text-center text-secondary p-3">
          Welcome to Loan Application System!
        </h1>
        <div className="container my-3">
          <div className="row">
            <div className="col-md-6 my-1">
              <div className="card p-4 mb-3 h-100"> {/* Add h-100 class to make cards equal height */}
                <h3 className="text-center text-secondary p-3">
                  Already Registered to Loan Application System ?
                </h3>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary col-6"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-1">
              <div className="card p-4 mb-3 h-100"> {/* Add h-100 class to make cards equal height */}
                <h3 className="text-center text-secondary p-3">
                  New to Loan Application System ?
                </h3>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-success col-6"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
