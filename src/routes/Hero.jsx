import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import a from "../img/Hero-Carousel/CarouselImage4.jpg";
import b from "../img/Hero-Carousel/CarouselImage2.jpg";
import c from "../img/Hero-Carousel/CarouselImage3.jpg";
import { NavLink } from "react-router-dom";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [heroContent, setHeroContent] = useState({ heading: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/hero')
      .then(response => {
        setHeroContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching hero content:', error);
      });
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ position: "relative", paddingTop: "60px" }}>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={a}
            alt="First slide"
            style={{ height: "800px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={b}
            alt="Second slide"
            style={{ height: "800px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c}
            alt="Third slide"
            style={{ height: "800px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>
      <div
        className="carousel-caption d-flex flex-column justify-content-center align-items-center"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          paddingTop: "60px",
        }}
      >
        <div className="carousel-text" style={{ textAlign: "center" }}>
          <h1 className="text-light">{heroContent.heading}</h1>
          <p className="text-light">{heroContent.content}</p>
          <NavLink to="/aboutus">
            <button className="custom-btn">Learn More About Us</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
