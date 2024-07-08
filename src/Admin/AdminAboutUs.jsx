import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Image } from "react-bootstrap";

export default function AdminAboutUs() {
  const [aboutUsContent, setAboutUsContent] = useState({
    description: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAboutUsContent();
  }, []);

  const fetchAboutUsContent = async () => {
    try {
      const response = await axios.get("https://construction-portal-backend.onrender.com/api/about-us");
      setAboutUsContent(response.data);
    } catch (error) {
      console.error("Error fetching About Us content:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "imageFile") {
      setImageFile(e.target.files[0]);
    } else {
      setAboutUsContent({ ...aboutUsContent, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", aboutUsContent.description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put("https://construction-portal-backend.onrender.com/api/about-us", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowModal(false);
      fetchAboutUsContent();
    } catch (error) {
      console.error("Error updating About Us content:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1>Manage About Us Section</h1>
      <div style={{ marginTop: "1rem" }}>
        <h3>Description:</h3>
        <p>{aboutUsContent.description}</p>
        {aboutUsContent.image && (
          <Image
            src={`https://construction-portal-backend.onrender.com/${aboutUsContent.image}`}
            alt="About Us Image"
            rounded
            style={{ height: "100px", width: "auto" }}
          />
        )}
      </div>
      <Button
        variant="primary"
        style={{ marginTop: "1rem" }}
        onClick={toggleModal}
      >
        Edit About Us Content
      </Button>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit About Us Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                value={aboutUsContent.description}
                onChange={handleChange}
                placeholder="Enter About Us Description"
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="primary" type="submit">
                Update About Us Content
              </Button>
              <Button
                variant="secondary"
                onClick={toggleModal}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
