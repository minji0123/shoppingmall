/* eslint-disable */
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {Nav} from "react-bootstrap";
import '../App.css';
// import { changeName } from './../store/userSlice.js'// 3. 만든 함수 import 해서 사용
import { changeItem, } from './../store.js'// 3. 만든 함수 import 해서 사용

function DetailPage(props){
  function cartTimer(){
    setAlert(true);
    setTimeout(() => {
      setAlert(false)
    },2000);
  }
  // 신버전 갈고리 다는 법
  useEffect(() => {
    // 탭 state 가 변할 때 end 부착
    // end 를 저기 부착해주세여
    setFade2('end')
   
    return() => {
        // useEffect 동작 전에 실행되는 코드는 여기 작성
        // ex) 기존 타이머는 제거해주세요, 배열 비워주세요, 기존 데이터요청은 제거ㄱ
        setFade2('')
    }

  },[])


  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(false);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('')

  // ------------------------
  // 컴포넌트 전환 애니메이션
  // ------------------------
  // [전환 애니메이션 만들기]
  // 1. 부착하면 애니메이션 나오는 className 하나 만들고
  // 2. 원할 때 부착하면 됨
  // [부착하면 애니메이션 나오는 className 만들기]
  // 1. css 에다가 동작 전 스타일 만들고
  // 2. css 에다가 동작 후 스타일 만들고
  // 3. className 에 transition 속성 추가하기


  // 유저가 url 파라미터에 입력한 걸 갖고올 때 사용하는 훅
  let {id} = useParams();


  // 상품 순서를 가나다순으로 정렬하는 버튼
  // 상세페이지가 불규칙해지는 문제 해결
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });



  // 2. 상세페이지 주문하기 버튼을 누르면 새로운 상품이 state에 추가되는 기능
  let 상품들 = useSelector((state) => {return state.cart})// <- Redux store 가져와줌(object 임)

  let dispatch = useDispatch();// store.js 로 요청 보내주는 함수임

  


  //  * 상세페이지에서 봤던 상품의 번호들을 localStorage 에 저장하기
  useEffect(()=>{
    // 일단 꺼내고 변환해주고 밀어넣은다음에 집어넣는다.
    // 일단 get 하고 parse 해주고 push 해준다음에 set 해준다.


    // 일단 get 하고
    let watched2 = localStorage.getItem('watched');
    // parse 해주고
    watched2 = JSON.parse(watched2);
    // push 해준다음에
    watched2.push(찾은상품.id);
    
    // 근데 중복제거 해주고 싶으니까 set 함수를 사용한다.
    watched2 = new Set(watched2);
    watched2 = Array.from(watched2);

    // set 해준다.
    localStorage.setItem('watched', JSON.stringify(watched2));
  },[]);


  function clickBtn(n){
    setTab(n);
  }

    return(
      <>
        <div className={'container start ' + fade2}>
        {/* <div className="alert alert-warning sale">
          장바구니에 상품이 담겼습니다.
        </div> */}
        {
          alert === true?
          <div className="alert alert-warning sale">
            장바구니에 상품이 담겼습니다. 
          </div>
          : null
        }
          <div className="row">
            <div className="col-md-6">
              <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id)+1}.jpg`} width="100%" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>
              {/* 2. 상세페이지 주문하기 버튼을 누르면 새로운 상품이 state에 추가되는 기능 */}
              <button className="btn btn-danger" onClick={()=>{
                  let param = {
                    id:찾은상품.id,
                    name:찾은상품.title,
                    count:1,
                  }
                  dispatch(changeItem(param));
                  cartTimer();
              }}
              >주문하기</button>

            </div>
          </div>
        </div> 

        <Nav variant="tabs" defaultActiveKey="link0"  >
          <Nav.Item>
            <Nav.Link className="black" onClick={() => {clickBtn(0)}} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="black" onClick={() => {clickBtn(1)}} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="black" onClick={() => {clickBtn(2)}} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tab={tab}/>
      </>
    )
  }

  // automatic batching 기능
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
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab] }
      </div>
    )
  }

  export default DetailPage;