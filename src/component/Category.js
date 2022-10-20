/* eslint-disable */
import {Navbar,Container, Nav} from 'react-bootstrap';


import '../App.css';


function Category() {

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Men</Nav.Link>
            <Nav.Link href="#features">Women</Nav.Link>
            <Nav.Link href="#pricing">Kids</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>

  );
}


export default Category;
