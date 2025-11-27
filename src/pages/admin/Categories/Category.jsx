import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";

export const Category = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const [categories, setCategories] = useState([]);

  const fileInputRef = useRef(null);

  const loadCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/category");
      setCategories(res.data.data);
    } catch (err) {
      console.log("Error loading categories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      return alert("Please Enter Name & Image");
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      await axios.post("http://localhost:8080/category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowCategoryModal(false);
      setCategoryName("");
      setCategoryImage(null);
      setCategoryImagePreview(null);

      loadCategories();
    } catch (err) {
      console.log("Category Add Failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/category/${id}`);
      loadCategories();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <>
      <div className="mt-2">
        <Container>
          <Row>
            <Col>
              <div className="d-flex justify-content-between border-bottom">
                <p className="fw-bold">Category</p>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  style={{
                    backgroundColor: "yellow",
                    border: "none",
                    padding: "5px",
                  }}
                >
                  Add Category
                </button>
              </div>

              {/* Add Category Modal */}
              <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form onSubmit={handleAddCategory}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter Category name"
                      className="w-100 border-0 bg-light p-2 rounded"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <div className="d-flex align-items-center mt-3">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "150px",
                          width: "150px",
                          backgroundColor: "gray",
                        }}
                      >
                        {categoryImagePreview ? (
                          <img
                            src={categoryImagePreview}
                            alt=""
                            style={{ objectFit: "cover", height: "150px", width: "150px" }}
                          />
                        ) : (
                          <span style={{ fontSize: "18px", color: "#666" }}>Image</span>
                        )}
                      </div>

                      <label
                        htmlFor="imageUpload"
                        className="ms-4 p-2"
                        style={{
                          height: "40px",
                          border: "2px solid black",
                          cursor: "pointer",
                        }}
                      >
                        Upload Image
                      </label>
                    </div>

                    <input
                      id="imageUpload"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="d-none"
                    />

                    <button type="submit" className="w-100 border-0 fw-bold p-2 mt-3">
                      Add Category
                    </button>
                  </form>
                </Modal.Body>
              </Modal>

              {/* CATEGORY LIST */}
              <Container className="mt-4">
                <Row>
                  {categories.map((cat) => (
                    <Col md={3} key={cat._id} className="mb-4">
                      <div className="border p-2 rounded" style={{ width: "140px" }}>
                        <div className="d-flex justify-content-center">
                          <img
                            src={`http://localhost:8080/uploads/${cat.image}`}
                            style={{ height: "100px", width: "100px", objectFit: "contain" }}
                            alt=""
                          />
                        </div>

                        <p className="text-center fw-bold mt-1">{cat.name}</p>

                        <div className="d-flex justify-content-between">
                          <button className="border-0 px-2 bg-success text-white rounded">
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="border-0 px-2 bg-danger text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
