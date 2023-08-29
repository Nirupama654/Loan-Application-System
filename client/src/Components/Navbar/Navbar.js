import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-inverse bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <p className="navbar-brand text-white">
              Loan Application System
            </p>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
