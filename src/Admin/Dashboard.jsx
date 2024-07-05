import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = ({ setIsAdminLoggedIn }) => {
  const [selectedNavItem, setSelectedNavItem] = useState("services");
  const [adminEmail, setAdminEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/admin-email",
          { withCredentials: true }
        );
        setAdminEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching admin name:", error);
      }
    };
    fetchAdminEmail();
  }, []);

  const handleNavItemSelect = (item) => {
    setSelectedNavItem(item);
  };

  const handleAdminClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        withCredentials: true,
      });
      setIsAdminLoggedIn(false);
      navigate("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleChangePassword = () => {
    console.log("Change Password");
  };

  return (
    <Container fluid className="admin-dashboard">
      <Row>
        <Col md={3} className="sidebar">
          <h2 className="sidebar-header">Admin Dashboard</h2>
          <Dropdown show={showDropdown} onClick={handleAdminClick}>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              {adminEmail}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="dropdown-item-custom"
                onClick={handleLogout}
              >
                Logout
              </Dropdown.Item>
              <Dropdown.Item
                className="dropdown-item-custom"
                onClick={handleChangePassword}
              >
                Change Password
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Nav className="flex-column">
            <Nav.Link
              className={selectedNavItem === "hero" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/hero"
              onClick={() => handleNavItemSelect("hero")}
            >
              Hero
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "aboutus" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/aboutus"
              onClick={() => handleNavItemSelect("aboutus")}
            >
              About-Us
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "constructions" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/constructions"
              onClick={() => handleNavItemSelect("constructions")}
            >
              Constructions
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "services" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/services"
              onClick={() => handleNavItemSelect("services")}
            >
              Services
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "blogs" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/blogs"
              onClick={() => handleNavItemSelect("blogs")}
            >
              Blogs
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "projects" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/projects"
              onClick={() => handleNavItemSelect("projects")}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              className={selectedNavItem === "testimonials" ? "active" : ""}
              as={Link}
              to="/admin/dashboard/testimonials"
              onClick={() => handleNavItemSelect("testimonials")}
            >
              Testimonials
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9} className="content">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
