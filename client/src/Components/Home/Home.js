import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className='container m-3'>
        <button className='btn btn-primary' onClick={() => {
            navigate('/login');
        }}>
            Login
        </button>
        <button className='btn btn-success' onClick={() => {
            navigate('/register');
        }}>
            Register
        </button>
    </div>
    </>
  )
}

export default Home