import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("https://construction-portal-backend.onrender.com/api/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .put(`https://construction-portal-backend.onrender.com/api/services/${editingId}`, form)
        .then((response) => {
          setServices(
            services.map((service) =>
              service._id === editingId ? response.data : service
            )
          );
          setEditingId(null);
          setForm({ title: "", description: "" });
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating service:", error));
    } else {
      axios
        .post("https://construction-portal-backend.onrender.com/api/services", form)
        .then((response) => {
          setServices([...services, response.data]);
          setForm({ title: "", description: "" });
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding service:", error));
    }
  };

  const handleEdit = (service) => {
    setForm(service);
    setEditingId(service._id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://construction-portal-backend.onrender.com/api/services/${id}`)
      .then(() => {
        setServices(services.filter((service) => service._id !== id));
      })
      .catch((error) => console.error("Error deleting service:", error));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingId(null);
    setForm({ title: "", description: "" });
  };

  return (
    <div>
      <h1>Manage Services</h1>

      <table
        style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(service)}
                  style={{ margin: "5px 0px" }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(service._id)}
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
          setForm({ title: "", description: "" });
          setShowModal(true);
        }}
      >
        Add Service
      </Button>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Service" : "Add Service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
                {editingId ? "Update" : "Add"} Service
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
