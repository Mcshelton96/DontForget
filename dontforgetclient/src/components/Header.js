import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        DONTFORGET
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
          My Letters
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/letter/add" className="nav-link">
            New Letter
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/letter/edit" className="nav-link">
            Edit Letter
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/letters/add" className="nav-link">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts/list" className="nav-link">
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;