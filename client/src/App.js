import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import BusinessDetails from './Components/Business/BusinessDetails'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import PrivateRoute from './PrivateRoute';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Navbar/>
        <Routes> 
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/business" element={<BusinessDetails/>} />
          {/* <PrivateRoute path="/business" element={<BusinessDetails/>} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App




