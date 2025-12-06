import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";

export const Category = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState({
    name: "",
    image: "",
  });

  // Handle Text Input
  const handlOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image Upload
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Image Preview
    setCategoryImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await Axios({
        url: SummaryApi.uploadImage.url,
        method: SummaryApi.uploadImage.method,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrl = response.data?.data?.url;

      setData((prev) => ({
        ...prev,
        image: uploadedUrl || "",
      }));
    } catch (error) {
      console.error("Image Upload Failed:", error);
      alert("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  // Submit Category
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.image) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await Axios({
        url: SummaryApi.addCategory.url,
        method: SummaryApi.addCategory.method,
        data: data,
      });

      alert("Category Added Successfully!");

      // Reset Form
      setShowCategoryModal(false);
      setCategoryImagePreview(null);
      setData({ name: "", image: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="mt-2">
        <Container>
          <Row>
            <Col>
              <div className="d-flex justify-content-between border-bottom shadow-md">
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

              {/* Modal */}
              <Modal
                show={showCategoryModal}
                onHide={() => setShowCategoryModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <form onSubmit={handlesubmit}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter Category name"
                      className="w-100 border-0 bg-light p-2 rounded"
                      value={data.name}
                      name="name"
                      onChange={handlOnChange}
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
                            style={{
                              objectFit: "cover",
                              height: "150px",
                              width: "150px",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "18px", color: "#666" }}>
                            Image
                          </span>
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
                        {uploading ? "Uploading..." : "Upload Image"}
                      </label>
                    </div>

                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleUploadCategoryImage}
                      className="d-none"
                    />

                    <button
                      type="submit"
                      className="w-100 border-0 fw-bold p-2 mt-3"
                    >
                      Add Category
                    </button>
                  </form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
