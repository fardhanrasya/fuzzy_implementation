import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">
          🎓 Sistem Penerimaan Beasiswa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto">
            <span className="text-white">Fuzzy Sugeno Method</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}