import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";

export const AllSubCategory = ({ subCategories = [], onEdit, onDelete }) => {
  return (
    <Container className="px-3">
      <Row>
        <Col className="px-0">
          <div className="table-responsive rounded-3 border shadow-sm mt-3">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark text-white">
                <tr>
                  <th style={{ width: "80px" }}>Sr.No</th>
                  <th>Sub Category Name</th>
                  <th>Image</th>
                  <th>Parent Category</th>
                  <th className="text-center" style={{ width: "120px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {subCategories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted small">
                      No Sub Categories Found.
                    </td>
                  </tr>
                ) : (
                  subCategories.map((item, index) => (
                    <tr key={item._id}>
                      <td className="fw-bold">{index + 1}</td>
                      <td className="fw-semibold">{item.name}</td>

                      {/* Subcategory Image */}
                      <td>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="bg-light p-1 border rounded"
                            style={{ height: 44, width: 44, objectFit: "contain" }}
                          />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>

                      {/* Category Name */}
                      <td className="text-secondary small">
                        {item.categoryId?.name || "N/A"}
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-success d-flex align-items-center justify-content-center p-2 rounded-3"
                            onClick={() => onEdit(item)}
                            title="Edit Sub Category"
                          >
                            <MdEdit size={16} />
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 rounded-3"
                            onClick={() => onDelete(item._id)}
                            title="Delete Sub Category"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
