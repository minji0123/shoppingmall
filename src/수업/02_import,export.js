/* eslint-disable */
import logo from './logo.svg';
import {useState} from "react"
import {Button,Navbar,Container, Nav} from 'react-bootstrap';
import './App.css';
import data from '../data.js';

function App() {

  let [shoes] = useState(data)

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

          {
            shoes.map((a,i)=>{
              return(
                // <Modal 작명 = {전송할state} />
                <Product shoes={shoes} a={a} i={i} />
              )
                
            })
          }

        </div>
      </div>
    </div>
  );
}

// Component 만드는 법
// 1. function 만들고 (바깥에 만들어야됨)
// 2. return() 안에 html 만들고
// 3. 원하는 곳에 <></> 쓰기

/*
부모 -> 자식 state 전송하는 법 (자식->부모, 자식->자식 안됨)
1. <자식컴포넌트 작명={state이름}>
2. props 파라미터 등록 후 props.작명 사용
*/

function Product(props){
  return(
    <>
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${(props.i)+1}.jpg`} width="80%" />
        {/* <img src=`https://codingapple1.github.io/shop/shoes${}.jpg` width="80%" /> */}
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].content}</p>
      </div>
    </>
  )
}

export default App;
