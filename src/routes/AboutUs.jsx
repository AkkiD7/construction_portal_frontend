import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

export default function AboutUs() {
  const [aboutUsContent, setAboutUsContent] = useState({
    description: "",
    image: "",
  });

  useEffect(() => {
    AOS.init({
      offset: 200,
      delay: 0,
      duration: 500,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    axios
      .get("https://construction-portal-backend.onrender.com/api/about-us")
      .then((response) => {
        setAboutUsContent(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the about us content!",
          error
        );
      });
  }, []);

  return (
    <>
      <div id="about-us" className="MainDiv" style={{ paddingTop: "60px" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <div>
                <h1 style={{ fontWeight: "700" }}>
                  <span style={{ color: "#F5BF23" }}>ABOUT</span> US
                </h1>
                <p>{aboutUsContent.description}</p>
              </div>
            </div>
            <div
              className="col-lg-6 about-us-image-container"
              data-aos="fade-left"
            >
              {aboutUsContent.image && (
                <img
                  src={`https://construction-portal-backend.onrender.com/${aboutUsContent.image}`}
                  alt="About Us"
                  className="img-fluid rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
