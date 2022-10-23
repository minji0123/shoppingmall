/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Nav,Card,Button } from "react-bootstrap";
import '../App.css';
import axios from 'axios';

import Notice from "../component/Notice";
import { changeItem } from './../store.js'

function DetailPage(props){

  let [alert, setAlert] = useState(false);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  let [찾은상품, 찾은상품설정] = useState([]);

  // 유저가 url 파라미터에 입력한 걸 갖고올 때 사용하는 훅
  let {id} = useParams();

  // ------------------------
  // 장바구니 redux
  // ------------------------
  // 2. 상세페이지 주문하기 버튼을 누르면 새로운 상품이 state에 추가되는 기능
  let 상품들 = useSelector((state) => {return state.cart})// <- Redux store 가져와줌(object 임)
  let dispatch = useDispatch();// store.js 로 요청 보내주는 함수임

  // ------------------------
  // 장바구니 alert 창
  // ------------------------
  function cartTimer(){
    setAlert(true);
    setTimeout(() => {
      setAlert(false)
    },2000);
  }


  useEffect(()=>{
  // ------------------------
  // 데이터 받아오는 useEffect
  // ------------------------
    axios.get(`https://minji0123.github.io/shoppingmall/data/items.json`)

    .then((결과)=>{
      // 성공했을때 실행
      
      let limit = [];
      limit.push(...결과.data);

      찾은상품설정(limit[id]);

    // ------------------------
    // 로컬스토리지 저장하기
    // ------------------------

    // 일단 get 하고
    let watched2 = localStorage.getItem('watched');
    // parse 해주고
    watched2 = JSON.parse(watched2);
    // push 해준다음에
    watched2.push(id);
    
    // 근데 중복제거 해주고 싶으니까 set 함수를 사용한다.
    watched2 = new Set(watched2);
    watched2 = Array.from(watched2);

    // set 해준다.
    localStorage.setItem('watched', JSON.stringify(watched2));

    })
    .catch(() => {
        // 실패했을때 실행
      console.log('실패함ㅅㄱ');
    });

  // --------------------------------------------------------------------------------------------------------------------

    // 탭 state 가 변할 때 end 부착
    // end 를 저기 부착해주세여
    setFade2('end')

    return() => {
      // useEffect 동작 전에 실행되는 코드는 여기 작성
      // ex) 기존 타이머는 제거해주세요, 배열 비워주세요, 기존 데이터요청은 제거ㄱ
      setFade2('')
    }
    
  },[]);

  // ------------------------
  // 하단 버튼 변경하기
  // ------------------------
  function clickBtn(n){
    setTab(n);
  }

    return(
      <>
        <div className={'container start ' + fade2}>

        

          <div className="row  mt_100 mb_100">
            <div className="col-md-6">
              <img src={`https://minji0123.github.io/shoppingmall/image/image${id}.jpg`} 
                    width="100%" 
                    />
            </div>
            <div className="col-md-6">
              <Card>
                <Card.Header>상품정보</Card.Header>
                <Card.Body>
                  <Card.Title>{찾은상품.name}</Card.Title>
                  <Card.Text>{찾은상품.content}</Card.Text>
                  <Card.Text>{찾은상품.price} 원</Card.Text>
                  <hr/>
                  {찾은상품.Char}
                  <hr/>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. Nullam aliquam,
                  elit eu maximus fringilla, arcu lectus gravida dolor, et maximus diam enim at nisl. Sed in justo dui. Maecenas malesuada sit amet urna at euismod. Donec sed nulla ex. Morbi luctus, Donec sed nulla ex. Morbi luctus, 
                  </p>
                  <button className="btn btn-danger" onClick={()=>{
                    let param = {
                      id:찾은상품.id,
                      name:찾은상품.name,
                      count:1,
                      price:찾은상품.price,
                    }
                    dispatch(changeItem(param));
                    cartTimer();
                      // let carted2 = localStorage.getItem('carted');
                      // carted2 = JSON.parse(carted2);
                      // carted2.push(id);
                      
                      // carted2 = new Set(carted2);
                      // carted2 = Array.from(carted2);

                      // localStorage.setItem('carted', JSON.stringify(carted2));
                }}
                >주문하기</button>


                </Card.Body>
              </Card>
            </div>
         
            {
              alert === true?
              <div className="alert alert-warning sale mt_50">
                장바구니에 상품이 담겼습니다😊
              </div>
              : null
            }
          </div>
        </div> 

        <div className="container">
          <Nav variant="tabs" defaultActiveKey="link0"  >
            <Nav.Item>
              <Nav.Link className="black" onClick={() => {clickBtn(0)}} eventKey="link0">상세정보</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="black" onClick={() => {clickBtn(1)}} eventKey="link1">구매안내</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="black" onClick={() => {clickBtn(2)}} eventKey="link2">상품문의</Nav.Link>
            </Nav.Item>
          </Nav>

          <TabContent tab={tab}/>
          <Notice></Notice>
        </div>
      </>
    )
  }

  // automatic batching
  // state 변경함수들이 연달아서 여러개 처리되어야한다면 
  // state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다. 
  // 그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
  // 찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다.
 
  function TabContent(props){
    // 탭 state 가 변할 때 end 부착
    let [fade, setFade] =useState('')
    useEffect (() => {
        setTimeout(() => {
          // end 를 저기 부착해주세여
        setFade('end')
        },200);
        
        return() => {
          //useEffect 실행하기 전에 실행되는 곳
          clearTimeout()
          setFade('')
        }
    },[props.tab])
    return (
      <div className={`start ${fade}`}>
        { [
        <div className="mt_100 mb_100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
              Nullam aliquam, elit eu maximus fringilla, arcu lectus gravida dolor, et maximus diam enim at nisl. Sed in justo dui. Maecenas malesuada 
              sit amet urna at euismod. Donec sed nulla ex. Morbi luctus, lacus sed egestas consequat, lectus tortor vestibulum ante, eget aliquam neque 
              elit quis leo. Vivamus pulvinar quis magna at volutpat.
            </p>
            <p>
              Curabitur finibus lectus sit amet augue venenatis, eget pulvinar purus tempus. Aliquam 
              gravida magna et posuere feugiat. Sed cursus neque ut auctor consectetur. Duis sed velit sed augue feugiat bibendum. 
              Quisque eu elit vitae diam scelerisque tincidunt vel eget tortor. Vestibulum mollis pharetra turpis, a egestas urna feugiat at. 
              Cras malesuada a mi id dapibus. In sagittis augue quis ligula vestibulum consectetur. Donec ultricies porttitor mauris semper 
              placerat. Donec gravida est in placerat iaculis. Proin tristique ac diam vel posuere. Curabitur vitae maximus arcu. Ut vitae hendrerit 
              libero. Curabitur dictum malesuada euismod. Nam a neque quis sem fringilla auctor a eget urna.
            </p>
            <p>
              Cras ullamcorper tristique nulla pretium ornare. Ut aliquet dolor et libero ultrices mollis. Donec scelerisque ultricies ligula, in egestas sem. 
              Praesent viverra turpis at turpis egestas eleifend. Aliquam imperdiet purus vel volutpat mollis. Proin ornare elementum purus, fringilla mollis 
              purus rutrum aliquam. Donec vehicula dignissim libero a pretium. Duis eu libero malesuada, dapibus ante ac, blandit augue. Ut at nisi eu augue congue porttitor. Nullam purus tortor, dapibus nec tempus eu, consequat in diam. Cras porttitor rhoncus imperdiet. Suspendisse potenti. Vestibulum nisi mauris, posuere ac luctus non, sagittis id magna. Donec sit amet tortor imperdiet, fringilla orci in, porttitor odio.
            </p>
            <p>
              Vestibulum laoreet a dui eu hendrerit. Praesent nec turpis urna. Pellentesque pellentesque libero at ante tempor, in luctus dui molestie. Duis ut 
              tellus at nibh volutpat euismod. Duis accumsan commodo tincidunt. Nulla vel quam ex. Morbi elementum, ante quis egestas consequat, ante lacus eleifend urna, sed ultrices ligula augue sit amet est. Integer varius mi sed dapibus rhoncus. Quisque massa sem, aliquam at eros ultricies, cursus sagittis nunc. Aliquam semper risus nec nisi luctus placerat.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras cursus, quam vel tempus congue, tellus est porta mi, 
              ac ultrices nulla ligula at odio. Ut at nunc at quam vestibulum suscipit id eu nibh. Nunc lobortis nulla leo, sit amet ultrices mi eleifend et. 
              Vestibulum mi augue, egestas rhoncus mi non, consequat viverra mi. Praesent ex erat, hendrerit eget dui ac, rhoncus eleifend lacus. Phasellus suscipit 
              sit amet mi a egestas. Sed quis velit vel erat malesuada sollicitudin. Aenean id purus ligula. Fusce nec risus nunc. Maecenas tempus, nunc a commodo laoreet, 
              diam dolor convallis nisl, eget scelerisque ex arcu ac massa. Donec in placerat lacus. Quisque nisl erat, tempor nec imperdiet quis, varius non est. Nullam a 
              justo eget lectus pellentesque molestie at eu eros.
            </p>
        </div>,
        
        <div className="mt_100 mb_100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
              Nullam aliquam, elit eu maximus fringilla, arcu lectus gravida dolor, et maximus diam enim at nisl. Sed in justo dui. Maecenas malesuada 
              sit amet urna at euismod. Donec sed nulla ex. Morbi luctus, lacus sed egestas consequat, lectus tortor vestibulum ante, eget aliquam neque 
              elit quis leo. Vivamus pulvinar quis magna at volutpat.
            </p>
            <p>
              Curabitur finibus lectus sit amet augue venenatis, eget pulvinar purus tempus. Aliquam 
              gravida magna et posuere feugiat. Sed cursus neque ut auctor consectetur. Duis sed velit sed augue feugiat bibendum. 
              Quisque eu elit vitae diam scelerisque tincidunt vel eget tortor. Vestibulum mollis pharetra turpis, a egestas urna feugiat at. 
              Cras malesuada a mi id dapibus. In sagittis augue quis ligula vestibulum consectetur. Donec ultricies porttitor mauris semper 
              placerat. Donec gravida est in placerat iaculis. Proin tristique ac diam vel posuere. Curabitur vitae maximus arcu. Ut vitae hendrerit 
              libero. Curabitur dictum malesuada euismod. Nam a neque quis sem fringilla auctor a eget urna.
            </p>
            <p>
              Cras ullamcorper tristique nulla pretium ornare. Ut aliquet dolor et libero ultrices mollis. Donec scelerisque ultricies ligula, in egestas sem. 
              Praesent viverra turpis at turpis egestas eleifend. Aliquam imperdiet purus vel volutpat mollis. Proin ornare elementum purus, fringilla mollis 
              purus rutrum aliquam. Donec vehicula dignissim libero a pretium. Duis eu libero malesuada, dapibus ante ac, blandit augue. Ut at nisi eu augue congue porttitor. Nullam purus tortor, dapibus nec tempus eu, consequat in diam. Cras porttitor rhoncus imperdiet. Suspendisse potenti. Vestibulum nisi mauris, posuere ac luctus non, sagittis id magna. Donec sit amet tortor imperdiet, fringilla orci in, porttitor odio.
            </p>
            <p>
              Vestibulum laoreet a dui eu hendrerit. Praesent nec turpis urna. Pellentesque pellentesque libero at ante tempor, in luctus dui molestie. Duis ut 
              tellus at nibh volutpat euismod. Duis accumsan commodo tincidunt. Nulla vel quam ex. Morbi elementum, ante quis egestas consequat, ante lacus eleifend urna, sed ultrices ligula augue sit amet est. Integer varius mi sed dapibus rhoncus. Quisque massa sem, aliquam at eros ultricies, cursus sagittis nunc. Aliquam semper risus nec nisi luctus placerat.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras cursus, quam vel tempus congue, tellus est porta mi, 
              ac ultrices nulla ligula at odio. Ut at nunc at quam vestibulum suscipit id eu nibh. Nunc lobortis nulla leo, sit amet ultrices mi eleifend et. 
              Vestibulum mi augue, egestas rhoncus mi non, consequat viverra mi. Praesent ex erat, hendrerit eget dui ac, rhoncus eleifend lacus. Phasellus suscipit 
              sit amet mi a egestas. Sed quis velit vel erat malesuada sollicitudin. Aenean id purus ligula. Fusce nec risus nunc. Maecenas tempus, nunc a commodo laoreet, 
              diam dolor convallis nisl, eget scelerisque ex arcu ac massa. Donec in placerat lacus. Quisque nisl erat, tempor nec imperdiet quis, varius non est. Nullam a 
              justo eget lectus pellentesque molestie at eu eros.
            </p>
        </div>, 
        <div className="mt_100 mb_100">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec sollicitudin nisi. Cras sagittis magna nec ex consequat bibendum. 
              Nullam aliquam, elit eu maximus fringilla, arcu lectus gravida dolor, et maximus diam enim at nisl. Sed in justo dui. Maecenas malesuada 
              sit amet urna at euismod. Donec sed nulla ex. Morbi luctus, lacus sed egestas consequat, lectus tortor vestibulum ante, eget aliquam neque 
              elit quis leo. Vivamus pulvinar quis magna at volutpat.
            </p>
            <p>
              Curabitur finibus lectus sit amet augue venenatis, eget pulvinar purus tempus. Aliquam 
              gravida magna et posuere feugiat. Sed cursus neque ut auctor consectetur. Duis sed velit sed augue feugiat bibendum. 
              Quisque eu elit vitae diam scelerisque tincidunt vel eget tortor. Vestibulum mollis pharetra turpis, a egestas urna feugiat at. 
              Cras malesuada a mi id dapibus. In sagittis augue quis ligula vestibulum consectetur. Donec ultricies porttitor mauris semper 
              placerat. Donec gravida est in placerat iaculis. Proin tristique ac diam vel posuere. Curabitur vitae maximus arcu. Ut vitae hendrerit 
              libero. Curabitur dictum malesuada euismod. Nam a neque quis sem fringilla auctor a eget urna.
            </p>
            <p>
              Cras ullamcorper tristique nulla pretium ornare. Ut aliquet dolor et libero ultrices mollis. Donec scelerisque ultricies ligula, in egestas sem. 
              Praesent viverra turpis at turpis egestas eleifend. Aliquam imperdiet purus vel volutpat mollis. Proin ornare elementum purus, fringilla mollis 
              purus rutrum aliquam. Donec vehicula dignissim libero a pretium. Duis eu libero malesuada, dapibus ante ac, blandit augue. Ut at nisi eu augue congue porttitor. Nullam purus tortor, dapibus nec tempus eu, consequat in diam. Cras porttitor rhoncus imperdiet. Suspendisse potenti. Vestibulum nisi mauris, posuere ac luctus non, sagittis id magna. Donec sit amet tortor imperdiet, fringilla orci in, porttitor odio.
            </p>
            <p>
              Vestibulum laoreet a dui eu hendrerit. Praesent nec turpis urna. Pellentesque pellentesque libero at ante tempor, in luctus dui molestie. Duis ut 
              tellus at nibh volutpat euismod. Duis accumsan commodo tincidunt. Nulla vel quam ex. Morbi elementum, ante quis egestas consequat, ante lacus eleifend urna, sed ultrices ligula augue sit amet est. Integer varius mi sed dapibus rhoncus. Quisque massa sem, aliquam at eros ultricies, cursus sagittis nunc. Aliquam semper risus nec nisi luctus placerat.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras cursus, quam vel tempus congue, tellus est porta mi, 
              ac ultrices nulla ligula at odio. Ut at nunc at quam vestibulum suscipit id eu nibh. Nunc lobortis nulla leo, sit amet ultrices mi eleifend et. 
              Vestibulum mi augue, egestas rhoncus mi non, consequat viverra mi. Praesent ex erat, hendrerit eget dui ac, rhoncus eleifend lacus. Phasellus suscipit 
              sit amet mi a egestas. Sed quis velit vel erat malesuada sollicitudin. Aenean id purus ligula. Fusce nec risus nunc. Maecenas tempus, nunc a commodo laoreet, 
              diam dolor convallis nisl, eget scelerisque ex arcu ac massa. Donec in placerat lacus. Quisque nisl erat, tempor nec imperdiet quis, varius non est. Nullam a 
              justo eget lectus pellentesque molestie at eu eros.
            </p>
        </div>][props.tab] }
      </div>
    )
  }

  export default DetailPage;