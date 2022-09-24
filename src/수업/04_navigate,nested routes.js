/* eslint-disable */
import logo from './logo.svg';
import {useState} from "react"
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom'

import {Button,Navbar,Container, Nav} from 'react-bootstrap';
import './App.css';
import data from '../data.js';
import DetailPage from '../routes/DetailPage.js';


function App() {

  let [shoes] = useState(data);
  // ------------------------
  // useNavigate(): 페이지 이동 도와줌
  // ------------------------
  let navigate = useNavigate();
  /**
   * onClick={() => {navigate('/')}} 이렇게 사용하면됨
   * onClick={() => {navigate(1)}}  앞으로 한 페이지
   * onClick={() => {navigate(-1)}}  뒤로 한 페이지
   */
  


  return (
    <div className="App">


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼은 Link */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
      {/*
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

        {/* Nested Routes 
        태그 안에 태그 넣는거임
        /about/member 이런거
        --------------------------장점
        1. route 간결해짐
        2. 동시에 두개 보여줄 수 있음
          /about/member 로 접속하면
          about 랑 member element 동시에 보여줌(그냥은 아니고 뭐 해야되긴함)
        --------------------------언제씀
        1. 여러 유사한 페이지 필요할 때 (뭔가 조금씩만 바뀔 때)
        2. 뒤로가기랑 페이지이동 편하게 해야 할 때
          */}
        <Route path="/about" element={<AboutPage/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>위치임</div>}/>
        </Route>

        <Route path="/event" element={<AboutPage/>}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
        </Route>

        <Route path="*" element={<div>없는 페이지에요</div>}/>
      </Routes>


    </div>
  );
}

function Product(props){
  return(
    <>
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${(props.i)+1}.jpg`} width="80%" />
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].content}</p>
      </div>
    </>
  )
}
function AboutPage(){
  return(
    <div>
      <h4>회사정보임</h4>
      {/* Nested Route 에 의해서 동시에 보여줄 태그의 위치 */}
      <Outlet></Outlet>
    </div>
  )
}
function EventPage(){
  return(
    <div>
      <h2>오늘의 이벤트</h2>
      {/* Nested Route 에 의해서 동시에 보여줄 태그의 위치 */}
      <Outlet></Outlet>
    </div>
  )
}
export default App;
