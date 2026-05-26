import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";

export const AllCategory = ({ categories = [], onEdit, onDelete }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div>
      {safeCategories.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <span className="small">No categories found. Please add a new one.</span>
        </div>
      ) : (
        <div className="mt-2">
          <Row className="g-3">
            {safeCategories.map((cat) => (
              <Col key={cat._id} xs={6} sm={4} md={3} lg={2}>
                <Card className="h-100 border rounded-3 overflow-hidden shadow-sm hover-shadow transition" style={{ transition: "all 0.2s" }}>
                  <div className="bg-light p-2 d-flex align-items-center justify-content-center" style={{ height: "110px" }}>
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <span className="text-muted small">No Image</span>
                    )}
                  </div>
                  <Card.Body className="p-2 d-flex flex-column justify-content-between">
                    <Card.Title className="fw-bold mb-2 text-truncate text-center" style={{ fontSize: "13px" }} title={cat.name}>
                      {cat.name}
                    </Card.Title>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="w-100 p-1 d-flex align-items-center justify-content-center gap-1 text-xs"
                        onClick={() => onEdit(cat)}
                      >
                        <MdEdit size={14} /> Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-100 p-1 d-flex align-items-center justify-content-center gap-1 text-xs"
                        onClick={() => onDelete(cat._id)}
                      >
                        <MdDelete size={14} /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};
