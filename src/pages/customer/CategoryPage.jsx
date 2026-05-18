import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { fetchSubCategory, fetchProduct } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineNavigateNext } from "react-icons/md";

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [subCatData, prodData] = await Promise.all([
          fetchSubCategory(),
          fetchProduct()
        ]);
        
        // Filter subcategories that belong to this category
        const filteredSubCats = (subCatData || []).filter(
          (sub) => {
             const catId = sub.categoryId?._id || sub.categoryId;
             return catId === categoryId;
          }
        );
        setSubcategories(filteredSubCats);
        setProducts(prodData || []);

        if (filteredSubCats.length > 0) {
          setActiveSubCategory(filteredSubCats[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    loadData();
  }, [categoryId]);

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

  const filteredProducts = products.filter(
    (item) => {
      const subCatId = item.subCategory?.[0]?._id || item.subCategory?.[0];
      return subCatId === activeSubCategory;
    }
  );

  return (
    <Container fluid style={{ padding: "10px", paddingBottom: totalItems > 0 ? "100px" : "20px", minHeight: "80vh" }}>
      <Row className="g-1">
        {/* Left Sidebar for Subcategories */}
        <Col xs={3} md={3} style={{ borderRight: "1px solid #eee" }} className="subcategory-sidebar px-1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {subcategories.map((subCat) => (
              <div
                key={subCat._id}
                onClick={() => setActiveSubCategory(subCat._id)}
                className="subcategory-item"
                style={{
                  backgroundColor: activeSubCategory === subCat._id ? "#e8f4e9" : "transparent",
                  borderLeft: activeSubCategory === subCat._id ? "4px solid green" : "4px solid transparent",
                }}
              >
                <img src={subCat.image} alt={subCat.name} />
                <span style={{ fontWeight: activeSubCategory === subCat._id ? "bold" : "normal", color: activeSubCategory === subCat._id ? "green" : "#333" }}>
                  {subCat.name}
                </span>
              </div>
            ))}
            {subcategories.length === 0 && <p className="text-muted text-center" style={{ fontSize: "12px" }}>No subcategories found.</p>}
          </div>
        </Col>

        {/* Right Side for Products */}
        <Col xs={9} md={9} className="px-2">
          <h5 style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "16px" }}>
            {subcategories.find(s => s._id === activeSubCategory)?.name || "Products"}
          </h5>
          <div className="product-grid">
            {filteredProducts.map((item) => (
              <div key={item._id} 
                onClick={() => navigate(`/product/${item._id}`)}
                className="product-card"
              >
                <div className="product-image-container">
                  <img src={item.image?.[0]} alt={item.name} />
                </div>

                <div className="product-info">
                  <div>
                    <p className="product-name">
                      {item.name}
                    </p>
                    <p className="product-unit">{item.unit}</p>
                  </div>

                  <div className="product-action-row">
                    <span className="product-price">₹{item.price}</span>

                    {getQuantity(item._id) > 0 ? (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        backgroundColor: "green", width: "65px", height: "28px", borderRadius: "6px", padding: "0 6px"
                      }}>
                        <button onClick={(e) => { e.stopPropagation(); handleRemoveItem(item._id); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "14px" }}>-</button>
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}>{getQuantity(item._id)}</span>
                        <button onClick={(e) => { e.stopPropagation(); handleAddItem(item); }} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "14px" }}>+</button>
                      </div>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); handleAddItem(item); }} style={{
                        height: "28px", width: "65px", backgroundColor: "#f0fff0",
                        border: "1px solid green", color: "green", borderRadius: "6px", fontWeight: "600", fontSize: "13px"
                      }}>Add</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && <p className="text-muted w-100 text-center mt-5">No products found in this subcategory.</p>}
          </div>
        </Col>
      </Row>

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
