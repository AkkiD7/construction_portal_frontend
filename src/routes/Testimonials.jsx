import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import "./Testimonials.css"; // Import the custom CSS file

export default function Testimonials() {
  const carouselRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    AOS.init({
      offset: 500,
      delay: 0,
      duration: 300,
      easing: "ease",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonials");
        const updatedTestimonials = response.data.map((testimonial) => ({
          ...testimonial,
          image: `http://localhost:5000/${testimonial.image}`,
        }));
        setTestimonials(updatedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();

    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 4000); // Change 4000 to adjust interval (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-testimonials" data-aos="fade-right" style={{paddingTop:"50px"}}>
      <div className="container testimonials">
        <div>
          <h1 className="text-center">
            <span style={{ color: "#F5BF23" }}>CLIENT</span> TESTIMONIALS
          </h1>
        </div>

        <Carousel ref={carouselRef} indicators={false} className="custom-carousel">
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.id} className="custom-carousel-item">
              <div className="testimonial text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-circle shadow-1-strong mb-4"
                  style={{ width: "150px" }}
                />
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <h5 className="mb-3">{testimonial.name}</h5>
                    <p>{testimonial.title}</p>
                    <p className="text-muted">{testimonial.review}</p>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
