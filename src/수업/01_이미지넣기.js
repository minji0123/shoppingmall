/* eslint-disable */
import logo from './logo.svg';
import {Button,Navbar,Container, Nav} from 'react-bootstrap';
import './App.css';
/**
 * 이미지 넣는 법
 * 1. 이미지를 src 에 넣고  경로 넣기 ./bg.png
 * 2. return 에 경로 넣고 상단에 import 하기 import logo from './logo.svg';
 * 3. 이미지를 public 에 넣고 경로 넣기/logo192.png
 * 4. 이미지를 public 에 넣고 [절대]경로 넣기 src={process.env.PUBLIC_URL + '/logo192.png'}
 */
function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
