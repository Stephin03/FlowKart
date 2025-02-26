import React from 'react';
import './Style.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessTokenFlowKart"); // Remove token
        navigate("/login"); // Redirect to login
    };

    return (
        <> 
            <div className="nav">
            <div className="nav-left">
                <h1>
                        Flow <span className="kart">Kart</span>
                </h1>
            </div>
                <div className="nav-right">
                    <NavLink to="/" className={({ isActive }) => `${isActive ? 'active' : ''}`}>Home</NavLink>
                    <NavLink to="/product-list?page=1" className={({ isActive }) => `${isActive ? 'active' : ''}`}>Your Product</NavLink>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                   
                </div>
            </div>
            <Outlet />
        </>
    );
};




export default NavBar;


