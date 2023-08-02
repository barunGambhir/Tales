import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <div>
      <Navbar bg="primary" variant="dark" className="justify-content-between px-4 py-2">
        <Navbar.Brand href="/">Tales</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={handleLoginShow}><button type="button" className="btn btn-light"> Login </button></Nav.Link>
        </Nav>
      </Navbar>
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleClose={handleLoginClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
