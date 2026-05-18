import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchCategories, fetchSubCategory, fetchProduct } from "../../utils/api";
import baner from "../../assets/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice"; // Ensure path is correct
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const cartItems = useSelector((state) => state.cart.items || []);

  // Derived State (Calculations)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Local State
  const [Categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [Subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Calls
  const getProduct = async () => {
    try {
      const data = await fetchProduct();
      setProduct(data || []);
    } catch (err) { console.error("Product Fetch Error:", err); }
  };

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data || []);
    } catch (err) { console.error("Category Fetch Error:", err); }
  };

  const getSubCategory = async () => {
    try {
      const res = await fetchSubCategory();
      setSubcategories(res || []);
    } catch (err) { console.error("SubCategory Fetch Error:", err); }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([getCategories(), getProduct(), getSubCategory()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handlers
  const handleAddItem = (item) => {
    dispatch(addItem(item)); // Pure item object ko bhej rahe hain
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id)); // Sirf ID bhej rahe hain
  };

  const getQuantity = (id) => {
    const cartItem = cartItems.find(i => i._id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      {/* Banner Section */}
      <Container fluid>
        <Row>
          <Col>
            <img src={baner} alt="Banner" style={{ width: "100%", height: "auto" }} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <div className="category-grid">
              {Categories.map((p) => (
                <div 
                  onClick={() => navigate(`/category/${p._id || p.id}`)} 
                  key={p._id || p.id} 
                  className="category-item"
                >
                  <img src={p.image} alt={p.name} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Products Section */}
      <Container fluid style={{ paddingBottom: totalItems > 0 ? "100px" : "20px" }}>
        {loading ? (
          <div>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ marginBottom: "30px" }}>
                <div className="skeleton-box" style={{ height: "32px", width: "150px", marginBottom: "15px", borderRadius: "6px" }}></div>
                <div style={{ display: "flex", gap: "10px", overflow: "hidden" }}>
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="skeleton-box" style={{ width: "190px", height: "280px", borderRadius: "10px", flexShrink: 0 }}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          Subcategories.filter(subCat =>
            product.some(item => item.subCategory?.[0]?._id === subCat._id)
          ).map((subCat) => (
          <div key={subCat._id} style={{ marginBottom: "30px" }}>
            <h2 style={{ fontWeight: "700", marginBottom: "15px" }}>{subCat.name}</h2>

            <div style={{
              display: "flex", gap: "10px", padding: "0 10px", overflowX: "auto",
              scrollbarWidth: "none", msOverflowStyle: "none"
            }}
              className="no-scrollbar"
            >
              {product.filter(item => item.subCategory?.[0]?._id === subCat._id)
                .map((item) => (
                  <div key={item._id} 
                    onClick={() => navigate(`/product/${item._id}`)}
                    style={{
                    flex: "0 0 auto", width: "190px", height: "280px",
                    borderRadius: "10px", border: "1px solid #ddd",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    display: "flex", flexDirection: "column", backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
                  >
                    <div style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={item.image?.[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>

                    <div style={{ padding: "8px", flexGrow: 1 }}>
                      <p style={{ fontWeight: "700", margin: "0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{item.unit}</p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px" }}>
                      <span style={{ fontWeight: "bold" }}>₹{item.price}</span>

                      {getQuantity(item._id) > 0 ? (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          backgroundColor: "green", width: "70px", height: "32px", borderRadius: "6px", padding: "0 8px"
                        }}>
                          <button onClick={(e) => { e.stopPropagation(); handleRemoveItem(item._id); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>-</button>
                          <span style={{ color: "white", fontWeight: "bold" }}>{getQuantity(item._id)}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleAddItem(item); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>+</button>
                        </div>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); handleAddItem(item); }} style={{
                          height: "32px", width: "70px", backgroundColor: "#f0fff0",
                          border: "1px solid green", color: "green", borderRadius: "6px", fontWeight: "600"
                        }}
                        >Add</button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
        )}
        <Row>
          {totalItems > 0 && (
            <div
              className="rounded-3 shadow-lg d-flex d-lg-none"
              style={{
                height: "55px",
                backgroundColor: "#0c831f",
                color: "white",
                alignItems: "center",
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "92%",
                zIndex: 1000,
                padding: "0 20px"
              }}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center gap-3">
                  <div style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    WebkitBackdropFilter: "blur(10px)",
                    padding: "8px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    color: "#ffffff"
                  }}>
                    <HiOutlineShoppingCart size={22} />
                  </div>

                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "500" }}>{totalItems} Items</div>
                    <div style={{ fontSize: "18px", fontWeight: "700" }}>₹{totalPrice}</div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/cart")}
                  style={{
                    cursor: "pointer",
                    fontSize: "19px",
                    gap: "2px"        
                  }}
                  className="d-flex align-items-center justify-content-center "
                >
                  View Cart <MdOutlineNavigateNext size={28} />
                </div>
              </div>
            </div>
          )}
        </Row>

      </Container>
    </>
  );
};