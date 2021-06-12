
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright text-center text-xl-left text-muted">
        © {new Date().getFullYear()}{" "}
        <a
          className="font-weight-bold ml-1"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Emergency Code C
            </a>
      </div>
    </footer>
  );
};

export default Footer;
