import React, { useEffect, useState } from "react";
import "./services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  faMountainCity,
  faHelmetSafety,
  faWrench,
  faPalette,
  faHouse,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    // Fetch services data from backend API
    fetch("https://construction-portal-backend.onrender.com/api/services")
      .then((response) => response.json())
      .then((data) => setServicesData(data))
      .catch((error) => console.error("Error fetching services:", error));

    AOS.init({
      offset: 200,
      delay: 0,
      duration: 500,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  const icons = [
    "faMountainCity",
    "faHelmetSafety",
    "faWrench",
    "faPalette",
    "faHouse",
    "faWandMagicSparkles",
  ];

  const getFontAwesomeIcon = (iconName) => {
    switch (iconName) {
      case "faMountainCity":
        return faMountainCity;
      case "faHelmetSafety":
        return faHelmetSafety;
      case "faWrench":
        return faWrench;
      case "faPalette":
        return faPalette;
      case "faHouse":
        return faHouse;
      case "faWandMagicSparkles":
        return faWandMagicSparkles;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="services container text-center mt-5 d-flex flex-column">
        <h1 className="mb-4">
          <span style={{ color: "#F5BF23" }}>OUR</span> SERVICES
        </h1>
        <Container>
          <Row className="justify-content-center">
            {servicesData.map((service, index) => (
              <Col
                key={index}
                md={4}
                className="mb-4"
                data-aos={
                  index === 0 || index === 3
                    ? "fade-right"
                    : index === 1
                    ? "fade-down"
                    : index === 4
                    ? "fade-up"
                    : index === 2 || index === 5
                    ? "fade-left"
                    : ""
                }
                data-aos-offset="200"
                data-aos-duration="800"
              >
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="mb-3">
                      <FontAwesomeIcon
                        className="fa-icon"
                        icon={getFontAwesomeIcon(icons[index])}
                      />
                    </div>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
