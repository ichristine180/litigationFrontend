import React from "react";
import { logoutUser } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeaderP({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const footer = document.getElementById("header");
  footer.style.backgroundColor = "#fff";
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <span className="d-none d-lg-block">LMS</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <p
              className="nav-link nav-profile d-flex align-items-center pe-0"
              data-bs-toggle="dropdown"
            >
              <span
                className="d-none d-md-block dropdown-toggle ps-2"
                style={{ cursor: "pointer" }}
              >
                {user?.firstName}
              </span>
            </p>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>
                  {user?.firstName} {user?.lastName}
                </h6>
                <span> {user?.mobileNo}</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Log Out</span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderP;
