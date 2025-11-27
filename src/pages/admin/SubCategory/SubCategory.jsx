import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import axios from "../../../axios"; // your axios instance
import { MdEdit, MdDelete } from "react-icons/md";

export const SubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [subCategoryImage, setSubCategoryImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // -----------------------------
  // Load all Sub Categories
  // -----------------------------
  const loadSubCategories = async () => {
    try {
      const res = await axios.get("/api/subcategory");

      if (res.data.success) {
        setSubCategories(res.data.data);
      }
    } catch (err) {
      console.log("Load Error:", err);
    }
  };

  useEffect(() => {
    loadSubCategories();
  }, []);

  // -----------------------------
  // Image change + preview
  // -----------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) setSubCategoryImage(URL.createObjectURL(file));
  };

  // -----------------------------
  // Submit form
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) return alert("Name & Category required");

    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    if (selectedFile) fd.append("image", selectedFile);

    try {
      const res = await axios.post("/api/subcategory/add", fd);

      if (res.data.success) {
        alert("Sub Category added!");
        setShowModal(false);
        setName("");
        setCategory("");
        setSubCategoryImage(null);
        fileInputRef.current.value = null;
        loadSubCategories();
      }
    } catch (err) {
      console.log("Submit Error:", err);
      alert("Failed to add Sub Category");
    }
  };

  // -----------------------------
  // Delete Sub Category
  // -----------------------------
  const deleteSubCategory = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`/api/subcategory/${id}`);
      loadSubCategories();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <>
      <div className="mt-2">
        <Container>
          <Row>
            <Col>
              <div className="d-flex justify-content-between border-bottom">
                <p className="fw-bold">Sub Category</p>

                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    backgroundColor: "yellow",
                    border: "none",
                    padding: "5px",
                  }}
                >
                  Add Sub Category
                </button>
              </div>

              {/* ------------------ MODAL ------------------ */}
              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Add Sub Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Sub Category Name"
                      className="w-100 border-0 bg-light p-2 rounded mb-2"
                    />

                    <label>Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Enter Main Category"
                      className="w-100 border-0 bg-light p-2 rounded mb-2"
                    />

                    {/* Image Preview box */}
                    <div className="d-flex align-items-center mt-3">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          height: "150px",
                          width: "150px",
                          backgroundColor: "gray",
                        }}
                      >
                        {subCategoryImage ? (
                          <img
                            src={subCategoryImage}
                            alt="preview"
                            style={{ objectFit: "cover", height: "150px", width: "150px" }}
                          />
                        ) : (
                          <div
                            className="w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{
                              border: "1px dashed #999",
                              background: "#f5f5f5",
                              textAlign: "center",
                            }}
                          >
                            <span style={{ fontSize: "18px", color: "#666" }}>
                              Image
                            </span>
                          </div>
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
                      Add Sub Category
                    </button>
                  </form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>

        {/* ------------------ TABLE ------------------ */}
        <Container>
          <Row>
            <Col>
              <table className="table table-bordered mt-3">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {subCategories.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>

                      <td>
                        <img
                          style={{ height: "50px" }}
                          src={`http://localhost:5000/api/subcategory/image/${item._id}`}
                          alt=""
                        />
                      </td>

                      <td>{item.category}</td>

                      <td className="d-flex gap-2 justify-content-center">
                        <button
                          className="rounded-circle border-0"
                          style={{ backgroundColor: "rgba(187, 243, 200, 1)" }}
                        >
                          <MdEdit size={20} />
                        </button>

                        <button
                          onClick={() => deleteSubCategory(item._id)}
                          className="rounded-circle border-0"
                          style={{
                            backgroundColor: "rgba(238, 202, 202, 1)",
                            color: "red",
                          }}
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
