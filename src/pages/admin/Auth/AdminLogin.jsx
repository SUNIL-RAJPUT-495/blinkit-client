import React, { useState } from "react";
import Axios from "../../../utils/Axios"
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert, Image } from "react-bootstrap";
import blinkitpng from "../../../assets/logo.png";
import SummaryApi from "../../../common/SummaryApi";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  setError("");

  try {
    const res = await Axios({
      url: SummaryApi.AdminLogin.url,
      method: SummaryApi.AdminLogin.method,
      data: {
        email,
        password,
      },
    });


    if (res.data?.success) {
      const { token, user } = res.data.data;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));
      navigate("/admin"); 
    } else {
      setError(res.data?.message || "Login failed");
    }

  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};


  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="px-0">
          <Card className="p-4 shadow-sm w-100" style={{ maxWidth: "450px", margin: "0 auto" }}>
            <Card.Body>
              
              {/* Small rounded logo */}
              <div className="text-center mb-3">
                <Image
                  src={blinkitpng}
                  alt="Blinkit Logo"
                  rounded
                  
                  height={50}
                />
              </div>

              <Card.Title className="text-center mb-4">Blinkit Admin Login</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="text-start d-block">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@blinkit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="text-start d-block">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 fw-bold py-2 shadow-sm" style={{ borderRadius: "10px" }}>
                  Login to Dashboard
                </Button>

                <div className="text-center mt-3 d-flex flex-column gap-2">
                  <div style={{ fontSize: "0.9rem" }}>
                    For new registration <Link to="/admin/register" className="text-success fw-bold text-decoration-none">click here</Link>
                  </div>
                  <hr className="my-1 opacity-25" />
                  <Link to="/login" className="text-muted text-decoration-none small">
                    Not an admin? <span className="text-success fw-bold">Customer Login</span>
                  </Link>
                </div>
              </Form>

              <div className="text-center mt-3 text-muted" style={{ fontSize: "0.8rem" }}>
                &copy; 2026 Blinkit Admin Panel
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
