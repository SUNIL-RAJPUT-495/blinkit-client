import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchCategories, fetchSubCategory, fetchProduct } from "../../utils/api";
import baner from "../../assets/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";


export const Home = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items || []);

  const [Categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [Subcategories, setSubcategories] = useState([]);

  const getProduct = async () => {
    const data = await fetchProduct();
    setProduct(data);
  };

  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const getSubCategory = async () => {
    const res = await fetchSubCategory();
    setSubcategories(res);
  };

  useEffect(() => {
    getCategories();
    getProduct();
    getSubCategory();
  }, []);

  // Helper to get quantity from cart
  const getQuantity = (id) => {
    const cartItem = cartItems.find(i => i._id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={baner} alt="Banner" className="w-100" />
          </Col>
        </Row>
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
              product.some(item => item.subCategory?.[0]?._id === subCat._id)
            ).map((subCat) => (
              <div key={subCat._id}>
                <h2 className="fw-bold">{subCat.name}</h2>

                <div className="d-flex" style={{ gap: "10px" }}>
                  {product.filter(item => item.subCategory?.[0]?._id === subCat._id).map((item) => (
                    <div key={item._id} className="d-flex">

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

                          <div className="p-2">
                            <p className="fw-bold mb-1 text-truncate">{item.name}</p>
                            <p className="mb-1">{item.unit} pcs</p>
                          </div>

                          <div className="d-flex justify-content-between p-2 mt-auto">
                            <span>₹{item.price}</span>

                            {getQuantity(item._id) > 0 ? (
                              <div
                                className="d-flex justify-content-between align-items-center rounded"
                                style={{
                                  backgroundColor: "green",
                                  width: "60px",
                                  height: "30px",
                                  padding: "0 5px",
                                }}
                              >
                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                  }}
                                  onClick={() => dispatch(removeItem(item._id))}
                                >
                                  -
                                </button>

                                <span style={{ color: "white", fontSize: "16px" }}>
                                  {getQuantity(item._id)}
                                </span>

                                <button
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                  }}
                                  onClick={() => dispatch(addItem(item))}
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => dispatch(addItem(item))}
                                style={{
                                  height: "30px",
                                  width: "60px",
                                  backgroundColor: "rgba(231, 253, 231, 1)",
                                  border: "1px solid rgba(1, 91, 24, 1)",
                                  color: "rgba(1, 91, 3, 1)",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                Add
                              </button>
                            )}

                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
