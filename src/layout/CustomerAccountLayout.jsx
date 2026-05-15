import { Container, Row, Col } from "react-bootstrap";
import { Header } from "../Component/Header";
import { Link, NavLink, Outlet } from "react-router-dom";
import { 
  MdAccountCircle, 
  MdShoppingBag, 
  MdLocationOn, 
  MdLogout,
  MdHelpOutline
} from "react-icons/md";

export const CustomerAccountLayout = () => {
  const menuItems = [
    { path: "/account/profile", name: "My Profile", icon: <MdAccountCircle /> },
    { path: "/account/orders", name: "My Orders", icon: <MdShoppingBag /> },
    { path: "/account/address", name: "Saved Addresses", icon: <MdLocationOn /> },
  ];

  return (
    <div className="bg-light min-vh-100">
      <Header />

      <Container className="py-5">
        <Row className="g-4">
          {/* SIDEBAR */}
          <Col lg={4} xl={3}>
            <div className="dashboard-card overflow-hidden p-0">
              <div className="bg-success p-4 text-white">
                <h5 className="fw-bold mb-1">My Account</h5>
                <p className="small mb-0 opacity-75">Manage your orders & settings</p>
              </div>
              
              <div className="p-3">
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
            </div>
            
            <div className="dashboard-card mt-4 p-3 border-0 bg-white shadow-sm d-flex align-items-center gap-3">
               <div className="bg-light p-2 rounded-circle">
                 <MdHelpOutline size={24} className="text-success" />
               </div>
               <div>
                 <h6 className="fw-bold mb-0">Need Help?</h6>
                 <p className="small text-muted mb-0">Browse our FAQs</p>
               </div>
            </div>
          </Col>

          {/* MAIN CONTENT */}
          <Col lg={8} xl={9}>
            <div className="dashboard-card min-vh-50">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
