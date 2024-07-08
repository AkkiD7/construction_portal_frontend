import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminHero() {
  const [heroContent, setHeroContent] = useState({
    heading: "",
    content: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = () => {
    axios
      .get("https://construction-portal-backend.onrender.com/api/hero")
      .then((response) => {
        setHeroContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hero content:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroContent({ ...heroContent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("https://construction-portal-backend.onrender.com/api/hero", heroContent)
      .then(() => {
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating hero content:", error));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1>Manage Hero Section</h1>

      <div style={{ marginTop: "1rem" }}>
        <h3>Heading: {heroContent.heading}</h3>
        <p>Content: {heroContent.content}</p>
      </div>

      <Button
        variant="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => setShowModal(true)}
      >
        Edit Hero Content
      </Button>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hero Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formHeading">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                name="heading"
                value={heroContent.heading}
                onChange={handleChange}
                placeholder="Enter Hero Heading"
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={heroContent.content}
                onChange={handleChange}
                placeholder="Enter Hero Content"
                required
              />
            </Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="primary" type="submit">
                Update Hero Content
              </Button>
              <Button variant="secondary" onClick={toggleModal} style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
