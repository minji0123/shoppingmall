import { useParams } from "react-router-dom";
import styled from 'styled-components'

// styled-components 로 만든 이쁜 css
let Box = styled.div`
  padding : 20px;
  color : grey
`;
// 비슷한 오렌지색 버튼이 필요하면 props 문법 사용하기
let YellowBtn = styled.button`
  background : ${props => props.색};
  color : ${props => props.색 === 'blue' ? 'white' : 'black'};
  padding : 10px;
`;
// 스타일 복사도 됨
let YellowBtn2 = styled.button(YellowBtn)`

`


// styled-components 장점
// 1. css 파일까지 안가도됨
// 2. 스타일이 다른 js 파일로 오염되지 않음
    // 2-1 app.css 파일은 전역이여서 다른 자식 js 들에게 영향을 끼침
    // 오염 방지하려면 컴포넌트.module.css 이렇게 만들어야됨
// 3. 페이지 로딩시간 단축 (style 로 넣어주기 때문임)
    // + 해당 페이지에만 필요한 css 들만 따로 부르기 때문
// 4. 안에 js 코드 사용할 수 있음

// styled-components 단점
// 1. 코드가 길어진다. + js 복잡해진다.
// 2. 다른 파일에서 스타일 사용할 때 export 하면 되는데, 그럼 css 쓰는거랑 뭐가 다른가

function DetailPage(props){
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
          <Box>
            <YellowBtn 색="blue">버튼</YellowBtn>
            <YellowBtn 색="orange">버튼</YellowBtn>
          </Box>
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