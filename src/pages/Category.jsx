import React from 'react'
import { useRef,useState } from 'react';
import { Container, Row, Col,  Modal } from "react-bootstrap";

export const Category = () => {
   const [showCategoryModal, setShowCategoryModal] = useState(false);
   const fileInputRef = useRef(null);

  const handleShowCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

    const [CategoryImage, setCategoryImage] = useState(null);
     const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
     <div className="mt-2 ">
                <Container>
                  <Row>
                    <Col>
                      <div className="d-flex justify-content-between border-bottom">
                        <p className="fw-bold">Category</p>
                        <button
                          onClick={handleShowCategoryModal}
                          style={{
                            backgroundColor: "yellow",
                            border: "none",
                            padding: "5px",
                          }}
                        >
                          Add Category
                        </button>
                      </div>
                      <Modal
                        show={showCategoryModal}
                        onHide={handleCloseCategoryModal}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <label>Name</label>
                            <input
                              type="text"
                              placeholder="Enter Category name"
                              className="w-100 border-0 bg-light p-2 rounded"
                            />
                            <br />
                            <div className="d-flex align-items-center mt-3">
                              <div
                                htmlFor="imageUpload"
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                  height: "150px",
                                  width: "150px",
                                  backgroundColor: "gray",
                                }}
                              >
                                {CategoryImage ? (
                                  <img
                                    src={CategoryImage}
                                    alt="preview"
                                    style={{
                                      objectFit: "cover",
                                      height: "150px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="w-100 h-100 d-flex justify-content-center align-items-center"
                                    style={{
                                      border: "1px dashed #999",
                                      background: "#f5f5f5",
                                      textAlign: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "18px",
                                        color: "#666",
                                      }}
                                    >
                                      Image
                                    </span>
                                  </div>
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
                                Uplod image
                              </label>
                            </div>
                            <input
                              id="imageUpload"
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              className="w-100 d-none"
                            />
                            <br />
                            <br />
                            <button
                              type="submit"
                              className="w-100 border-0 fw-bold p-1"
                            >
                              Add Category
                            </button>
                          </form>
                        </Modal.Body>
                      </Modal>
                    </Col>
                  </Row>
                </Container>
                <div>
                  <Container>
                    <Row>
                      <Col>
                        <div>
                          <div
                            style={{ height: "130px", width: "125px" }}
                            className="border"
                          >
                            <div className=" d-flex justify-content-center align-items-center">
                              <img
                                src={CategoryImage}
                                style={{ height: "100px" }}
                                alt=""
                              />
                            </div>

                            <div className="d-flex justify-content-between w-100 ">
                              <button
                                className="border-0 px-2"
                                style={{ backgroundColor: "green" }}
                              >
                                Edit
                              </button>{" "}
                              <button className="bg-danger border-0">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div></>
  )
}
