import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from "react-bootstrap";
 
function DetailPage(props){
  // 신버전 갈고리 다는 법
  useEffect(() => {

    let timer = setTimeout(() => {setAlert(false)},2000);
   
    return() => {
        // useEffect 동작 전에 실행되는 코드는 여기 작성
        // ex) 기존 타이머는 제거해주세요, 배열 비워주세요, 기존 데이터요청은 제거ㄱ
        clearTimeout(timer);
    }

  },[])



  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);


  // ------------------------
  // url 파라미터
  // ------------------------
  // 유저가 url 파라미터에 입력한 걸 갖고올 때 사용하는 훅
  let {id} = useParams();


  // 상품 순서를 가나다순으로 정렬하는 버튼을 만들어버렸다고 가정합시다.
  // 그럼 평소엔 /detail/0으로 접속하면 0번째 상품을 보여주니까 White and Black 이 뜰텐데
  // 버튼 누른 후엔 /detail/0으로 접속하면 0번째 상품을 보여주니까 Grey Yordan 이 뜨겠군요.
  // 이처럼 상세페이지가 불규칙해지는 문제는 이렇게 해결합시당
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });

  // ------------------------
  // 탭 ui 만들기
  // ------------------------
  /**
   * 동적 ui 만드는 법 복기
   * 1. ui 디자인 만들어놓고
   * 2. state 만들어놓고
   * 3. state 에 따라서 ui 가 어떻게 보일지 만들어놓기
   */

  function clickBtn(n){
    setTab(n);
  }

    return(
      <>
        <div className="container">
          {/* {count}
        <button onClick={()=>{ setCount(count+1) }}>버튼</button> */}

        {
          alert === true?
          <div className="alert alert-warning sale">
            2초이내 구매 시 할인 
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
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
        </div> 

        <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={() => {clickBtn(0)}} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => {clickBtn(1)}} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => {clickBtn(2)}} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>

        <TabContent tab={tab}/>
      </>
    )
  }

  function TabContent(props){
    if (props.tab === 0){
      return <div>내용0</div>
    }
    if (props.tab === 1){
      return <div>내용1</div>
    }
    if (props.tab === 2){
      return <div>내용2</div>
    }
  }
// 팁1
// 항목 하나만 받아올 수 있다.
// function TabContent({tab, abc, sdf}){
//   if (tab === 0){
//     return <div>내용0</div>
//   }
// 팁2
// array 에다가 넣어놓을 수도 있음
// function TabContent(props){
//   return [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][props.탭]
// }
  export default DetailPage;