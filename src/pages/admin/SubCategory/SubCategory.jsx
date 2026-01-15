import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal,Button } from "react-bootstrap";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { fetchCategories } from "../../../utils/api";
import { AllSubCategory } from "./AllSubCategory";

export const SubCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [subcategoryImagePreview, setSubCategoryImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);

  const [data, setData] = useState({
    name: "",
    categoryId: "",
    image: "",
  });

  /* ================= GET CATEGORIES ================= */
  const getCategories = async () => {
    try {
      const res = await fetchCategories();
      setCategories(res || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= GET SUBCATEGORIES ================= */
  const getSubCategories = async () => {
    try {
      const res = await Axios({
        url: SummaryApi.getSubCategory.url,
        method: SummaryApi.getSubCategory.method,
      });

      if (res.data?.success) {
        setSubCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubCategoryImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", `blinkit/subcategory${data.name || "default"}`);

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
    } catch (error) {
       console.error("Upload failed:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };
  
  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.categoryId || !data.image) {
      alert("All fields required");
      return;
    }

    try {
      if (editSubCategoryId) {
        await Axios({
          url: `${SummaryApi.updateSubCategory.url}/${editSubCategoryId}`,
          method: SummaryApi.updateSubCategory.method,
          data,
        });
        alert("SubCategory Updated");
      } else {
        await Axios({
          url: SummaryApi.addSubCategory.url,
          method: SummaryApi.addSubCategory.method,
          data,
        });
        alert("SubCategory Added");
      }

      setShowModal(false);
      setData({ name: "", categoryId: "", image: "" });
      setSubCategoryImagePreview(null);
      setEditSubCategoryId(null);
      getSubCategories();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setData({
      name: item.name,
      categoryId: item.categoryId?._id,
      image: item.image,
    });
    setSubCategoryImagePreview(item.image);
    setEditSubCategoryId(item._id);
    setShowModal(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await Axios({
        url: `${SummaryApi.deleteSubCategory.url}/${id}`,
        method: SummaryApi.deleteSubCategory.method,
      });
      getSubCategories();
    } catch  {
      alert("Delete failed");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h4>Sub Categories</h4>
            
              <Button
              variant="warning"
              onClick={() => setShowModal(true)}
            >
              Add Category
            </Button>
            </div>

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editSubCategoryId ? "Edit" : "Add"} Sub Category
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
                    className="w-100 bg-light border-0 p-2 mb-2"
                  />

                  <label>Category</label>
                  <select
                    name="categoryId"
                    value={data.categoryId}
                    onChange={handleChange}
                    className="form-control mb-3"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* IMAGE */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      style={{
                        height: 120,
                        width: 120,
                        background: "#f0f0f0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {subcategoryImagePreview ? (
                        <img
                          src={subcategoryImagePreview}
                          alt=""
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>

                    <label className="ms-3 p-2 border">
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleUploadImage}
                      />
                    </label>
                  </div>

                  <button className="w-100 p-2 fw-bold border-0">
                    {editSubCategoryId ? "Update" : "Add"} Sub Category
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>

      <AllSubCategory
        subCategories={subCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
