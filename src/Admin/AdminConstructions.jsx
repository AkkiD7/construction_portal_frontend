import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminConstructions() {
  const [constructions, setConstructions] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchConstructions();
  }, []);

  const fetchConstructions = () => {
    axios
      .get("http://localhost:5000/api/construction")
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", selectedFile);

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/construction/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedConstructions = constructions.map((construction) =>
            construction._id === editingId
              ? {
                  ...response.data,
                  image: `http://localhost:5000/${response.data.image}`,
                }
              : construction
          );
          setConstructions(updatedConstructions);
          setEditingId(null);
          setForm({ id: "", title: "", description: "", image: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating construction:", error));
    } else {
      axios
        .post("http://localhost:5000/api/construction", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedConstructions = [
            ...constructions,
            {
              ...response.data,
              image: `http://localhost:5000/${response.data.image}`,
            },
          ];
          setConstructions(updatedConstructions);
          setForm({ id: "", title: "", description: "", image: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding construction:", error));
    }
  };

  const handleEdit = (construction) => {
    setForm(construction);
    setEditingId(construction._id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/construction/${id}`)
      .then(() => {
        setConstructions(
          constructions.filter((construction) => construction._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting construction:", error));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingId(null);
    setForm({ id: "", title: "", description: "", image: "" });
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>Manage Constructions</h1>

      <table
        style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {constructions.map((construction) => (
            <tr
              key={construction._id}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <td>
                <img
                  src={construction.image}
                  alt="Construction"
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{construction.title}</td>
              <td>{construction.description}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(construction)}
                  style={{ margin: "5px 0px" }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(construction._id)}
                  style={{ marginBottom: "5px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        variant="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setForm({ id: "", title: "", description: "", image: "" });
          setShowModal(true);
        }}
      >
        Add Construction
      </Button>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Construction" : "Add Construction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!editingId}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter Title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter Description"
                required
              />
            </Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {editingId ? "Update" : "Add"} Construction
              </Button>
              <Button variant="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
