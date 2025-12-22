import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { fetchCategories, fetchSubCategory } from "../../../utils/api";
import { MdCloudUpload } from "react-icons/md";

export const UploadProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [images, setImages] = useState([]); // File objects
  const [imagePreviews, setImagePreviews] = useState([]); // Preview URLs
  const inputRef = useRef(null);
  const MAX_IMAGES = 5;

  const [form, setForm] = useState({
    name: "",
    description: "",
    unit: "",
    image: [], // Uploaded image URLs
    stock: "",
    price: "",
    discount: "",
    category: "",
    subCategory: "",
  });

  // Fetch categories & subcategories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res?.data || res || []);
      } catch (err) {
        console.error(err);
      }
    };
    const getSubCategories = async () => {
      try {
        const res = await fetchSubCategory();
        setSubCategories(res || []);
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
    getSubCategories();
  }, []);

  const focusFileInput = () => inputRef.current.click();

  // Handle file selection
  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (files.length + images.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    // Generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    setImages((prev) => [...prev, ...files]);

    // Upload files to backend
    const uploadedUrls = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", `blinkit/product/${form.name || "default"}`);

      try {
        const res = await Axios({
          url: SummaryApi.uploadImage.url,
          method: SummaryApi.uploadImage.method,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data?.data?.url) {
          uploadedUrls.push(res.data.data.url);
        }
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed");
      }
    }

    // Save uploaded URLs in form state
    setForm((prev) => ({
      ...prev,
      image: [...prev.image, ...uploadedUrls],
    }));

    e.target.value = ""; // reset input for re-upload
  };

  // Handle form field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          form[key].forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, form[key]);
        }
      });

      await Axios({
        url: SummaryApi.addProduct.url,
        method: SummaryApi.addProduct.method,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");

      // Reset form
      setForm({
        name: "",
        description: "",
        unit: "",
        image: [],
        stock: "",
        price: "",
        discount: "",
        category: "",
        subCategory: "",
      });
      setImages([]);
      setImagePreviews([]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h4 className="fw-bold border-bottom pb-2">Upload Product</h4>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
              required
            />

            <label className="mt-2">Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
              required
            />

            <label className="mt-2">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              hidden
              onChange={handleUploadImage}
            />
            <div
              onClick={focusFileInput}
              className="bg-light rounded d-flex align-items-center justify-content-center flex-column"
              style={{ height: "120px", cursor: "pointer" }}
            >
              {imagePreviews.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <MdCloudUpload size={40} />
                  <p>Upload images</p>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  {imagePreviews.map((img, idx) => (
                    <div key={idx} style={{ width: "60px", height: "60px" }}>
                      <img
                        src={img}
                        alt=""
                        className="w-100 h-100 object-fit-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label className="mt-2">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-control mb-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="mt-2">Sub Category</label>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              className="form-control mb-2"
              required
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <label className="mt-2">Unit</label>
            <input
              type="text"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
            />

            <label className="mt-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
            />

            <label className="mt-2">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
            />

            <label className="mt-2">Discount</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-100 p-2 bg-light border-0 rounded"
            />

            <button
              type="submit"
              className="w-100 mt-3 p-2 fw-bold"
              style={{ background: "yellow" }}
            >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
