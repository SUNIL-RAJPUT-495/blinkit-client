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
      {/* Banner */}
      <Container fluid>
        <Row>
          <Col>
            <img src={baner} alt="Banner" style={{ width: "100%", height: "auto" }} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col className="d-flex flex-wrap justify-content-start gap-2">
            {Categories.map((p) => (
              <a href="#" key={p.id} style={{ display: "block", padding: "5px" }}>
                <img src={p.image} alt={p.name || "category"} style={{ height: "150px", width: "auto" }} />
              </a>
            ))}
          </Col>
        </Row>
      </Container>

      {/* Subcategories & Products */}
      <Container fluid>
        {Subcategories.filter(subCat =>
          product.some(item => item.subCategory?.[0]?._id === subCat._id)
        ).map((subCat) => (
          <div key={subCat._id} style={{ marginBottom: "30px" }}>
            <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>{subCat.name}</h2>

            {/* Horizontal scrollable container */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "0 10px",
                overflowX: "auto",
                msOverflowStyle: "none",      // IE & Edge
                scrollbarWidth: "none",        // Firefox
              }}
              ref={(el) => {
                if (el) {
                  // Chrome, Safari, Opera scrollbar hide
                  el.style.overflowX = "auto";
                  const style = document.createElement("style");
                  style.innerHTML = `
                    ::-webkit-scrollbar { display: none; }
                  `;
                  el.appendChild(style);
                }
              }}
            >
              {product.filter(item => item.subCategory?.[0]?._id === subCat._id)
                .map((item) => (
                  <div
                    key={item._id}
                    style={{
                      flex: "0 0 auto",
                      width: "190px",
                      height: "280px",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        height: "150px",
                        backgroundColor: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={item.image?.[0]}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ padding: "8px", flexGrow: 1 }}>
                      <p style={{ fontWeight: "700", margin: "0 0 5px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0 }}>{item.unit} pcs</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px" }}>
                      <span>₹{item.price}</span>

                      {getQuantity(item._id) > 0 ? (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "green",
                          width: "60px",
                          height: "30px",
                          borderRadius: "5px",
                          padding: "0 5px",
                        }}>
                          <button
                            onClick={() => dispatch(removeItem(item._id))}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "16px",
                            }}
                          >-</button>

                          <span style={{ color: "white", fontSize: "16px" }}>{getQuantity(item._id)}</span>

                          <button
                            onClick={() => dispatch(addItem(item))}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "16px",
                            }}
                          >+</button>
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
                ))}
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};
