import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    title: "",
    review: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((response) => {
        const updatedTestimonials = response.data.map((testimonial) => ({
          ...testimonial,
          image: `http://localhost:5000/${testimonial.image}`,
        }));
        setTestimonials(updatedTestimonials);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
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
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("review", form.review);
    formData.append("image", selectedFile);

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/testimonials/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedTestimonials = testimonials.map((testimonial) =>
            testimonial._id === editingId
              ? {
                  ...response.data,
                  image: `http://localhost:5000/${response.data.image}`,
                }
              : testimonial
          );
          setTestimonials(updatedTestimonials);
          setEditingId(null);
          setForm({ image: "", name: "", title: "", review: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating testimonial:", error));
    } else {
      axios
        .post("http://localhost:5000/api/testimonials", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedTestimonials = [
            ...testimonials,
            {
              ...response.data,
              image: `http://localhost:5000/${response.data.image}`,
            },
          ];
          setTestimonials(updatedTestimonials);
          setForm({ image: "", name: "", title: "", review: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding testimonial:", error));
    }
  };

  const handleEdit = (testimonial) => {
    setForm(testimonial);
    setEditingId(testimonial._id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/testimonials/${id}`)
      .then(() => {
        setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
      })
      .catch((error) => console.error("Error deleting testimonial:", error));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingId(null);
    setForm({ image: "", name: "", title: "", review: "" });
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>Manage Testimonials</h1>

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Title</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>
                <img src={testimonial.image} alt="Testimonial Image" style={{ width: "100px", height: "auto" }} />
              </td>
              <td>{testimonial.name}</td>
              <td>{testimonial.title}</td>
              <td>{testimonial.review}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(testimonial)} style={{ margin: "5px 0px" }}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(testimonial._id)} style={{ marginBottom: "5px" }}>
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
          setForm({ image: "", name: "", title: "", review: "" });
          setShowModal(true);
        }}
      >
        Add Testimonial
      </Button>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Testimonial" : "Add Testimonial"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} required={!editingId} />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter Name" required />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter Title" required />
            </Form.Group>
            <Form.Group controlId="formReview">
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea" rows={3} name="review" value={form.review} onChange={handleChange} placeholder="Enter Review" required />
            </Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                {editingId ? "Update" : "Add"} Testimonial
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
