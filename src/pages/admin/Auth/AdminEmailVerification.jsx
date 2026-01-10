import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button,  Alert } from "react-bootstrap";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";


export const AdminEmailVerification = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (code.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      setSuccess("");
      return;
    }

    try {
      const res = await Axios({
        url: SummaryApi.emailVerification.url,
        method: SummaryApi.emailVerification.method,
        data: { email,code } 
      });
      console.log(res)

      setError("");
      setSuccess(res.data.message || "Email verified successfully!");
      navigate("/admin/profile", { replace: true });

    } catch (err) {
      console.error(err);
      setSuccess("");
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row>
        <Col>
          <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Card.Body className="text-center">
              <Card.Title className="mb-4">Email Verification</Card.Title>
              <Card.Text className="text-muted mb-3">
                Enter the 6-digit verification code sent to your email.
              </Card.Text>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="verificationCode">
                  <Form.Label className="text-start d-block">Verification Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                  />
                </Form.Group>

                <Button type="submit" className="w-100" variant="primary">
                  Verify
                </Button>
              </Form>

              <div className="text-center mt-3 text-muted" style={{ fontSize: "0.8rem" }}>
                Didn't receive the code? <Button variant="link">Resend</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
