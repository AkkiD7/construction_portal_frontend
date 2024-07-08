import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios"; // Import axios
import "./blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    AOS.init({ duration: 500 });

    fetchBlogs();
  }, []);

  const fetchBlogs =  () => {
     axios.get("https://construction-portal-backend.onrender.com/api/blogs")
     .then((response) =>{
      const updatedBlogs = response.data.map((blog) => ({
        ...blog,
        image: `https://construction-portal-backend.onrender.com/${blog.image}`,
     }));
      setBlogs(updatedBlogs);
    }).catch ((error) => {
      console.error("Error fetching blogs:", error);
    });
  };


  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="recent-blogs" style={{ paddingTop: "50px" }}>
        <Container className="d-flex flex-column align-items-center my-5">
          <h1 className="mb-4 text-center" style={{ fontWeight: "700" }}>
            <span style={{ color: "#F5BF23" }}>RECENT</span> BLOGS
          </h1>
          <Row className="w-100">
            {currentBlogs.map((blog, index) => (
              <Col
                md={4}
                key={index}
                className="mb-4 d-flex"
                data-aos={
                  index % 3 === 0
                    ? "fade-right"
                    : index % 3 === 1
                    ? "fade-up"
                    : "fade-left"
                }
              >
                <Card className="flex-fill">
                  <div className="geeks">
                    <Card.Img
                      variant="top"
                      src={blog.image}
                      alt="Blog Image"
                      style={{ transition: "0.5s all ease-in-out" }}
                      className="blog-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>by {blog.author}</Card.Text>
                    <Button className="blogs-buttons">
                      Read More <span>&#8594;</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="pagination-container mt-4">
            <Pagination>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageClick(pageNumber + 1)}
                ></Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Blogs;
