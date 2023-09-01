import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user,logout, isAuthenticated } = useAuth();

  console.log(user)

  const handleLogout = () => {
    logout(); // Clear user state
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-inverse bg-dark">
        <div className="container-fluid">
          <div className="navbar-header p-3">
            <h2 className="navbar-brand text-white">
              <Link to="/" 
              style={{
                textDecoration : "none",
                color : "white"
              }}
              >Loan Application System</Link>
            </h2>
          </div>
         { isAuthenticated ?
         <div className="text-white">Welcome, {user.email} | 
         <span onClick={handleLogout} style={{cursor : "pointer", marginLeft : "4px"}}>
          Logout
       </span>
         </div>
         : 
         <Link to='/login' className="text-white mx-2">Login</Link>
         }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
