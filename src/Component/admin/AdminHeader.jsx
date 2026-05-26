import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { MdLogout, MdMenu } from "react-icons/md";

export const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="border-bottom sticky-top bg-white shadow-sm">
      <div className="container-fluid px-4">
        <div
          className="d-flex flex-wrap justify-content-between align-items-center gap-3"
          style={{ height: "70px" }}
        >
          <div className="d-flex align-items-center gap-2">
            {/* Mobile Hamburger menu */}
            <button 
              onClick={toggleSidebar} 
              className="btn btn-light d-lg-none border-0 p-2 me-1 rounded-3 bg-light bg-opacity-75"
              title="Open Navigation"
            >
              <MdMenu size={22} className="text-dark" />
            </button>
            
            <Link to="/">
              <img src={logo} alt="logo" style={{ height: "40px" }} />
            </Link>
            <span className="fw-bold text-success border-start border-2 border-success px-3 py-1 d-none d-md-inline">
              Admin Dashboard
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
             <button
              onClick={() => navigate("/admin/logout")}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 fw-bold"
            >
              <MdLogout size={20} />
              <span className="d-none d-md-inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
