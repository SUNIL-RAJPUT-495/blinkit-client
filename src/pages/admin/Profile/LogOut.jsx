import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Card className="p-4 shadow-sm text-center" style={{ width: "400px" }}>
        <Card.Title className="mb-3">Logout</Card.Title>

        <Card.Text className="text-muted mb-4">
          Are you sure you want to logout from the admin panel?
        </Card.Text>

        <div className="d-flex gap-3 justify-content-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </Container>
  );
};
