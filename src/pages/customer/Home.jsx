import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { fetchCategories, fetchSubCategory } from "../../utils/api";
import { fetchProduct } from "../../utils/api"
import baner from "../../assets/banner.jpg"


export const Home = () => {
  const [Categories, setCategories] = useState([])
  const [product, setProduct] = useState([])
  const [Subcategories, setSubcategories] = useState([])


  const getProduct = async () => {
    const data = await fetchProduct();
    setProduct(data)
  }

  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const getSubCategory = async () => {
    const res = await fetchSubCategory();
    setSubcategories(res)
  }
  useEffect(() => {
    getCategories();
    getProduct();
    getSubCategory();
  }, []);

  console.log("product is :", product)



  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={baner} alt="Banner" className="w-100" />
          </Col>
        </Row>
        {/* <Row className="pt-4">
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
        </Row> */}
        <Row>
          <Col>
            {Categories.map((p) => (
              <a href="#" key={p.id} className="p-2">
                <img src={p.image} alt="all" style={{ height: "150px" }} />
              </a>
            ))}

          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            {Subcategories.filter(subCat =>
              product.some(
                item => item.subCategory?.[0]?._id === subCat._id
              )
            )
              .map((subCat) => (

                <div >
                  <h2>{subCat.name}</h2>

                  <div className="d-flex " style={{ gap: "10px" }}>
                    {product.filter(item => item.subCategory?.[0]?._id === subCat._id).map((item) => (
                      <div key={item._id} className="d-flex ">

                        <div
                          className="border rounded shadow mt-4 mb-5"
                          style={{
                            height: "280px",
                            width: "190px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className="p-1 d-flex flex-column"
                            style={{ height: "100%" }}
                          >
                            {/* IMAGE */}
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                height: "150px",
                                backgroundColor: "black",
                              }}
                            >
                              <img
                                className="h-100 w-100"
                                style={{ objectFit: "cover" }}
                                src={item.image?.[0]}
                                alt={item.name}
                              />
                            </div>

                            {/* TEXT */}
                            <div className="p-2">
                              <p className="fw-bold mb-1 text-truncate">{item.name}</p>
                              <p className="mb-1">{item.unit} pcs</p>
                            </div>

                            {/* PRICE + BUTTON (BOTTOM FIXED) */}
                            <div className="d-flex justify-content-between p-2 mt-auto">
                              <span>₹{item.price}</span>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>))
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};
