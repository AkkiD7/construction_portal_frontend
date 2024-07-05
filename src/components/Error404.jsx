import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

const Error404 = ({ errorCode, errorMessage }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="error-page d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh", backgroundColor: "black", color: "yellow" }}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        <h1 className="display-1" style={{ fontSize: "5rem" }}>
          {errorCode}
        </h1>
        <p className="lead">{errorMessage}</p>
        <h1 style={{ color: "white", marginBottom: "2rem" }}>
          Oops, we can't seem to find the page you're looking for.
        </h1>
        <Button
          href="/"
          variant="warning"
          className="mt-4"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Error404;
