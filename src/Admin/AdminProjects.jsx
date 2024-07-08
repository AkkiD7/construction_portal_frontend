import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const AdminProjects = () => {
  const [remodelingImages, setRemodelingImages] = useState([]);
  const [constructionImages, setConstructionImages] = useState([]);
  const [repairsImages, setRepairsImages] = useState([]);
  const [designImages, setDesignImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    fetchImages("remodeling");
    fetchImages("construction");
    fetchImages("repairs");
    fetchImages("design");
  }, []);

  const fetchImages = (category) => {
    axios
      .get(`https://construction-portal-backend.onrender.com/api/projects/images/${category}`)
      .then((response) => {
        const images = response.data.map((image) => ({
          id: image.id,
          src: `https://construction-portal-backend.onrender.com/${image.image}`,
          alt: image.title,
        }));
        switch (category) {
          case "remodeling":
            setRemodelingImages(images);
            break;
          case "construction":
            setConstructionImages(images);
            break;
          case "repairs":
            setRepairsImages(images);
            break;
          case "design":
            setDesignImages(images);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${category} images:`, error);
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const category = selectedCategory.toLowerCase();
      const response = await axios.post(
        `https://construction-portal-backend.onrender.com/api/projects/images/${category}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      fetchImages(selectedCategory);
      setSelectedFile(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const category = selectedCategory.toLowerCase();
      const response = await axios.put(
        `https://construction-portal-backend.onrender.com/api/projects/images/${selectedImageId}/${category}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image updated successfully:", response.data);
      fetchImages(selectedCategory);
      setSelectedFile(null);
      setShowModal(false);
      setIsUpdateMode(false);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleDeleteImage = async (imageId, category) => {
    try {
      const response = await axios.delete(
        `https://construction-portal-backend.onrender.com/api/projects/images/${imageId}/${category}`
      );

      console.log("Image deleted successfully:", response.data);
      fetchImages(category);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const toggleModal = (category, imageId = null) => {
    setSelectedCategory(category);
    setSelectedImageId(imageId);
    setShowModal(!showModal);
    if (imageId) {
      setIsUpdateMode(true);
    } else {
      setIsUpdateMode(false);
    }
  };

  const renderImages = (images, category) => {
    return images.map((image) => (
      <tr key={image.id}>
        <td>
          <img
            src={image.src}
            alt={image.alt}
            style={{ width: "100px", height: "auto", margin: "5px" }}
          />
        </td>
        <td>
          <Button
            variant="warning"
            style={{ margin: "5px 5px 5px 0" }}
            onClick={() => toggleModal(category, image.id)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            style={{ margin: "5px 5px 5px 0" }}
            onClick={() => handleDeleteImage(image.id, category)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Manage Projects</h1>

      <Table bordered>
        <thead>
          <tr>
            <th>Remodeling</th>
            <th>Construction</th>
            <th>Repairs</th>
            <th>Design</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Table striped bordered hover>
                <tbody>
                  {renderImages(remodelingImages, "remodeling")}
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <Button
                        variant="primary"
                        onClick={() => toggleModal("remodeling")}
                      >
                        Add Image
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </td>
            <td>
              <Table striped bordered hover>
                <tbody>
                  {renderImages(constructionImages, "construction")}
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <Button
                        variant="primary"
                        onClick={() => toggleModal("construction")}
                      >
                        Add Image
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </td>
            <td>
              <Table striped bordered hover>
                <tbody>
                  {renderImages(repairsImages, "repairs")}
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <Button
                        variant="primary"
                        onClick={() => toggleModal("repairs")}
                      >
                        Add Image
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </td>
            <td>
              <Table striped bordered hover>
                <tbody>
                  {renderImages(designImages, "design")}
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <Button
                        variant="primary"
                        onClick={() => toggleModal("design")}
                      >
                        Add Image
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdateMode
              ? `Update Image`
              : `Add Image for ${selectedCategory}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!isUpdateMode}
              />
            </Form.Group>
            {isUpdateMode ? (
              <Button variant="primary" onClick={handleUpdateImage}>
                Update Image
              </Button>
            ) : (
              <Button variant="primary" onClick={handleAddImage}>
                Add Image
              </Button>
            )}{" "}
            <Button variant="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProjects;
