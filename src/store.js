/* eslint-disable */
import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import axios from 'axios';

// ----------------------------------------
// Redux store 에 state 보관하는 법
// ----------------------------------------

// 사용하는방법
let 사용법 = createSlice({
    name:'state이름작명!',
    initialState: '실제 state 값',

})
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
// state 수정해주는 함수 만들기
let stock = createSlice({
     name:'stock',
    initialState: {name : 'White',age:20 },
      
    // ----------------------------------------
    // Redux store 안 state 수정해주기_Reference type
    // ----------------------------------------
    // 1. state 수정해주는 함수 만들기
    reducers : {
        // Reference type 은 직접수정해도 state 변경 가능!
        changeAge(state, action){

            // state 는 기존 데이터
            // action 은 사용 시 넣는 파라미터
            state.age += action.payload;
            // 관습적으로 state 변경 파라미터를 action 으로 칭함
            // action.payload 를 붙여주면 완성됨. 
        },
        changeAge2(state){ 
            // 여러 개 만들 수도 있다.
        }
    }
})
// 2. 만든 함수 export 하기
export let {changeAge,함수2,함수3,등등,} = stock.actions;
// 3. 만든 함수 import 해서 사용

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// 장바구니
let cart = createSlice({
    name:'stock',
    initialState:[],
    reducers : {
        changeCount(state,action){
            let a = state.find((e) => e.id === action.payload);
            a.count += 1;
        },
        changeCountMinus(state,action){
            let a = state.find((e) => e.id === action.payload);
            if(a.count === 0){
                alert('상품이 없습니다.');
                return;
            }
                a.count -= 1;
            
        },
        changeItem(state,action){
            let 아이디 = action.payload.id;
            let a = state.find((e) => e.id === 아이디);

            // let 번호 = state.findIndex((e) => {return e.id === action.payload.id} ); // 이거구나!
            if(a){
                a.count += 1;

            }else{
                state.push(action.payload);
            }
        },
        changeItemDel(state,action){
            let 아이디 = action.payload;
            let a = state.find((e) => e.id === 아이디);
            let 번호 = state.findIndex((e) => {return e.id === 아이디} );

            if(a){
                state.splice(번호,1)
            }
        },

    }
})

export let {changeCount,changeCountMinus,changeItem,changeItemDel,} = cart.actions;

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer,
        // 작명 : 사용법.reducer,
        // 서버데이터 : 서버데이터.reducer,
    }
})