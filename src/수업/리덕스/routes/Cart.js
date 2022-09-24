/* eslint-disable */
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from './../store/userSlice.js'// 3. 만든 함수 import 해서 사용
import { changeAge,changeCount,changeCountMinus,changeItemDel } from './../store.js'// 3. 만든 함수 import 해서 사용
import {Button} from 'react-bootstrap';

function Cart(){

    let state = useSelector((state) => {return state})// <- Redux store 가져와줌(object 임)
                                        //state.user 처럼 원하는것만 return 가능 
    // console.log(state.user);
    // console.log(state.stock);
    let 상품들 = useSelector((state) => {return state.cart})// <- Redux store 가져와줌(object 임)
    // console.log(상품들)
    let dispatch = useDispatch();// store.js 로 요청 보내주는 함수임
    
    return(
        <div>

            {state.user} 님 의 장바구니
            {/* 나이: {state.stock.age}
            <button onClick={() => {
                            // 4. dispatch(state 변경함수())
                            dispatch(changeAge(100));
                    }}>+</button> */}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        상품들.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{상품들[i].id}</td>
                                    <td>{상품들[i].name}</td>
                                    <td>{상품들[i].count}
                                    <Button variant="outline-secondary" onClick={() => {
                                        // 1. + 버튼을 누르면 해당 상품의 수량부분이 +1 되는 기능
                                        dispatch(changeCount(상품들[i].id));
                                    }}>+</Button>
                                    <Button variant="outline-danger" onClick={() => {
                                        dispatch(changeCountMinus(상품들[i].id));
                                    }}>-</Button>
                                    </td>

                                    <td>
                                        <Button variant="outline-primary" onClick={() => {
                                            dispatch(changeItemDel(상품들[i].id));
                                        }}>삭제하기</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart