import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/header.css";

const Header = () => (
  <nav className="header">
    <Link to="/">Home</Link>
    <Link to="/create">Add Card</Link>
    <Link to="/flip">Study Mode</Link>
  </nav>
);

export default Header;
