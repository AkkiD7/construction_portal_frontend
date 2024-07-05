import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const closeNavbarDelayed = () => {
    setTimeout(() => {
      setShowNavbar(false);
    }, 300);
  };

  const Hamburger = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="menu-icon"
      onClick={handleShowNavbar}
    >
      <g id="Menu">
        <line x1="3" y1="12" x2="21" y2="12" stroke="#574c4c" strokeWidth="2" />
        <line x1="3" y1="6" x2="21" y2="6" stroke="#574c4c" strokeWidth="2" />
        <line x1="3" y1="18" x2="21" y2="18" stroke="#574c4c" strokeWidth="2" />
      </g>
    </svg>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <h2>
            <NavLink to="/" style={{ textDecoration: "none", color: "#F5BF23" }}>
              Caves
            </NavLink>
          </h2>
        </div>
        <div className="menu-icon">
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeNavbarDelayed}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutus" onClick={closeNavbarDelayed}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={closeNavbarDelayed}>
                SERVICES
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" onClick={closeNavbarDelayed}>
                PROJECTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" onClick={closeNavbarDelayed}>
                BLOGS
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeNavbarDelayed}>
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
