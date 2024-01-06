import { Link } from "react-router-dom";
import "./index.css";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1 className="app-name">Blogging</h1>
      <nav className="nav-card">
        <ul className="nav-list-card">
          <li className="nav-link">
            <Link to="/" className="link">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/create" className="link">Create</Link>
          </li>
          {localStorage.getItem("jwt")===null && <li className="nav-link">
            <Link to="/signin" className="link">Login</Link>
          </li>}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
