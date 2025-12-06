import React, {  useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const Products = () => {
  const [products, setProducts] = useState([]);

  
  return (
    <>
      <Container className="mt-4">
        <Row>
          {products.map((item) => (
            <Col md={3} className="mb-4" key={item._id}>
              <div
                style={{ height: "180px", width: "160px" }}
                className="border p-2 rounded"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={`http://localhost:8080/uploads/}`}
                    style={{ height: "100px", objectFit: "contain" }}
                    alt={item.name}
                  />
                </div>

                <p className="text-center fw-bold mt-1">{item.name}</p>

                <div className="d-flex justify-content-between">
                  <button
                    className="border-0 px-2 rounded text-white"
                    style={{ backgroundColor: "green" }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-danger border-0 px-2 rounded text-white"
                    
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
