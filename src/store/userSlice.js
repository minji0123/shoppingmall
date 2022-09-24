/* eslint-disable */
/**
 * redux 를 쓰면 state 를 보관하는 통이 하나 필요함
 * 
 */
import { createSlice } from '@reduxjs/toolkit'

// ----------------------------------------
// Redux store 분할도 가능함
// ----------------------------------------
let user = createSlice({
    name:'user',
    initialState:'kim', // 대충 로그인된 유저 이름
    // ----------------------------------------
    // Redux store 안 state 수정해주기_Primary type
    // ----------------------------------------
    // 1. state 수정해주는 함수 만들기
    reducers : {
        changeName(state){ // 여기에서 state 는 기존 데이터
            // 위에 있는 value 를 수정하는 함수
            return 'john ' + state
        }
    }
 })
// 2. 만든 함수 export 하기
export let {changeName,} = user.actions
// 3. 만든 함수 import 해서 사용


export default user