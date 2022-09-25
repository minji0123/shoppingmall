/* eslint-disable */
import {useEffect, useState} from "react"
import { useDispatch, useSelector } from 'react-redux'
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom'
import {Button,Navbar,Container, Nav,Card} from 'react-bootstrap';

import './App.css';
import DetailPage from './routes/DetailPage.js';
import Notice from './Notice.js';
import axios from 'axios';
import Cart from './routes/Cart.js'
import { useQuery } from '@tanstack/react-query';
// import { getServerData } from './store.js'// 3. 만든 함수 import 해서 사용


function App() {
  let [shoes,setShoes] = useState([]);
  let [storage,setStorage] = useState(JSON.parse(localStorage.getItem('watched')));
  let [clickState,setClickState] = useState(0);
  let [clickCount,setClickCount] = useState(1);
  let navigate = useNavigate();

  // ------------------------
  // Redux
  // ------------------------
  // Redux 사용하면 컴포넌트들이 props 없이 state 공유 가능
  // 1. store.js 파일생성 
  // 2. index.js 가서 <Provider store = {store}> 해주기


  // ------------------------
  // localStorage
  // ------------------------
  /**
   * 상세페이지에서 봤던 상품의 번호들을 localStorage 에 저장하기
   * {watched : []}
   * - 
   */
  useEffect(()=>{
    if(!localStorage.getItem('watched'))
    localStorage.setItem('watched',JSON.stringify([]));

      axios.get(`https://minji0123.github.io/shoppingmall/data/items.json`)
      .then((결과)=>{
          // 성공했을때 실행
          
          // 서버에서 갖고온 데이터를 shoes state 에 추가해주세여
          let copy = [...shoes, ...결과.data]; // 1. 복사본 만들기 ([] 빠지고 알맹이만 남음 {}{}{} 얘네만)
          setShoes(copy);

      })
      .catch(() => {
          // 실패했을때 실행
          console.log('실패함ㅅㄱ');

      })
  },[]);

  useEffect(()=>{
    setStorage(JSON.parse(localStorage.getItem('watched')));
  }, [clickState]);
  
  
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand >TheMinnnnmi</Navbar.Brand>
          <Nav className="me-auto">
            {/* 페이지 이동 버튼은 Link */}
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            {/* <Nav.Link onClick={() => {navigate('/#container')}}>Detail</Nav.Link> */}
            {/* <Nav.Link href="#container">Detail</Nav.Link> */}
            <Nav.Link onClick={() => {navigate('/Cart')}}>Cart</Nav.Link>
            {/* <Nav.Link onClick={() => {navigate('/about')}}>About</Nav.Link> */}
            <Nav.Link href="#notice" >About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


          
      {/*
        <Route path="/경로" element={<div>디자인</div>}/>
      */}
      <Routes>
        <Route path="/" element={
        <div className="container">

          <div className="main-bg"></div>
          <h1 className="one_border pb_50 pt_50">TheMinnnnmi</h1>

          <div className='row'>

            <div className="container mt_200 mb_50 col-md-9 ml_0 pl_0" >
              <div className="row"
                  onClick={() => { setClickState(clickState+1)
                    }}
                    >
                {
                  shoes.map((a,i)=>{
                    return(
                      // <Modal 작명 = {전송할state} />
                      <Product 
                      shoes={shoes} a={a} i={i} key={i} />
                    )
                  })
                }
              </div>

            </div>

            <div className="mt_200 mb_50 col-md-2" >
              <Card>
                <Card.Header>
                  최근 본 상품
                  <Button variant="outline-danger" 
                    className='border_none'
                  onClick={() => {localStorage.setItem('watched',JSON.stringify([]))
                  setClickState(clickState+1)
                }}>x</Button>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p> 
                      {
                        storage.map((a,i) => {
                        return(
                          <Latest storage={storage} a={a} i={i} key={i}  />
                        ) 
                      })
                    }
                    </p>
                  </blockquote>
                </Card.Body>
              </Card>
            </div>

          </div>
          
            {/* ajx 요청을 위한 버튼 
            버튼을 누르면 서버에서 데이터를 받아온 후, 화면에 뿌려줘야함*/}
            <Button variant="secondary" className="mb_200" onClick={() => {

              alert('아직이양...🙄');
              // axios.get(`https://minji0123.github.io/shoppingmall/data/items.json`)
              // .then((결과)=>{
              //     // 성공했을때 실행
              //     // console.log(결과.data);

              //     let limit = [];
          
              //     for(let i = 3;i<결과.data.length;i++){
              //       limit.push(결과.data[i]);
              //     }

              //     // 서버에서 갖고온 데이터를 shoes state 에 추가
              //     let copy = [...shoes, ...limit]; // 1. 복사본 만들기 ([] 빠지고 알맹이만 남음 {}{}{} 얘네만)
              //     setShoes(copy);

              //     // 누른 횟수 저장
              //     setClickCount(clickCount+1);
              // })
              // .catch(() => {
              //     // 실패했을때 실행
              //     console.log('실패함ㅅㄱ');
              //     alert('상품 없다');

              //     if(clickCount >3){
              //       alert('상품 없다');
              //     }

              // })

            }}>more</Button>
            
            <Notice></Notice>
      

        </div>
      }/>


        {/* url 파라미터
                      /detail/아무거나 라는 뜻 */}
        <Route path="/detail/:id" element={<DetailPage shoes={shoes}/>}/>


        {/* Redux */}
        <Route path="/cart" element={<Cart/>}/>

        {/* Nested Routes 
        태그 안에 태그 넣는거임 /about/member 이런거
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

function Latest(props){
  let navigate = useNavigate();
  return(
    <>
    <Nav.Link onClick={() => {navigate(`/detail/${(props.a)}`)}}>
      <img 
          src={`https://minji0123.github.io/shoppingmall/image/image${(props.a)}.jpg`} 
          width="100%" 
          className='mb_50'
      />
    </Nav.Link>

    </>
  )
}

function Product(props){
  let navigate = useNavigate();
  // console.log("HERE! ", props);
  return(
    <>
      <div className="col-md-4 mb_100 main-category">
        <Nav.Link onClick={() => {navigate(`/detail/${(props.i)}`)}}>
          <img src={`https://minji0123.github.io/shoppingmall/image/image${(props.i)}.jpg`} width="80%" />
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
