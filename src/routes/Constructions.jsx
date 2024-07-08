import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./constructions.css";

const Constructions = () => {
  const [constructions, setConstructions] = useState([]);

  useEffect(() => {
    AOS.init({
      offset: 200,
      delay: 0,
      duration: 300,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    fetchConstructions();
  }, []);

  const fetchConstructions = () => {
    axios
      .get("https://construction-portal-backend.onrender.com/api/construction")
      .then((response) => {
        const updatedConstructions = response.data.map((construction) => ({
          ...construction,
          image: `http://localhost:5000/${construction.image}`,
        }));
        setConstructions(updatedConstructions);
      })
      .catch((error) => {
        console.error("Error fetching constructions:", error);
      });
  };

  return (
    <div
      id="constructions"
      className="MainDiv"
      style={{
        paddingTop: "60px",
      }}
    >
      <Container className="d-flex flex-column align-items-center my-5">
        <h1 className="mb-4 text-center" data-aos="fade-bottom">
          <span style={{ color: "#F5BF23" }}>OUR</span> CONSTRUCTIONS
        </h1>
        <Row className="w-100">
          {constructions.map((construction, index) => (
            <Col
              md={6}
              key={index}
              className="mb-4"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <Card className="flex-fill card-item">
                <Row className="h-100">
                  <Col xl={5}>
                    <div className="geeks">
                      <Card.Img
                        src={construction.image}
                        alt="Construction Image"
                        className="construction-image"
                      />
                    </div>
                  </Col>
                  <Col xl={7} className="d-flex align-items-center">
                    <Card.Body>
                      <Card.Title>{construction.title}</Card.Title>
                      <Card.Text>{construction.description}</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Constructions;
