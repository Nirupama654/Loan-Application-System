import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout(); // Clear user state
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-inverse bg-dark">
        <div className="container-fluid">
          <div className="navbar-header p-3">
            <h2 className="navbar-brand text-white">Loan Application System</h2>
          </div>
         { isAuthenticated && <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
