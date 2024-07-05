import React, { useState } from "react";

export default function Footer() {
  const [newsletter, setnewsletterValue] = useState("");

  const handleChange = (event) => {
    setnewsletterValue(event.target.value);
  };
  return (
    <>
      <footer className="footer" style={{ position: "relative" }}>
        <section className="footer-section py-4 py-md-5 py-xl-8 border-top border-light">
          <div className="container overflow-hidden">
            <div className="row gy-4 gy-lg-0 justify-content-xl-between">
              <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                <div className="widget">
                  <h4 className="widget-title mb-4 text-light">Get in Touch</h4>
                  <address className="mb-4 text-light">
                    College Rd, D'souza Colony, Nashik, Maharashtra
                  </address>
                  <p className="mb-1">
                    <a
                      className="text-decoration-none text-light"
                      href="tel:+15057922430"
                    >
                      +91 7875510101
                    </a>
                  </p>
                  <p className="mb-0 text-light">
                    <a
                      className="text-decoration-none text-light"
                      href="mailto:cavesstudio@gmail.com"
                    >
                      cavesstudio@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                <div className="widget text-light">
                  <h4 className="widget-title mb-4">Useful Links</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        About
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Contact
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Advertise
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Terms of Service
                      </a>
                    </li>
                    <li className="mb-0 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                <div className="widget text-light">
                  <h4 className="widget-title mb-4">Our Services</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Web Design
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Web Development
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Product Management
                      </a>
                    </li>
                    <li className="mb-2 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Marketing
                      </a>
                    </li>
                    <li className="mb-0 hover-underline-white">
                      <a href="#!" className="text-decoration-none text-light">
                        Graphic Design
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-xl-4">
                <div className="widget text-light">
                  <h4 className="widget-title mb-4">Our Newsletter</h4>
                  <p className="mb-4 text-light">
                    Subscribe to our newsletter to get our news & discounts
                    delivered to you.
                  </p>
                  <form action="#!">
                    <div className="row gy-4">
                      <div className="col-12">
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            id="email-newsletter-addon"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-envelope"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            id="email-newsletter"
                            value={newsletter}
                            placeholder="Email Address"
                            aria-label="email-newsletter"
                            aria-describedby="email-newsletter-addon"
                            required
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn"
                            style={{ backgroundColor: "#F5BF23" }}
                            type="submit"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
