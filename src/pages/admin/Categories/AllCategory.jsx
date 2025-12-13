import React from "react";

export const AllCategory = ({ categories = [], onEdit, onDelete }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div>
      {safeCategories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <div className="mt-3">
          <ul className="list-unstyled d-flex flex-wrap gap-3">
            {safeCategories.map((cat) => (
              <li 
                key={cat._id}
                className="border p-1 rounded"
                style={{
                  width: "150px",
                  height: "200px",
                }}
              >
                {/* Category Image */}
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-100"
                    style={{
                      height: "160px",
                      objectFit: "contain",
                      borderRadius: "6px",
                    }}
                  />
                )}

              
                {/* Buttons */}
                <div className="d-flex justify-content-between mb-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => onEdit(cat)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(cat._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
