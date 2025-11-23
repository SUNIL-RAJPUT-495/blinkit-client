import React, { useRef, useState } from "react";
import { Container, Row, Col, Dropdown, Modal } from "react-bootstrap";
import { Header } from "../Component/Header";
import { Category } from "./Category";
import { SubCategory } from "./SubCategory";
import { UplodProductPage } from "./UplodProductPage";

export const AdminPage = () => {
  const [ShowProfile, SetShowProfile] = useState(true);
  const [ShowCategory, SetShowCategory] = useState(false);
  const [ShowSubCategory, SetShowSubCategory] = useState(false);
  const [ShowUplod, SetShowUplod] = useState(false);

 

  const Profile = () => {
    SetShowProfile(true);
    SetShowCategory(false);
    SetShowSubCategory(false);
    SetShowUplod(false);
  };
  const category = () => {
    SetShowCategory(true);
    SetShowSubCategory(false);
    SetShowUplod(false);
    SetShowProfile(false);
  };
  const subCategory = () => {
    SetShowCategory(false);
    SetShowSubCategory(true);
    SetShowUplod(false);
    SetShowProfile(false);
  };
  const uplodProduct = () => {
    SetShowCategory(false);
    SetShowSubCategory(false);
    SetShowUplod(true);
    SetShowProfile(false);
  };

  const [ProfileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // prevent form submit
    fileInputRef.current.click(); // trigger file upload dialog
  };


  return (
    <>
      <Header />

      <Container>
        <Row>
          {/* LEFT SIDE MENU */}
          <Col md={2}>
            <div>
              <p
                className="fw-bold"
                onClick={Profile}
                style={{ cursor: "pointer" }}
              >
                My Account
              </p>
              <p onClick={Profile} style={{ cursor: "pointer" }}>
                Amit Prajapati
              </p>
              <ul className="list-unstyled ">
                <li
                  onClick={category}
                  style={{ cursor: "pointer" }}
                  className="m-1"
                >
                  Category
                </li>
                <li
                  onClick={subCategory}
                  style={{ cursor: "pointer" }}
                  className="m-1"
                >
                  Sub Category
                </li>
                <li
                  onClick={uplodProduct}
                  style={{ cursor: "pointer" }}
                  className="m-1"
                >
                  Uplod Product
                </li>
                <li style={{ cursor: "pointer" }} className="m-1">
                  Product
                </li>
                <li style={{ cursor: "pointer" }} className="m-1">
                  My Order
                </li>
                <li style={{ cursor: "pointer" }} className="m-1">
                  Save Address
                </li>
                <li style={{ cursor: "pointer" }} className="m-1">
                  Log Out
                </li>
              </ul>
            </div>
          </Col>

          {/* RIGHT SIDE FORM */}
          <Col md={10}>
            {ShowProfile && (
              <div className="mt-3 ">
                <form>
                  {/* PROFILE IMAGE UPLOAD */}
                  <div className=" mt-4 ">
                    <div
                      className=" rounded-circle border p-1 "
                      style={{
                        width: "70px",
                        height: "70px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          ProfileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        } // default placeholder
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
                      style={{ borderRadius: "15px ", width: "80px" }}
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
                    placeholder="Enter your Name"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <label>Mobile</label>
                  <input
                    type="text"
                    placeholder="Enter your Mobile Number"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <input
                    type="submit"
                    className="w-100 mt-3 fw-bold"
                    style={{ border: "1px solid yellow", background: "white" }}
                  />
                </form>
              </div>
            )}

            {/* Category */}

            {ShowCategory && <Category/>}

            {/* Sub Category*/}
            {ShowSubCategory && <SubCategory/>}

            {/* Upload Product */}

            {ShowUplod && <UplodProductPage/>}
          </Col>
        </Row>
      </Container>
    </>
  );
};
