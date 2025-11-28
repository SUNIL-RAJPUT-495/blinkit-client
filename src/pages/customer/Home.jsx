import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const categories = [
    {
      src: "/Image/category/Fruits-Vegetables.png",
      alt: "Fruits & Vegetables",
    },
    { src: "/Image/category/Dairy-Bread-Eggs.png", alt: "Dairy, Bread & Eggs" },
    { src: "/Image/category/Pet-Care.png", alt: "Pet Care" },
    { src: "/Image/category/Dairy-Bread-Eggs.png", alt: "Dairy, Bread & Eggs" },
    {
      src: "/Image/category/Cold-Drinks-Juices.png",
      alt: "Cold Drinks & Juices",
    },
    { src: "/Image/category/Snacks-Munchies.png", alt: "Snacks & Munchies" },
    {
      src: "/Image/category/Breakfast-Instant-Food.png",
      alt: "Breakfast & Instant Food",
    },
    { src: "/Image/category/Sweet-Tooth.png", alt: "Sweet Tooth" },
    { src: "/Image/category/Bakery-Biscuits.png", alt: "Bakery & Biscuits" },
    {
      src: "/Image/category/Tea-Coffee-Health-Drink.png",
      alt: "Tea, Coffee & Health Drink",
    },
    { src: "/Image/category/Atta-Rice-Dal.png", alt: "Atta, Rice & Dal" },
    { src: "/Image/category/Masala-Oil-More.png", alt: "Masala, Oil & More" },
    { src: "/Image/category/Sauces-Spreads.png", alt: "Sauces & Spreads" },
    {
      src: "/Image/category/Chicken-Meat-Fish.png",
      alt: "Chicken, Meat & Fish",
    },
    {
      src: "/Image/category/Organic-Healthy-Living.png",
      alt: "Organic & Healthy Living",
    },
    { src: "/Image/category/Baby-Care.png", alt: "Baby Care" },
    { src: "/Image/category/Pharma-Wellness.png", alt: "Pharma & Wellness" },
    {
      src: "/Image/category/Cleaning-Essentials.png",
      alt: "Cleaning Essentials",
    },
    { src: "/Image/category/Home-Office.png", alt: "Home & Office" },
    { src: "/Image/category/Personal-Care.png", alt: "Personal Care" },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src="/Home/Group-33704.webp" alt="Banner" className="w-100" />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="auto">
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/pharmacy-WEB.avif"
                  alt="Pharmacy"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/babycare-WEB.avif"
                  alt="Baby Care"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
            <span>
              {" "}
              <a href="#">
                <img
                  src="/Home/Pet-Care_WEB.avif"
                  alt="Pet Care"
                  style={{ height: "200px", margin: "5px" }}
                />
              </a>
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            {categories.map((pic, i) => (
              <a href="#" key={i} className="p-2">
                <img src={pic.src} alt={pic.alt} style={{ height: "150px" }} />
              </a>
            ))}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div className="row">
              {products.map((item, index) => (
                <div key={index}>
                  <div
                    className="border rounded shadow mt-4 mb-5 d-flex justify-content-center "
                    style={{ height: "280px", width: "190px" }}
                  >
                    <div className="p-1">
                      <div
                        className="pt-2 d-flex justify-content-center align-items-center mb-0"
                        style={{
                          height: "150px",
                          width: "170px",
                          backgroundColor: "black",
                        }}
                      >
                        <img
                          className="object-fit-cover h-100 w-100"
                          src={item.image} // ⬅ Admin se aayi image
                          alt={item.name}
                        />
                      </div>

                      <div className="p-2 m-0">
                        <p className="fw-bold mb-1">{item.name}</p>
                        <p className="mb-1">{item.quantity} pcs</p>
                      </div>

                      <div className="d-flex justify-content-between p-2 m-0">
                        <span>{item.price}</span>
                        <span>
                          <button
                            style={{
                              height: "30px",
                              width: "60px",
                              backgroundColor: "rgba(231, 253, 231, 1)",
                              border: "1px solid rgba(1, 91, 24, 1)",
                              color: "rgba(1, 91, 3, 1)",
                              borderRadius: "10px",
                            }}
                          >
                            add
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
