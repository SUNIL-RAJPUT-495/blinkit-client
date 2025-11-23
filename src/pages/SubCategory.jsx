import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
export const SubCategory = () => {
  return (
    <>
    <div className="mt-2 ">
                <Container>
                  <Row>
                    <Col>
                      <div className="d-flex justify-content-between border-bottom">
                        <p className="fw-bold">Sub Category</p>
                        <button
                          style={{
                            backgroundColor: "yellow",
                            border: "none",
                            padding: "5px",
                          }}
                        >
                          Add Sub Category
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                        <table className="table table-bordered  w-100">
 
  <thead className="bg-dark text-white" >
    <tr className='table-dark'>
      <th>Sr.No</th>
      <th>Name</th>
      <th>Image</th>
      <th>Category</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1.</td>
      <td>Tea</td>
      <td>
        <img
          style={{ height: "50px" }}
          src="/Image/sub category/Baby Care/Baby Food.webp"
          alt=""
        />
      </td>
      <td>Tea, Coffee & Health Drink</td>
      <td className='d-flex gap-2 align-items-center justify-content-center'>
        <button
          className="rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(187, 243, 200, 1)" }}
        >
          <MdEdit style={{ height:"20px" }} />
        </button>{" "}
        <button
          className="rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(238, 202, 202, 1)", color:"red"}}
        >
          <MdDelete style={{ height:"20px" }}/>
        </button>
      </td>
    </tr>
  </tbody>
</table>

                       
                        </Col>
                    </Row>
                </Container>
              </div>
    </>
  )
}
