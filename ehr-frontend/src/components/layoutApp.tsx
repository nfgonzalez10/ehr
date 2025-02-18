import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router";
import { useAuth } from "../context/authContext";

export const Layout: React.FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">EHR manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/configuration">Configuration</Nav.Link>
              <Nav.Link href="/hospitals">Hospitals</Nav.Link>
              <Nav.Link href="/test">Test Mapper</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="/login" onClick={() => logout()}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <main className="min-vh-100">
          <Outlet />
        </main>
      </Container>

      <footer className="bg-dark text-light mt-5 py-3 position-sticky bottom-0">
        <Container>
          <p className="text-center mb-0">
            &copy; 2025 Nicolas Gonzalez. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
};
