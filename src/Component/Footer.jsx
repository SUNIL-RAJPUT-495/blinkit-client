import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineCopyright } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { AdminPage } from "../pages/AdminPage";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
const linkStyle = {
  fontSize: "14px",
  color: "rgba(121, 121, 121, 1)",
  textDecoration: "none",
};
const HandelClick = ()=>{
  navigate("/AdminPage")
}

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col md={4}>
              <div className="fw-bold">Usefull Links</div>
              <div className="d-flex gap-5">
                <div className="d-flex flex-column mt-3 me-3 gap-2"  style={{fontSize:"14px"}}>
                  <a href="#"  style={linkStyle}>
                    Blog
                  </a>
                  <a href="#"  style={linkStyle}>
                    Privacy
                  </a>
                  <a href="#" style={linkStyle}>
                    Terms
                  </a>
                  <a href="#" style={linkStyle}>
                    FAQs
                  </a>
                  <a href="#" style={linkStyle}>
                    Security
                  </a>
                  <a href="#" style={linkStyle}>
                    Contact
                  </a>
                  <a href="http://localhost:5173/AdminPage" style={linkStyle}> Admin</a>
                </div>
                <div className="d-flex flex-column mt-3  ms-3 gap-2"  style={{fontSize:"14px"}}>
                  <a href="#" style={linkStyle}>
                    Partner
                  </a>
                  <a href="#" style={linkStyle}>
                    Franchise
                  </a>
                  <a href="#" style={linkStyle}>
                    Seller
                  </a>
                  <a href="#" style={linkStyle}>
                    Warehouse
                  </a>
                  <a href="#" style={linkStyle}>
                    Deliver
                  </a>
                  <a href="#" style={linkStyle}>
                    Resources
                  </a>
                </div>
                <div className="d-flex flex-column mt-3  ms-3 gap-2"  style={{fontSize:"14px"}}>
                  <a href="#" style={linkStyle}>
                    Recipes
                  </a>
                  <a href="#" style={linkStyle}>
                    Bistro
                  </a>
                  <a href="#" style={linkStyle}>
                    District
                  </a>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="fw-bold ">
                Cotegories
                <Link to="#" className="text-success ms-2">
                  see all
                </Link>
              </div>
              <div className="d-flex gap-5">
                <div className="d-flex flex-column mt-3 me-3 gap-2 " style={{fontSize:"14px"}}>
                  <a href="#"style={linkStyle}>
                    Vegetables & Fruits
                  </a>
                  <a href="#" style={linkStyle}>
                    Cold Drinks & Juices
                  </a>
                  <a href="#" style={linkStyle}>
                    Bakery & Biscuits
                  </a>
                  <a href="#" style={linkStyle}>
                    Dry Fruits, Masala & Oil
                  </a>
                  <a href="#" style={linkStyle}>
                    Paan Corner
                  </a>
                  <a href="#" style={linkStyle}>
                    Pharma & Wellness
                  </a>
                  <a href="#" style={linkStyle}>
                    Personal Care
                  </a>
                  <a href="#" style={linkStyle}>
                    Magazines
                  </a>
                  <a href="#" style={linkStyle}>
                    Electronics & Electricals
                  </a>
                  <a href="#" style={linkStyle}>
                    Toys & Games
                  </a>
                  <a href="#" style={linkStyle}>
                    Rakhi Gifts
                  </a>
                </div>

                <div className="d-flex flex-column mt-3 me-3 gap-2"  style={{fontSize:"14px"}}>
                  <a href="#" style={linkStyle}>
                    Dairy & Breakfast
                  </a>
                  <a href="#" style={linkStyle}>
                    Instant & Frozen Food
                  </a>
                  <a href="#" style={linkStyle}>
                    Sweet Tooth
                  </a>
                  <a href="#" style={linkStyle}>
                    Sauces & Spreads
                  </a>
                  <a href="#" style={linkStyle}>
                    Organic & Premium
                  </a>
                  <a href="#" style={linkStyle}>
                    Cleaning Essentials
                  </a>
                  <a href="#" style={linkStyle}>
                    Pet Care
                  </a>
                  <a href="#" style={linkStyle}>
                    Kitchen & Dining
                  </a>
                  <a href="#" style={linkStyle}>
                    Stationery Needs
                  </a>
                  <a href="#" style={linkStyle}>
                    Print Store
                  </a>
                </div>
                <div className="d-flex flex-column mt-3 me-3 gap-2"  style={{fontSize:"14px"}}>
                  <a href="#" style={linkStyle}>
                    Munchies
                  </a>
                  <a href="#" style={linkStyle}>
                    Tea, Coffee & Health Drinks
                  </a>
                  <a href="#" style={linkStyle}>
                    Atta, Rice & Dal
                  </a>
                  <a href="#" style={linkStyle}>
                    Chicken, Meat & Fish
                  </a>
                  <a href="#" style={linkStyle}>
                    Baby Care
                  </a>
                  <a href="#" style={linkStyle}>
                    Home & Office
                  </a>
                  <a href="#" style={linkStyle}>
                    Beauty & Cosmetics
                  </a>
                  <a href="#" style={linkStyle}>
                    Fashion & Accessories
                  </a>
                  <a href="#" style={linkStyle}>
                    Books
                  </a>
                  <a href="#" style={linkStyle}>
                    E-Gift Cards
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div> <button onClick={HandelClick}> Admin</button></div>
          </Row>
          <Row>

          <div className="d-flex gap-5 mt-3 pt-5 mb-3 border-top align-items-center justify-content-center">
            <div style={{fontSize:"11px",color:"rgba(121, 121, 121, 1)"}}>
              <MdOutlineCopyright /> Blink Commerce Private Limited, 2016-2025
            </div>
            <div>
              <p style={{fontSize:"13px",color:"rgba(121, 121, 121, 1)"}}  className="d-flex  mt-3  fw-bold align-items-center">Download App</p>
            </div>
            <div className="d-flex gap-4">
              <span
                className="bg-dark text-white d-flex justify-content-center align-items-center rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <FaFacebook className="fs-4" />
              </span>
              <span
                className="bg-dark text-white d-flex justify-content-center align-items-center rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <RiTwitterXLine className="fs-4" />
              </span>
              <span
                className="bg-dark text-white d-flex justify-content-center align-items-center rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <FaInstagram className="fs-4" />
              </span>
              <span
                className="bg-dark text-white d-flex justify-content-center align-items-center rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <FaLinkedinIn className="fs-4" />
              </span>
            </div>
            
          </div>
          <div style={{fontSize:"13px",color:"rgba(121, 121, 121, 1)"}}> “Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.</div>
        </Row>
        </Container>
      </div>
    </>
  );
};
