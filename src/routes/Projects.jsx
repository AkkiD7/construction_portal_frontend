import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import axios from "axios";
import "./Project.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = () => {
  const [tabs, setTabs] = useState([
    {
      id: "all",
      title: "All",
      images: [],
    },
    {
      id: "remodeling",
      title: "Remodeling",
      images: [],
    },
    {
      id: "construction",
      title: "Construction",
      images: [],
    },
    {
      id: "repairs",
      title: "Repairs",
      images: [],
    },
    {
      id: "design",
      title: "Design",
      images: [],
    },
  ]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const categories = ["remodeling", "construction", "repairs", "design"];
      const allImages = [];

      for (const category of categories) {
        const response = await axios.get(
          `https://construction-portal-backend.onrender.com/api/projects/images/${category}`
        );
    

        const images = response.data.map((image, index) => ({
          ...image,
          id: `${category}-${index}`,
          src: `https://construction-portal-backend.onrender.com/${image.image}`, // Update image path here
        }));

        setTabs((prevTabs) =>
          prevTabs.map((tab) =>
            tab.id === category ? { ...tab, images } : tab
          )
        );

        allImages.push(...images);
      }

      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === "all" ? { ...tab, images: allImages } : tab
        )
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const renderImages = (images) => {
    return images.map((image, index) => (
      <div
        key={image.id}
        className="col-md-4 mb-3"
        data-aos={
          index % 3 === 0
            ? "fade-right"
            : index % 3 === 1
            ? "fade-up"
            : "fade-left"
        }
        data-aos-duration="1000"
      >
        <div className="image-container">
          <img src={image.src} alt={image.id} className="img-fluid" />{" "}
          {/* Use image.src */}
        </div>
      </div>
    ));
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <div className="container py-5 d-flex flex-column">
        <h1 className="text-center" style={{ fontWeight: "600" }}>
          <span style={{ color: "#F5BF23" }}>OUR</span> PROJECTS
        </h1>
        <Tab.Container defaultActiveKey="all">
          <Nav variant="tabs" className="mb-4">
            {tabs.map((tab) => (
              <Nav.Item key={tab.id}>
                <Nav.Link eventKey={tab.id} className="custom-nav-link">
                  {tab.title}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content>
            {tabs.map((tab) => (
              <Tab.Pane key={tab.id} eventKey={tab.id}>
                <div className="row">{renderImages(tab.images)}</div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default Projects;
