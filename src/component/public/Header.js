import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <p onClick={() => navigate("/")} className="plink">
            Home
          </p>
        </h1>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <p
                className="plink"
                onClick={() => navigate("login")}
              >
                Login
              </p>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
