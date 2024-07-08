import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    image: "",
    title: "",
    author: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get("https://construction-portal-backend.onrender.com/api/blogs")
      .then((response) => {
        const updatedBlogs = response.data.map((blog) => ({
          ...blog,
          image: `https://construction-portal-backend.onrender.com/${blog.image}`,
        }));
        setBlogs(updatedBlogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
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
    formData.append("image", selectedFile);
    formData.append("title", form.title);
    formData.append("author", form.author);

    if (editingId) {
      axios
        .put(`https://construction-portal-backend.onrender.com/api/blogs/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedBlogs = blogs.map((blog) =>
            blog._id === editingId
              ? {
                  ...response.data,
                  image: `https://construction-portal-backend.onrender.com/${response.data.image}`,
                }
              : blog
          );
          setBlogs(updatedBlogs);
          setEditingId(null);
          setForm({ image: "", title: "", author: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error updating blog:", error));
    } else {
      axios
        .post("https://construction-portal-backend.onrender.com/api/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const updatedBlogs = [
            ...blogs,
            {
              ...response.data,
              image: `https://construction-portal-backend.onrender.com/${response.data.image}`,
            },
          ];
          setBlogs(updatedBlogs);
          setForm({ image: "", title: "", author: "" });
          setSelectedFile(null);
          setShowModal(false);
        })
        .catch((error) => console.error("Error adding blog:", error));
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingId(blog._id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://construction-portal-backend.onrender.com/api/blogs/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((error) => console.error("Error deleting blog:", error));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setEditingId(null);
    setForm({ image: "", title: "", author: "" });
    setSelectedFile(null);
  };

  return (
    <div>
      <h1>Manage Blogs</h1>

      <table
        style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>
                <img
                  src={blog.image}
                  alt="Blog"
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(blog)}
                  style={{ margin: "5px 0px" }}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(blog._id)}
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
          setForm({ image: "", title: "", author: "" });
          setShowModal(true);
        }}
      >
        Add Blog
      </Button>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Blog" : "Add Blog"}
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
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter Author"
                required
              />
            </Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {editingId ? "Update" : "Add"} Blog
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
