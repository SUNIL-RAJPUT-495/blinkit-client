import { Container, Row, Col } from "react-bootstrap";
import { Header } from "../Component/Header";
import { Link, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
    <Header/>

      <Container>
        <Row>
          {/* LEFT SIDE MENU */}
          <Col md={2} className="border-end">
            <div>
              <p className="fw-bold">
                <Link to="/admin/AdminProfile">My Account</Link>
              </p>

              <ul className="list-unstyled">
                <li className="m-2">
                  <Link to="/admin/category">Category</Link>
                </li>
                <li className="m-2">
                  <Link to="/admin/subcategory">Sub Category</Link>
                </li>
                <li className="m-2">
                  <Link to="/admin/upload-product">Upload Product</Link>
                </li>
                <li className="m-2">
                  <Link to="/admin/products">Products</Link>
                </li>
                <li className="m-2">
                  <Link to="/admin/orders">Orders</Link>
                </li>
                <li className="m-2">
                  <Link to="/admin/address">Saved Address</Link>
                </li>
                <li className="m-2">
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* RIGHT SIDE CONTENT */}
          <Col md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
