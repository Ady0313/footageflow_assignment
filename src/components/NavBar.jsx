import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">FootageFlow Assignment</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search Within</Link>
                </li>
                
                <li>
                    <Link to="/storygenerator">Story Generator</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
