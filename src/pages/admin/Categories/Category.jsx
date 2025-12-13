import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { AllCategory } from "./AllCategory";
import { fetchCategories } from "../../../utils/api";

export const Category = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [data, setData] = useState({ name: "", image: "" });

  // Fetch categories

  const getCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  },[]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCategoryImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", `blinkit/category/${data.name || "default"}`);

    try {
      setUploading(true);
      const res = await Axios({
        url: SummaryApi.uploadImage.url,
        method: SummaryApi.uploadImage.method,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrl = res.data?.data?.url;
      setData((prev) => ({ ...prev, image: uploadedUrl || "" }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Add / Edit Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.image) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (editCategoryId) {
        await Axios.put(
          `${SummaryApi.updateCategory.url}/${editCategoryId}`,
          data
        );
        alert("Category Updated!");
      } else {
        await Axios.post(SummaryApi.addCategory.url, data);
        alert("Category Added!");
      }

      // Reset form
      setShowCategoryModal(false);
      setCategoryImagePreview(null);
      setData({ name: "", image: "" });
      setEditCategoryId(null);

      getCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  // Open modal for edit
  const handleEdit = (cat) => {
    setData({ name: cat.name, image: cat.image });
    setCategoryImagePreview(cat.image);
    setEditCategoryId(cat._id);
    setShowCategoryModal(true);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    try {
      await Axios.delete(`${SummaryApi.deleteCategory.url}/${id}`);
      getCategories();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed!");
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
            <h4>Categories</h4>
            <Button
              variant="warning"
              onClick={() => setShowCategoryModal(true)}
            >
              Add Category
            </Button>
          </div>

          <AllCategory
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Modal
            show={showCategoryModal}
            onHide={() => {
              setShowCategoryModal(false);
              setData({ name: "", image: "" });
              setCategoryImagePreview(null);
              setEditCategoryId(null);
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {editCategoryId ? "Edit Category" : "Add Category"}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="w-100 p-2 mb-3 rounded border"
                />

                <div className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      height: "120px",
                      width: "120px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    {categoryImagePreview ? (
                      <img
                        src={categoryImagePreview}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#999" }}>No Image</span>
                    )}
                  </div>
                  <label
                    htmlFor="imageUpload"
                    className="ms-3 p-2 border rounded"
                    style={{ cursor: "pointer" }}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="d-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-100">
                  {editCategoryId ? "Update Category" : "Add Category"}
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};
