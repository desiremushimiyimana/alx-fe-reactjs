import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#333",
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    transition: "color 0.3s",
  };

  const hoverStyle = {
    color: "#ffd700",
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li>
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
            onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
            onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
            onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = hoverStyle.color)}
            onMouseLeave={(e) => (e.target.style.color = linkStyle.color)}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
