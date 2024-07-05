import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, { withCredentials: true });
      setIsAdminLoggedIn(true); 
      console.log("Response from server:", response.data);
      toast.success("Login successful. Redirecting to dashboard...");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error submitting login:", error.response ? error.response.data : error);
      toast.error("Wrong credentials");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh", paddingTop: "30px", paddingBottom: "30px" }}
    >
      <ToastContainer />
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <Form
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center mb-4">Admin Login</h2>

          <Form.Group controlId="formBasicEmail" style={{ marginBottom: "20px" }}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{ marginBottom: "20px" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            style={{
              backgroundColor: "#F5BF23",
              borderColor: "#F5BF23",
              width: "100%",
            }}
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AdminLogin;
