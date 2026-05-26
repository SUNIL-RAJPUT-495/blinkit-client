import React, { useState } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import { AdminHeader } from "../Component/admin/AdminHeader";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  MdDashboard,
  MdCategory,
  MdListAlt,
  MdCloudUpload,
  MdInventory,
  MdShoppingCart,
  MdLocationOn,
  MdLogout,
  MdPerson
} from "react-icons/md";

export const AdminLayout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleClose = () => setShowMobileSidebar(false);
  const handleShow = () => setShowMobileSidebar(true);

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/profile", name: "My Profile", icon: <MdPerson /> },
    { path: "/admin/category", name: "Category", icon: <MdCategory /> },
    { path: "/admin/subcategory", name: "Sub Category", icon: <MdListAlt /> },
    { path: "/admin/upload-product", name: "Upload Product", icon: <MdCloudUpload /> },
    { path: "/admin/products", name: "Products List", icon: <MdInventory /> },
    { path: "/admin/orders", name: "Orders", icon: <MdShoppingCart /> },
    { path: "/admin/address", name: "Saved Address", icon: <MdLocationOn /> },
  ];

  return (
    <div className="bg-light min-vh-100">
      <AdminHeader toggleSidebar={handleShow} />

      {/* MOBILE DRAWER SIDEBAR (Offcanvas) */}
      <Offcanvas show={showMobileSidebar} onHide={handleClose} className="d-lg-none" style={{ maxWidth: "280px" }}>
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold text-success d-flex align-items-center gap-2">
            <img src={logo} alt="Blinkit" style={{ height: "30px", objectFit: "contain" }} />
            <span style={{ fontSize: "15px", letterSpacing: "0.5px" }}>Admin Panel</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3 bg-white">
          <nav className="d-flex flex-column gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleClose}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
            
            <hr className="my-3 text-muted opacity-25" />
            
            <Link to="/admin/logout" onClick={handleClose} className="sidebar-link text-danger">
              <span className="sidebar-icon"><MdLogout /></span>
              <span>Logout</span>
            </Link>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid className="px-0 px-md-4 py-4">
        <Row className="g-4">
          {/* LEFT SIDE SIDEBAR (Desktop) */}
          <Col lg={3} xl={2} className="d-none d-lg-block">
            <div className="dashboard-card sticky-top" style={{ top: "100px", zIndex: 10 }}>
              <div className="mb-4 px-2 text-center border-bottom pb-3">
                <Link to="/" className="d-block mb-2">
                  <img src={logo} alt="Blinkit" style={{ height: "36px", objectFit: "contain", maxWidth: "100%" }} />
                </Link>
                <div className="text-uppercase text-success fw-bold small" style={{ fontSize: "10px", letterSpacing: "1px" }}>
                  Admin Panel
                </div>
              </div>
              
              <nav>
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => 
                      `sidebar-link ${isActive ? "active" : ""}`
                    }
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                
                <hr className="my-3 text-muted opacity-25" />
                
                <Link to="/admin/logout" className="sidebar-link text-danger">
                  <span className="sidebar-icon"><MdLogout /></span>
                  <span>Logout</span>
                </Link>
              </nav>
            </div>
          </Col>

          {/* RIGHT SIDE CONTENT */}
          <Col xs={12} lg={9} xl={10}>
            <div className="dashboard-card min-vh-75">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
