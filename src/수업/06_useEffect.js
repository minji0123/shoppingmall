import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

/*
컴포넌트는

1. 생성이 될 수도 있고 (전문용어로 mount)
2. 재렌더링이 될 수도 있고 (전문용어로 update)
3. 삭제가 될 수도 있습니다. (전문용어로 unmount)

각 사이클에 갈고리 + 코드 를 달아놔서
원하는 사이클에 코드를 실행시킬 수 있다.

*/

// 구버전 갈고리 다는 법 (생성자 만드는거랑 비슷함) 
// class Detail2 extends React.Component{
//   componentDidMount(){
//     // 컴포넌트 생성 시 여기 코드 실행 (mount)
//   }
//   componentDidUpdate(){
//     // 컴포넌트 다시 로드 시 여기 코드 실행 (update)
//   }
//   componentWillUnmount(){
//     // 컴포넌트 필요없어졌을 때 여기 코드 실행 (unmount)
//   }
// }



function DetailPage(props){
  // 신버전 갈고리 다는 법
  useEffect(() => { // side Effect: 함수의 핵심기능과 상관없는 부가기능
    // 컴포넌트 처음 실행 + 업데이트 될 때 여기 코드 실행
    // html 랜더링이 다 되고 나서 실행이 되는 애임
    // 여기에 넣으면 좋은 코드 종류
    // 1. for 문 백만번 돌아야 되는 코드
    // 2. 서버에서 데이터 가져오는 작업
    // 3. 타이머 장착
    console.log('안녕');
    let timer = setTimeout(() => {setAlert(false)},2000);
   
    return() => {
        // useEffect 동작 전에 실행되는 코드는 여기 작성
        // clean up function 이라고도 불림
        // unmount 시 실행됨
        // ex) 기존 타이머는 제거해주세요, 배열 비워주세요, 기존 데이터요청은 제거ㄱ
        clearTimeout(timer);

    }

  },[])
  // []: useEffect 실행조건을 넣을 수 있음
  // 그래서 [] 를 넣어주면 mount 할 때만 실행하고, update 시에는 실행이안됨


  // useEffect(() => { 
  //   // moutn, update 시 실행
  //   return() => {
  //       // unmount 시 실행
  //   }
  // },[// 조건 넣으면 mount 할 때만 실행])



  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);

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


    return(
      <>
        <div className="container">
          {count}
        <button onClick={()=>{ setCount(count+1) }}>버튼</button>

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
      </>
    )
  }

  export default DetailPage;