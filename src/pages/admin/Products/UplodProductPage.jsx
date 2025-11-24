import React from 'react'
import { Container,Row,Col,Dropdown } from 'react-bootstrap'

export const UplodProductPage = () => {
  return (
    <>
    <div className="Upload Product ">
                <Container>
                  <Row>
                    <Col>
                      <div>
                        <p className="border-bottom fw-bold p-2">
                          Upload Product
                        </p>
                      </div>
                      <div>
                        <label htmlFor=""> Name</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter product name"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <label htmlFor=""> Description</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter product description"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <label htmlFor="">Image</label>
                        <br />
                        <label htmlFor="abc" className="w-100 ">
                          {" "}
                          image
                        </label>
                        <input type="file" id="abc" className="d-none" />
                        <br />
                        <label htmlFor="">Category </label>
                        <br />
                        <Dropdown>
                          <Dropdown.Toggle className="bg-light w-100 text-dark text-start">
                            Select Category
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">abcd</Dropdown.Item>
                            <Dropdown.Item href="#">abcd</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <label htmlFor=""> Sub Category</label>
                        <br />
                        <Dropdown>
                          <Dropdown.Toggle className="bg-light w-100 text-dark text-start">
                            Sub Category
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#">abcd</Dropdown.Item>
                            <Dropdown.Item href="#">abcd</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <br />
                        <label htmlFor="">Unit </label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter Product Unit"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <label htmlFor=""> Number of Stock</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter product stock"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <label htmlFor=""> Price</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter Product Price"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <label htmlFor="">Discount</label>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter product Discount"
                          className="w-100 border-0 bg-light p-2 rounded"
                        />
                        <br />
                        <button
                          className="fw-bold mt-2 bg-white"
                          style={{ border: "2px solid yellow", width: "120px" }}
                        >
                          Add Fields
                        </button>
                        <br />
                        <input
                          type="submit"
                          className="w-100 mt-2 border-0"
                          style={{ backgroundColor: "yellow" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
    </>
  )
}
