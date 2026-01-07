// src/pages/admin/Auth/AdminLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert, Image } from "react-bootstrap";
import blinkitpng from "../../../assets/logo.png";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");

    // TODO: Replace with your API call
    console.log("Email:", email, "Password:", password);

    // Example: on successful login
    // localStorage.setItem("adminToken", "your_jwt_token");
    // navigate("/admin");
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row>
        <Col>
          <Card className="p-4 shadow-sm" style={{ minWidth: "500px", maxWidth: "500px", margin: "0 auto" }}>
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

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>

                <div className="text-start mt-2" style={{ fontSize: "0.9rem" }}>
                  For new registration <Link to="/admin/register">click here</Link>
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
