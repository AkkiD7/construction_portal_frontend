import "./contact.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/send/mail",
        {
          name,
          email,
          subject,
          message,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="contact-us container">
      <h1 className="contact-heading" data-aos="fade-up">
        <span style={{ color: "#F5BF23" }}>CONTACT</span> US
      </h1>
      <div className="contact-row">
        <div className="contact-info address" data-aos="fade-up">
          <div className="icon">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="info-title">Address</div>
          <div className="info-details">
            College Rd, D'souza Colony, Nashik.
          </div>
        </div>
        <div className="contact-info small" data-aos="fade-up">
          <div className="icon">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className="info-title">Call Us</div>
          <div className="info-details">+91 7875510101</div>
        </div>
        <div className="contact-info small" data-aos="fade-up">
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="info-title">Email Us</div>
          <div className="info-details">cavesstudio@gmail.com</div>
        </div>
      </div>
      <div className="contact-row">
        <div className="map" data-aos="fade-right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.151739091353!2d73.7711346747567!3d20.002145222246853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba051a7df37%3A0xf0791343bd3f1930!2sCAVES%20STUDIO%20ARCHITECTS!5e0!3m2!1sen!2sin!4v1718965704982!5m2!1sen!2sin"
            width="560"
            height="340"
            allowFullScreen=""
            loading="lazy"
            title="Title for Map content"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="form-container" data-aos="fade-left">
          <form className="contact-form" onSubmit={sendMail}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group full-width">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
