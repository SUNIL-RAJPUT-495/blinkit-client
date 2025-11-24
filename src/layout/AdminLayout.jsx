import {  useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { Header } from "../Component/Header";
import { Category } from "../pages/admin/Categories/Category";
import { SubCategory } from "../pages/admin/SubCategory/SubCategory";
import { UplodProductPage } from "../pages/admin/Products/UplodProductPage";
import { ProfilePage } from "../pages/admin/ProfilePage";

export const AdminLayout = () => {
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
            {ShowProfile && <ProfilePage/>}

            {/* Category */}

            {ShowCategory && <Category/>}

            {/* Sub Category*/}
            {ShowSubCategory && <SubCategory/>}

            {/* Upload Product */}

            {ShowUplod && <UplodProductPage/>}
            <link rel="stylesheet" href="" />
            <link rel="stylesheet" href="" />
            
          </Col>
        </Row>
      </Container>
    </>
  );
};
