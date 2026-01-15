import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { fetchCategories, fetchSubCategory } from "../../../utils/api";
import { MdCloudUpload } from "react-icons/md";

export const UploadProductPage = () => {
  const MAX_IMAGES = 5;
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product;

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [form, setForm] = useState({
    _id: "",
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

  // Prefill form when editing
  useEffect(() => {
    if (productToEdit) {
      setForm({
        _id: productToEdit._id,
        name: productToEdit.name,
        description: productToEdit.description,
        unit: productToEdit.unit,
        image: productToEdit.image || [],
        stock: productToEdit.stock,
        price: productToEdit.price,
        discount: productToEdit.discount,
        category: productToEdit.category?._id || "",
        subCategory: productToEdit.subCategory?._id || "",
      });
      setImagePreviews(productToEdit.image || []);
    }
  }, [productToEdit]);

  const focusFileInput = () => inputRef.current?.click();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Upload images
  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length + imagePreviews.length > MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    for (let file of files) {
      setImagePreviews((prev) => [...prev, URL.createObjectURL(file)]);
      const formData = new FormData();
      formData.append("productImages", file);
      formData.append("folder", `blinkit/product/${form.name || "default"}`);

      try {
        const res = await Axios.post(SummaryApi.productImage.url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setForm((prev) => ({ ...prev, image: [...prev.image, ...res.data.data] }));
      } catch (err) {
        console.error("Upload failed:", err.response?.data || err.message);
        alert("Image upload failed");
      }
    }
    e.target.value = "";
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await Axios.put(`${SummaryApi.editProduct.url}/${form._id}`, form, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Product updated successfully");
      } else {
        await Axios.post(SummaryApi.addProduct.url, form, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Product added successfully");
      }
      setForm({
        _id: "",
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
      setImagePreviews([]);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to submit product");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col>
          <h4 className="fw-bold border-bottom pb-2 mb-3">
            {form._id ? "Edit Product" : "Upload Product"}
          </h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" accept="image/*" hidden ref={inputRef} onChange={handleUploadImage} />
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center flex-column mb-2"
                style={{ height: "120px", cursor: "pointer" }}
                onClick={focusFileInput}
              >
                {imagePreviews.length === 0 ? (
                  <div className="text-center">
                    <MdCloudUpload size={40} />
                    <p>Upload images</p>
                  </div>
                ) : (
                  <div className="d-flex gap-2">
                    {imagePreviews.map((img, idx) => (
                      <Image key={idx} src={img} rounded style={{ width: 60, height: 60, objectFit: "cover" }} />
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Sub Category</Form.Label>
              <Form.Select name="subCategory" value={form.subCategory} onChange={handleChange} required>
                <option value="">Select Sub Category</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Unit</Form.Label>
              <Form.Control type="text" name="unit" value={form.unit} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" name="discount" value={form.discount} onChange={handleChange} />
            </Form.Group>

            <Button type="submit" variant="warning" className="w-100 fw-bold">
              {form._id ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
