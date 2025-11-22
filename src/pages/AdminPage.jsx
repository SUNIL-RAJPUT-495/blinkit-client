import React, { useRef, useState } from 'react'
import { Container, Row, Col, Dropdown,Modal } from "react-bootstrap"
import { Header } from '../Component/Header'

export const AdminPage = () => {
const [ShowProfile,SetShowProfile]=useState(true)
const [ShowCategory,SetShowCategory] = useState(false);
const [ShowSubCategory,SetShowSubCategory] = useState(false);
const [ShowUplod,SetShowUplod]=useState(false);

const [showCategoryModal, setShowCategoryModal] = useState(false);

const handleShowCategoryModal = () => setShowCategoryModal(true);
const handleCloseCategoryModal = () => setShowCategoryModal(false);


const Profile = ()=>{
 SetShowProfile(true)
 SetShowCategory(false)
 SetShowSubCategory(false)
 SetShowUplod(false)
}
const Category = ()=>{
   SetShowCategory(true)
   SetShowSubCategory(false)
   SetShowUplod(false)
   SetShowProfile(false)
}
const SubCategory =()=>{
   SetShowCategory(false)
   SetShowSubCategory(true)
   SetShowUplod(false)
   SetShowProfile(false)
}
const UplodProduct =()=>{
  SetShowCategory(false)
  SetShowSubCategory(false)
  SetShowUplod(true)
  SetShowProfile(false)
}

  const [ProfileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(URL.createObjectURL(file))
      setCategoryImage(URL.createObjectURL(file))
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault() // prevent form submit
    fileInputRef.current.click() // trigger file upload dialog
  }

  const [ CategoryImage, setCategoryImage] = useState(null)
  return (
    <>
      <Header />
      
      <Container>
        <Row>
          {/* LEFT SIDE MENU */}
          <Col md={3}>
            <div>
              <p className='fw-bold' onClick={Profile} style={{cursor: "pointer"}}>My Account</p>
              <p onClick={Profile} style={{cursor: "pointer"}}>Amit Prajapati</p>
              <ul className='list-unstyled '>
                <li onClick={Category} style={{cursor: "pointer"}}className='m-1'>Category</li>
                <li onClick={SubCategory} style={{cursor: "pointer"}} className='m-1'>Sub Category</li>
                <li onClick={UplodProduct} style={{cursor: "pointer"}} className='m-1'>Uplod Product</li>
                <li  style={{cursor: "pointer"}} className='m-1'>Product</li>
                <li  style={{cursor: "pointer"}} className='m-1'>My Order</li>
                <li  style={{cursor: "pointer"}} className='m-1'>Save Address</li>
                <li style={{cursor: "pointer"}} className='m-1'>Log Out</li>
              </ul>
            </div>
          </Col>

          {/* RIGHT SIDE FORM */}
          <Col md={9}>
          {ShowProfile &&(
            <div className='mt-3 '>
              <form>
                {/* PROFILE IMAGE UPLOAD */}
                <div className=" mt-4 ">
                  <div
                    className=' rounded-circle border p-1 '
                    style={{ width: "70px", height: "70px", overflow: "hidden" }}
                  >
                    <img
                      src={ProfileImage ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} // default placeholder
                      alt="preview"
                      className="rounded-circle w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />

                    {/* EDIT BUTTON */}
                    
                  </div>
                  
                  <button
                      type="button"
                      onClick={handleEditClick}
                      className=" bottom-0 end-0 btn btn-sm btn-warning mt-3"
                      style={{ borderRadius: "15px ",width:"80px" }}
                    >
                      Edit
                    </button>

                  {/* HIDDEN FILE INPUT */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>

                <br />

                {/* USER DETAILS */}
                <label>Name</label>
                <input
                  type="text"
                  placeholder='Enter your Name'
                  className='w-100 border-0 bg-body-secondary'
                />

                <label>Email</label>
                <input
                  type="text"
                  placeholder='Enter your Email'
                  className='w-100 border-0 bg-body-secondary'
                />

                <label>Mobile</label>
                <input
                  type="text"
                  placeholder='Enter your Mobile Number'
                  className='w-100 border-0 bg-body-secondary'
                />

                <input
                  type="submit"
                  className='w-100 mt-3 fw-bold'
                  style={{ border: "1px solid yellow", background: "white" }}
                />

               </form>
                
            
              </div>)}
              



              {/* Category */}





             {ShowCategory &&( <div className='mt-2 '>
                <Container>
                  <Row>
                    <Col>
                    <div className='d-flex justify-content-between border-bottom'>
                      
                      <p className='fw-bold'>Category</p> 
                      <button onClick={handleShowCategoryModal} style={{backgroundColor:"yellow" ,border:"none",padding:"5px"}}>Add Category</button>
                      </div>
                      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal} centered>
                          <Modal.Header closeButton>
                            <Modal.Title>Category</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                             <form>
                        <label>Name</label>
                              <input type="text" placeholder='Enter Category name' className='w-100 border-0 bg-light p-2 rounded' />
                              <br />
                              <div className='d-flex align-items-center mt-3'>
                              <div htmlFor="imageUpload" className='d-flex justify-content-center align-items-center' style={{height:"150px",width:"150px",backgroundColor:"gray"}}>
                              {CategoryImage ? (
                                 <img
                                   src={CategoryImage}
                                   alt="preview"
                                   
                                   style={{ objectFit: "cover",height:"150px" }}
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
                                   <span style={{ fontSize: "18px", color: "#666" }}>Image</span>
                                 </div>
                               )}
                               </div>
                              <label htmlFor="imageUpload"   className='ms-4 p-2' style={{height:"40px",border:"2px solid black",cursor:"pointer"}}>Uplod image</label>
                              </div>
                              <input id='imageUpload' type="file" ref={fileInputRef} onChange={handleImageChange} className='w-100 d-none' />
                              <br /><br />
                              <button type="submit" className="w-100 border-0 fw-bold p-1">Add Category</button>
                            </form>
                               </Modal.Body>
                             </Modal>

                    </Col>
                  </Row>
                </Container>
              </div> )
              }


              {/* Sub Category*/}
             {ShowSubCategory &&( <div  className='mt-2 '>
                <Container>
                  <Row>
                    <Col>
                    <div className='d-flex justify-content-between border-bottom' ><p className='fw-bold'>Sub Category</p> <button style={{backgroundColor:"yellow" ,border:"none",padding:"5px"}}>Add Sub Category</button></div>
                    </Col>
                  </Row>
                </Container>
              </div>)}

              {/* Upload Product */}

            
           {ShowUplod&&( <div className='Upload Product '>
            <Container>
              <Row>
                <Col>
                <div>
                  <p className='border-bottom fw-bold p-2'>Upload Product</p>

                  </div>
                  <div>
                    <label htmlFor=""> Name</label> 
                    <br />
                    <input type="text" placeholder='Enter product name'className='w-100 border-0 bg-light p-2 rounded' />
                    <br />
                    <label htmlFor=""> Description</label>
                    <br />
                    <input type="text" placeholder='Enter product description'className='w-100 border-0 bg-light p-2 rounded' />
                    <br />
                    <label htmlFor="">Image</label>
                    <br />
                    <label htmlFor="abc" className='w-100 '> image</label>
                    <input type="file" id='abc'className='d-none' />
                    <br />
                    <label htmlFor="">Category </label>
                    <br />
                    <Dropdown>
                      <Dropdown.Toggle className='bg-light w-100 text-dark text-start' >
                        Select Category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href='#' >abcd</Dropdown.Item>
                        <Dropdown.Item href='#'>abcd</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <label htmlFor=""> Sub Category</label>
                    <br />
                    <Dropdown>
                      <Dropdown.Toggle className='bg-light w-100 text-dark text-start' >
                        Sub Category
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href='#' >abcd</Dropdown.Item>
                        <Dropdown.Item href='#'>abcd</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <label htmlFor="">Unit </label>
                    <br />
                    <input type="text" placeholder='Enter Product Unit' className='w-100 border-0 bg-light p-2 rounded'/>
                    <br />
                    <label htmlFor=""> Number of Stock</label>
                    <br />
                    <input type="text"  placeholder='Enter product stock'className='w-100 border-0 bg-light p-2 rounded'/>
                    <br />
                    <label htmlFor=""> Price</label>
                    <br />
                    <input type="text" placeholder='Enter Product Price'className='w-100 border-0 bg-light p-2 rounded' />
                    <br />
                    <label htmlFor="">Discount</label>
                    <br />
                    <input type="text"placeholder='Enter product Discount' className='w-100 border-0 bg-light p-2 rounded' />
                    <br />
                    <button className='fw-bold mt-2 bg-white' style={{border:"2px solid yellow",width:"120px"}}>Add Fields</button>
                    <br />
                    <input type="submit"className='w-100 mt-2 border-0' style={{backgroundColor:"yellow"}} />
                  </div>
                  </Col>
              </Row>
            </Container>
            </div>)}
        </Col>
               </Row>
              </Container>
    </>
  )
}

