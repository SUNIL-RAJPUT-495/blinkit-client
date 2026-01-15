import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";

export const AllSubCategory = ({ subCategories = [], onEdit, onDelete }) => {
  return (
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
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {subCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Sub Categories Found
                  </td>
                </tr>
              ) : (
                subCategories.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>

                    {/* Subcategory Image */}
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ height: 50, width: 50 }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    {/* Category Name and Image */}
                    <td >
                     
                          {item.categoryId.name} 
                        
                      
                    </td>

                    {/* Actions */}
                    <td className="d-flex gap-2 justify-content-center">
                      <button
                        className="border-0 rounded-circle"
                        style={{ background: "rgba(187,243,200,1)" }}
                        onClick={() => onEdit(item)}
                      >
                        <MdEdit size={20} />
                      </button>

                      <button
                        className="border-0 rounded-circle"
                        style={{ background: "rgba(238,202,202,1)", color: "red" }}
                        onClick={() => onDelete(item._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};
