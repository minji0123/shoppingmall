/* eslint-disable */
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from "react"
import { changeName } from './../store/userSlice.js'// 3. 만든 함수 import 해서 사용
import { changeCount,changeCountMinus,changeItemDel } from './../store.js'// 3. 만든 함수 import 해서 사용
import {Button} from 'react-bootstrap';

import Notice from "../Notice";


function Cart(){
    // 장바구니 로컬스토리지...
    // let [carted,setcarted] = useState(JSON.parse(localStorage.getItem('carted')));
    // console.log('carted',carted);


    // let state = useSelector((state) => {return state})// <- Redux store 가져와줌(object 임)
                                        //state.user 처럼 원하는것만 return 가능 

    // Redux 변수 사용
    let 상품들 = useSelector((state) => {return state.cart})// <- Redux store 가져와줌(object 임)
    console.log('상품들상품들',상품들);
    // Redux 함수 사용
    let dispatch = useDispatch();// store.js 로 요청 보내주는 함수임
    
    
    return(
        <div className='container'>
            <Table className='mb_200 '>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>변경하기</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        상품들.map((a,i)=>{
                            return(
                                <tr key={i}>
                                    <td>{상품들[i].id}</td>
                                    <td>{상품들[i].title}</td>
                                    <td>{상품들[i].count}</td>
                                    <td>{상품들[i].price * 상품들[i].count}</td>
                                    <td>
                                    <Button className='ml_3 mr-3 border_none' variant="outline-secondary" onClick={() => {
                                        // 1. + 버튼을 누르면 해당 상품의 수량부분이 +1 되는 기능
                                        // 1. + 버튼을 누르면 해당 상품의 가격부분이 *a 되는 기능
                                        dispatch(changeCount(상품들[i].id));
                                    }}>+</Button>
                                    <Button className='border_none' variant="outline-danger" onClick={() => {
                                        dispatch(changeCountMinus(상품들[i].id));
                                    }}>-</Button>
                                    <Button className='border_none' variant="outline-primary" onClick={() => {
                                            dispatch(changeItemDel(상품들[i].id));
                                        }}>x</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table> 

          <Notice></Notice>

        </div>
    )
}

export default Cart