import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  const categories = [
    { src: "/Image/category/Pet-Care.png", alt: "Pet Care" },
    { src: "/Image/category/Dairy-Bread-Eggs.png", alt: "Dairy, Bread & Eggs" },
    { src: "/Image/category/Fruits-Vegetables.png", alt: "Fruits & Vegetables" },
    { src: "/Image/category/Cold-Drinks-Juices.png", alt: "Cold Drinks & Juices" },
    { src: "/Image/category/Snacks-Munchies.png", alt: "Snacks & Munchies" },
    { src: "/Image/category/Breakfast-Instant-Food.png", alt: "Breakfast & Instant Food" },
    { src: "/Image/category/Sweet-Tooth.png", alt: "Sweet Tooth" },
    { src: "/Image/category/Bakery-Biscuits.png", alt: "Bakery & Biscuits" },
    { src: "/Image/category/Tea-Coffee-Health-Drink.png", alt: "Tea, Coffee & Health Drink" },
    { src: "/Image/category/Atta-Rice-Dal.png", alt: "Atta, Rice & Dal" },
    { src: "/Image/category/Masala-Oil-More.png", alt: "Masala, Oil & More" },
    { src: "/Image/category/Sauces-Spreads.png", alt: "Sauces & Spreads" },
    { src: "/Image/category/Chicken-Meat-Fish.png", alt: "Chicken, Meat & Fish" },
    { src: "/Image/category/Organic-Healthy-Living.png", alt: "Organic & Healthy Living" },
    { src: "/Image/category/Baby-Care.png", alt: "Baby Care" },
    { src: "/Image/category/Pharma-Wellness.png", alt: "Pharma & Wellness" },
    { src: "/Image/category/Cleaning-Essentials.png", alt: "Cleaning Essentials" },
    { src: "/Image/category/Home-Office.png", alt: "Home & Office"},
    { src: "/Image/category/Personal-Care.png", alt: "Personal Care"},
    
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
            <a href="#"><img src="/Home/pharmacy-WEB.avif" alt="Pharmacy" style={{ height: "200px" }} /></a>
            <a href="#"><img src="/Home/babycare-WEB.avif" alt="Baby Care" style={{ height: "200px" }} /></a>
            <a href="#"><img src="/Home/Pet-Care_WEB.avif" alt="Pet Care" style={{ height: "200px" }} /></a>
          </Col>
        </Row>
        <Row>
          <Col>
            {categories.map((pic, i) => (
              <a href="#" key={i} className="p-2">
                <img src={pic.src} alt={pic.alt} style={{ height: "200px" }} />
              </a>
            ))}
          </Col>
        </Row>
      </Container>

      
    </>
  );
};
