import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../utils/api";



export const Home = () => {
  const [Categories, setCategories] = useState([])
   const newCategories = Array.isArray(Categories) ? Categories : [];
  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src="/Home/Group-33704.webp" alt="Banner" className="w-100" />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="auto">
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/pharmacy-WEB.avif"
                  alt="Pharmacy"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/babycare-WEB.avif"
                  alt="Baby Care"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/Pet-Care_WEB.avif"
                  alt="Pet Care"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            {newCategories.map((p) => (
              <a href="#" key={p.id} className="p-2">
                <img src={p.image} alt="all" style={{ height: "150px" }} />
              </a>
            ))}

          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {/* <Col>
            <div className="row">
              {products.map((item, index) => (
                <div key={index}>
                  <div
                    className="border rounded shadow mt-4 mb-5 d-flex justify-content-center "
                    style={{ height: "280px", width: "190px" }}
                  >
                    <div className="p-1">
                      <div
                        className="pt-2 d-flex justify-content-center align-items-center mb-0"
                        style={{
                          height: "150px",
                          width: "170px",
                          backgroundColor: "black",
                        }}
                      >
                        <img
                          className="object-fit-cover h-100 w-100"
                          src={item.image} // ⬅ Admin se aayi image
                          alt={item.name}
                        />
                      </div>

                      <div className="p-2 m-0">
                        <p className="fw-bold mb-1">{item.name}</p>
                        <p className="mb-1">{item.quantity} pcs</p>
                      </div>

                      <div className="d-flex justify-content-between p-2 m-0">
                        <span>{item.price}</span>
                        <span>
                          <button
                            style={{
                              height: "30px",
                              width: "60px",
                              backgroundColor: "rgba(231, 253, 231, 1)",
                              border: "1px solid rgba(1, 91, 24, 1)",
                              color: "rgba(1, 91, 3, 1)",
                              borderRadius: "10px",
                            }}
                          >
                            add
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};
