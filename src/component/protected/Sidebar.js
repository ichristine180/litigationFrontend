import {
  faFileAlt,
  faInfoCircle,
  faScaleUnbalancedFlip,
  faTasksAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth).user?.user;
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <p className="nav-link" onClick={() => navigate("/")}>
            <i className="bi bi-grid"></i>
            <span>
              {user?.role === 0
                ? "Client Dashboard"
                : user?.role === 1
                ? "Officer Dashboard"
                : user?.role === 2
                ? "Lawyer Dashboard"
                : "MP Dashboard"}
            </span>
          </p>
        </li>
        {user?.role === 0 && (
          <>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/requestConsulation")}
              >
                <FontAwesomeIcon
                  icon={faScaleUnbalancedFlip}
                  className="px-2"
                />
                <span>Request Consulations</span>
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/tasks")}
              >
                <FontAwesomeIcon icon={faTasksAlt} className="px-2" />
                <span>Tasks</span>
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/documents")}
              >
                <FontAwesomeIcon icon={faFileAlt} className="px-2" />
                <span>Documents</span>
              </p>
            </li>
          </>
        )}
        {(user?.role === 1 || user?.role === 3) && (
          <>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/allConsulations")}
              >
                <FontAwesomeIcon
                  icon={faScaleUnbalancedFlip}
                  className="px-2"
                />
                <span>All Consulations</span>
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/customers")}
              >
                <FontAwesomeIcon icon={faUsers} className="px-2" />
                <span>Customers</span>
              </p>
            </li>
          </>
        )}
        {user?.role === 3 && (
          <>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/staff")}
              >
                <FontAwesomeIcon icon={faUsers} className="px-2" />
                <span>Staff management</span>
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link collapsed"
                onClick={() => navigate("/report")}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="px-2" />
                <span>Report</span>
              </p>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
