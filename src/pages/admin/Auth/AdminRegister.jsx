import React, { useState } from 'react';
import SummaryApi from '../../../common/SummaryApi';
import Axios from '../../../utils/Axios'
import { toast } from "react-hot-toast";
import { Container, Row, Col, Card, Form, Button, Alert, Image } from 'react-bootstrap';
import blinkitpng from "../../../assets/logo.png"
import { useNavigate } from 'react-router-dom';

export const AdminRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", { name: data.name, email: data.email, password: data.password });

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        method: SummaryApi.Register.method,
        url: SummaryApi.Register.url,
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      });
      console.log(response)
      alert(response.data.message)

      setData({ name: "", email: "", password: "", confirmPassword: "" });
      setError("");
      navigate("/admin/emailVerification",{state: { email: data.email }} );

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row>
        <Col>
          <Card className="p-4 shadow-sm" style={{ minWidth: "500px", maxWidth: "500px", margin: "0 auto" }}>
            <Card.Body>
                <div className="text-center mb-3">
                <Image
                  src={blinkitpng}
                  alt="Blinkit Logo"
                  rounded
                  
                  height={50}
                />
              </div>
              <Card.Title className="text-center mb-4">Blinkit Admin Registration</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="text-start d-block">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="text-start d-block">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="text-start d-block">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label className="text-start d-block">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Register
                </Button>
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
