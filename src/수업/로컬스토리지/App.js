/* eslint-disable */
import logo from './logo.svg';
import {useEffect, useState} from "react"
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom'

import {Button,Navbar,Container, Nav} from 'react-bootstrap';
import './App.css';
import data from './data.js';
import DetailPage from './routes/DetailPage.js';
import axios from 'axios';
import Cart from './routes/Cart.js'


function App() {

  let [shoes,setShoes] = useState(data);
  let [clickCount,setClickCount] = useState(1);
  let navigate = useNavigate();

  // ------------------------
  // Redux
  // ------------------------
  // Redux 사용하면 컴포넌트들이 props 없이 state 공유 가능
  // 1. store.js 파일생성 
  // 2. index.js 가서 <Provider store = {store}> 해주기
  
  // ------------------------
  // 로컬스토리지
  // ------------------------
  /**
   * 새로고침하면 브라우저는 html css js 파일들을 첨부터 다시 읽는다.
   * 그래서 새로고침하면 모든 state 가 리셋된다.
   * 
   * 이게 싫으면 두 가지 방법이 있움
   * 1. state 데이터를 서버로 보내서 db 에 저장하기
   * 2. localStorage 이용하기
   * ------------------------
   * 크롬개발자 도구> Application 탭
   * [localStorage]
   * - 사이트마다 5MB 정도의 문자 데이터를 저장할 수 있습니다. (으마으마한 양임)
   * - object 자료랑 비슷하게 key/value 형태로 저장합니다.
   * - 유저가 브라우저 청소를 하지 않는 이상 영구적으로 남아있습니다. (껏다 켜도 ㄱㅊ)
   * [SessionStorage]
   * - localStorage랑 똑같은데 
   * - 근데 브라우저 끄면 삭제됨
   * ------------------------
   * 편법을 쓰면 Reference type 도 저장 가능!
   * Reference -> json 으로 바꾸면 됨
   */
  // let obj = {name : 'kim'};
  // JSON.stringify(obj); // <--- json 으로 바꿈!
  // localStorage.setItem('data',JSON.stringify(obj));

  // let 꺼낸거 = localStorage.getItem('data');
  // console.log(JSON.parse(꺼낸거).name);



/**
 * 숙제
 * 상세페이지에서 봤던 상품의 번호들을 localStorage 에 저장하기
 * {watched : []}
 * - 중복번호 막기 (set)
 * - 
 */
  useEffect(()=>{
    if(localStorage.getItem('watched').length <0)
      localStorage.setItem('watched',JSON.stringify([]))

  },[]);

  /**
   * 모든 state 를 localStorage 에 자동저장 시키고 싶으면
   * redux-persist 라이브러리 쓰면 됨
   * Jotal Zustand 도 있긴한데 취업안됨
   */

  
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >ReactShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼은 Link */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={() => {navigate('/Cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      
      {/*
        <Route path="/경로" element={<div>디자인</div>}/>
      */}
      <Routes>
        <Route path="/" element={
        <div>
          <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((a,i)=>{
                    return(
                      // <Modal 작명 = {전송할state} />
                      <Product shoes={shoes} a={a} i={i} key={i} />
                    )
                  })
                }
              </div>
            </div>

            {/* ajx 요청을 위한 버튼 
            버튼을 누르면 서버에서 데이터를 받아온 후, 화면에 뿌려줘야함*/}
            <Button variant="secondary" onClick={() => {
              // ------------------------
              // 데이터 받을 때
              // ------------------------


              // 여기다 로딩중 넣고
              
              axios.get(`https://codingapple1.github.io/shop/data${(clickCount)+1}.json`)
              .then((결과)=>{
                  // 성공했을때 실행
                  console.log(결과.data);

                  // 서버에서 갖고온 데이터를 shoes state 에 추가해주세여
                  let copy = [...shoes, ...결과.data]; // 1. 복사본 만들기 ([] 빠지고 알맹이만 남음 {}{}{} 얘네만)
                  setShoes(copy);

                  // 누른 횟수 저장
                  setClickCount(clickCount+1);
                  

                  // 여기다 로딩중 숨기기

              })
              .catch(() => {
                  // 실패했을때 실행
                  console.log('실패함ㅅㄱ');
                  // 여기다 로딩중 숨기기
                  if(clickCount >3){
                    alert('상품 없다');
                  }

              })

            }}>more</Button>
        </div>
      }/>


        {/* url 파라미터
                      /detail/아무거나 라는 뜻 */}
        <Route path="/detail/:id" element={<DetailPage shoes={shoes}/>}/>


        {/* Redux

        */}
        <Route path="/cart" element={<Cart/>}/>

        {/* Nested Routes 
        태그 안에 태그 넣는거임
        /about/member 이런거
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
  let navigate = useNavigate();

  return(
    <>
      <div className="col-md-4">
        <Nav.Link onClick={() => {navigate(`/detail/${(props.i)}`)}}>
          <img src={`https://codingapple1.github.io/shop/shoes${(props.i)+1}.jpg`} width="80%" />
        </Nav.Link>
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
