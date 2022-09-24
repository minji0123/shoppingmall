/* eslint-disable */
import logo from './logo.svg';
import {useState} from "react"
import {Routes,Route,Link} from 'react-router-dom'

import {Button,Navbar,Container, Nav} from 'react-bootstrap';
import './App.css';
import data from '../data.js';


function App() {
  // -----------------------------------
  // 페이지 나누는 법
  // 1. 컴포넌트 만들어서 상세페이지 디자인
  // 2. 누가 /detail 접속하면 그 컴포넌트 보여주면 됨
  // 이거를 직접 하지 않고 react-router-dom 쓰면 됨 (라우팅임)
    // 터미널에 npm install react-router-dom@6 -> index.js 에서 <BrowserRouter>  
    // import {Routes,Route,Link} from 'react-router-dom'
  // -----------------------------------

  let [shoes] = useState(data)

  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼은 Link */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
      {/* 라우터로 페이지 나누는 법 
        <Route path="/경로" element={<div>디자인</div>}/>
      */}
      <Routes>
        <Route path="/" element={<div>
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
        </div>}/>
        <Route path="/detail" element={<DetailPage/>}/>
      </Routes>



      



    </div>
  );
}

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

function DetailPage(){
  return(
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">상품명</h4>
            <p>상품설명</p>
            <p>120000원</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div> 
    </>
  )
}

export default App;
