import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Auth0Provider } from "@auth0/auth0-react";


class Footer extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>&copy; Best Books</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
