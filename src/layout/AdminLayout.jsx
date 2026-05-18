import { Container, Row, Col } from "react-bootstrap";
import { AdminHeader } from "../Component/admin/AdminHeader";
import { Link, NavLink, Outlet } from "react-router-dom";
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
  const menuItems = [
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
      <AdminHeader />

      <Container fluid className="px-0 px-md-4 py-4">
        <Row className="g-4">
          {/* LEFT SIDE SIDEBAR */}
          <Col lg={3} xl={2} className="d-none d-lg-block">
            <div className="dashboard-card sticky-top" style={{ top: "100px", zIndex: 10 }}>
              <div className="mb-4 px-2">
                <h6 className="text-uppercase text-muted fw-bold small mb-0">Admin Panel</h6>
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
