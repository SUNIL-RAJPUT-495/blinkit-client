import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { fetchProduct } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const products = await fetchProduct();
        setAllProducts(products || []);
        const foundProduct = (products || []).find(p => p._id === productId);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const getQuantity = (id) => {
    const cartItem = cartItems.find(i => i._id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return (
      <Container fluid style={{ padding: "20px", maxWidth: "1200px" }}>
        <div className="skeleton-box" style={{ height: "20px", width: "80px", marginBottom: "20px", borderRadius: "4px" }}></div>
        <Row>
          <Col md={6}>
             <div className="skeleton-box" style={{ height: "400px", width: "100%", borderRadius: "12px" }}></div>
          </Col>
          <Col md={6} style={{ padding: "20px 40px" }}>
             <div className="skeleton-box" style={{ height: "40px", width: "70%", marginBottom: "15px", borderRadius: "6px" }}></div>
             <div className="skeleton-box" style={{ height: "20px", width: "30%", marginBottom: "20px", borderRadius: "4px" }}></div>
             <div className="skeleton-box" style={{ height: "30px", width: "20%", marginBottom: "30px", borderRadius: "4px" }}></div>
             <div className="skeleton-box" style={{ height: "45px", width: "150px", marginBottom: "40px", borderRadius: "8px" }}></div>
             <div className="skeleton-box" style={{ height: "200px", width: "100%", borderRadius: "8px" }}></div>
          </Col>
        </Row>
      </Container>
    );
  }

  const currentSubCatId = product?.subCategory?.[0]?._id || product?.subCategory?.[0];
  const relatedProducts = allProducts.filter(p => {
    const subCatId = p.subCategory?.[0]?._id || p.subCategory?.[0];
    return subCatId === currentSubCatId && p._id !== product._id;
  });

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h3>Product not found</h3>
        <Button variant="success" className="mt-3" onClick={() => navigate("/")}>Go to Home</Button>
      </Container>
    );
  }

  return (
    <Container fluid style={{ padding: "20px", paddingBottom: totalItems > 0 ? "100px" : "20px", maxWidth: "1200px" }}>
      <div 
        onClick={() => navigate(-1)} 
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px", fontWeight: "600", color: "#666" }}
      >
        <IoMdArrowBack size={20} /> Back
      </div>

      <Row>
        {/* Product Image Section */}
        <Col md={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px", border: "1px solid #eee" }}>
          <img 
            src={product.image?.[0] || "/placeholder.jpg"} 
            alt={product.name} 
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} 
          />
        </Col>

        {/* Product Info Section */}
        <Col md={6} style={{ padding: "20px 40px" }}>
          <h2 style={{ fontWeight: "700", marginBottom: "10px" }}>{product.name}</h2>
          <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>{product.unit}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
            <h3 style={{ fontWeight: "bold", margin: 0 }}>₹{product.price}</h3>
            {product.discount > 0 && (
              <span style={{ backgroundColor: "#e8f4e9", color: "green", padding: "4px 8px", borderRadius: "4px", fontSize: "14px", fontWeight: "600" }}>
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div style={{ marginBottom: "40px", width: "150px" }}>
            {getQuantity(product._id) > 0 ? (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                backgroundColor: "green", height: "45px", borderRadius: "8px", padding: "0 15px"
              }}>
                <button onClick={() => handleRemoveItem(product._id)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "24px" }}>-</button>
                <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>{getQuantity(product._id)}</span>
                <button onClick={() => handleAddItem(product)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "24px" }}>+</button>
              </div>
            ) : (
              <Button 
                onClick={() => handleAddItem(product)} 
                style={{
                  height: "45px", width: "100%", backgroundColor: "#f0fff0",
                  border: "1px solid green", color: "green", borderRadius: "8px", fontWeight: "bold", fontSize: "16px"
                }}
              >
                Add to Cart
              </Button>
            )}
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>Product Details</h5>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              {product.description || "No description available for this product."}
            </p>
            
            {product.more_details && Object.keys(product.more_details).length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h6 style={{ fontWeight: "bold" }}>Additional Information:</h6>
                <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#555" }}>
                  {Object.entries(product.more_details).map(([key, value]) => (
                    <li key={key} style={{ marginBottom: "5px" }}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "50px", borderTop: "1px solid #eee", paddingTop: "30px" }}>
          <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>Similar Products</h4>
          <div style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "20px" }} className="no-scrollbar">
            {relatedProducts.map(item => (
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
      )}

      {/* Cart Bottom Bar for Mobile */}
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
              style={{ cursor: "pointer", fontSize: "19px", gap: "2px" }}
              className="d-flex align-items-center justify-content-center "
            >
              View Cart <MdOutlineNavigateNext size={28} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
