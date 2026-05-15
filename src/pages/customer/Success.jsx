import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Add confetti effect here if desired
  }, []);

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center text-center">
      <div className="dashboard-card p-5 shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp">
        <div className="mb-4">
          <MdCheckCircle size={100} className="text-success animate__animated animate__bounceIn animate__delay-1s" />
        </div>
        <h1 className="fw-bold mb-3">Order Confirmed!</h1>
        <p className="text-muted fs-5 mb-4">
          Thank you for shopping with us. <br />
          Your order has been placed successfully and will be delivered soon.
        </p>
        <div className="d-flex flex-column gap-3">
          <Button 
            variant="success" 
            size="lg" 
            className="fw-bold py-3 px-5 rounded-3 shadow-sm"
            onClick={() => navigate("/account/orders")}
          >
            Track Your Order
          </Button>
          <Button 
            variant="outline-secondary" 
            size="lg" 
            className="fw-bold py-3 px-5 rounded-3 border-0"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Success;
