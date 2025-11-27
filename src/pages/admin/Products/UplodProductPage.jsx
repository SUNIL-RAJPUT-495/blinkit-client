import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

export const UplodProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCats, setSubCats] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    unit: "",
    stock: "",
    price: "",
    discount: "",
    category: "",
    subCategory: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Fetch categories from backend
  const loadCategories = async () => {
    const res = await axios.get("http://localhost:8080/category");
    setCategories(res.data.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("image", image);
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    try {
      await axios.post("http://localhost:8080/product", fd);
      alert("Product Uploaded Successfully!");
    } catch (err) {
      console.log("Error:", err);
      alert("Upload Failed!");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="mx-auto">
          <h4 className="fw-bold border-bottom pb-2">Upload Product</h4>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
            />

            <label className="mt-2">Description</label>
            <input
              type="text"
              name="description"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
            />

            <label className="mt-2">Image</label>
            <input type="file" className="w-100" onChange={handleImage} />
            {preview && <img src={preview} height="80" className="mt-1" />}

            <label className="mt-2">Category</label>
            <Dropdown>
              <Dropdown.Toggle className="w-100 bg-light text-dark">
                {form.category || "Select Category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((cat) => (
                  <Dropdown.Item
                    key={cat._id}
                    onClick={() => setForm({ ...form, category: cat.name })}
                  >
                    {cat.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <label className="mt-2">Unit</label>
            <input
              type="text"
              name="unit"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
            />

            <label className="mt-2">Stock</label>
            <input
              type="number"
              name="stock"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
            />

            <label className="mt-2">Price</label>
            <input
              type="number"
              name="price"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
            />

            <label className="mt-2">Discount</label>
            <input
              type="number"
              name="discount"
              className="w-100 p-2 bg-light border-0 rounded"
              onChange={handleChange}
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
