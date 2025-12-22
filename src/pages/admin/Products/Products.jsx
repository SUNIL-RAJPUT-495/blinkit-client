import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await Axios.get(SummaryApi.getProduct.url);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleEditProduct = (product) => {
    // Navigate and pass product data
    navigate("/admin/upload-product", { state: { product } });
  };

  const handleDeleteProduct = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await Axios.delete(`${SummaryApi.deleteProduct.url}/${_id}`);
      alert("Product deleted");
      getAllProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (products.length === 0) return <p>No products found</p>;

  return (
    <div className="mt-3">
      <ul className="list-unstyled d-flex flex-wrap gap-3">
        {products.map((product) => (
          <li
            key={product._id}
            className="border p-2 rounded"
            style={{ width: "180px" }}
          >
            {product.image?.[0] && (
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-100 mb-2"
                style={{ height: "120px", objectFit: "cover", borderRadius: "6px" }}
              />
            )}
            <p className="fw-bold text-center mb-2">{product.name}</p>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
