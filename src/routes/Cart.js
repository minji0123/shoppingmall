/* eslint-disable */
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom'

import {useEffect, useState} from "react"
import { changeName } from './../store/userSlice.js'// 3. 만든 함수 import 해서 사용
import { changeCount,changeCountMinus,changeItemDel } from './../store.js'// 3. 만든 함수 import 해서 사용
import {Button} from 'react-bootstrap';

import Notice from "../component/Notice";


function Cart(){
    // 장바구니 로컬스토리지...
    // let [carted,setcarted] = useState(JSON.parse(localStorage.getItem('carted')));
    // console.log('carted',carted);

    // let state = useSelector((state) => {return state})// <- Redux store 가져와줌(object 임)
                                        //state.user 처럼 원하는것만 return 가능 

    // Redux 변수 사용
    let 상품들 = useSelector((state) => {return state.cart})// <- Redux store 가져와줌(object 임)
    console.log('상품들',상품들);
    // Redux 함수 사용
    let dispatch = useDispatch();// store.js 로 요청 보내주는 함수임
    let navigate = useNavigate();
    let [cartTotalSum, setCartTotalSum] = useState(0);
    let [cartTotalCnt, setCartTotalCnt] = useState(0);
    let cntSum = 0;
    let prcSum = 0;



    function getCartSum(){
        상품들.map((a,i)=>{
            console.log('a',a);
            cntSum += a.count;

            setCartTotalCnt(cntSum);
            console.log('cartTotalCnt',cartTotalCnt);
            
            prcSum +=cntSum*a.price;
            setCartTotalSum(prcSum);
            


        })
    }

    useEffect(()=>{
            getCartSum();

      });

    
    return(
        <div className='container'>
            <Table className='mb_200 mt_200 '>
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
                                    <td className='cart-link'
                                    onClick={() => {navigate(`/detail/${(상품들[i].id)}`)}}
                                    >
                                    <img 
                                        src={`https://minji0123.github.io/shoppingmall/image/image${(상품들[i].id)}.jpg`} 
                                        width="100px" 
                                    />
                                    </td>
                                    <td className='cart-link'
                                    onClick={() => {navigate(`/detail/${(상품들[i].id)}`)}}
                                    >{상품들[i].name}</td>
                                    <td className='tot_count'>{상품들[i].count}</td>
                                    <td> {상품들[i].price * 상품들[i].count} </td>
                                    <td>
                                    <span className="material-symbols-rounded cart-link m_10"
                                    onClick={() => {
                                        dispatch(changeCount(상품들[i].id));
                                    }}>
                                        add
                                    </span>
                                    <span className="material-symbols-rounded cart-link m_10"
                                    onClick={() => {
                                        dispatch(changeCountMinus(상품들[i].id));
                                    }}>
                                        remove
                                    </span>
                                    <span className="material-symbols-rounded cart-link m_10"
                                        onClick={() => {
                                            dispatch(changeItemDel(상품들[i].id));
                                        }}>
                                        close
                                    </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                <thead>
                    <tr>
                        <th></th>
                        <th>💜주문정보💜</th>
                        <th>{cartTotalCnt}</th>
                        <th>{cartTotalSum}</th>
                        <th>구매하기</th>
                    </tr>
                </thead>
            </Table> 

          <Notice></Notice>

        </div>
    )
}

export default Cart