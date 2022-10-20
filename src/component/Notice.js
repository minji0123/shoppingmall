/* eslint-disable */
import { useState} from "react"
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom'

import '../App.css';



function Notice() {



  return (
    <>
        <div className="container">

          <div className="one_border" id="notice">
            <h1>Notice</h1>
            
              <hr/>

              <div className="row">
                <div className="col-md-6 pt_30 pb_30 info-tag">
                  <p><strong>CS CENTER</strong></p>
                  <p>0000-0000</p>
                  <p>평일 오전 10:00 ~ 오후 5:00</p>
                  <p>점심 오후 12:00 ~ 오후 1:00</p>
                  <p>토/일/공휴일 휴무</p>
                </div>

                <div className="col-md-6  pt_30 pb_30  info-tag">
                  <p><strong>BANK INFO</strong></p>
                  <p>국민 0000000000000</p>
                  <p>기업 0000000000000</p>
                  <p>농협 0000000000000</p>
                  <p>예금주: 미밈</p>


                </div>
              </div>
            <hr/>

            <div className="info-tag">
              <p><strong>RETURN / EXCHANGE</strong></p>
              <p>경기도 성남시 분당구 내정로 000번길 0-0 0층</p>
              <p>자세한 교환·반품절차 안내는 문의란 및 공지사항을 참고해주세요</p>
            </div>
          
            <hr/>
          
            <div className="info-tag">
              <p>상호 : 미밈 고객센터 : 0000-0000</p>
              <p>대표 : 미밈 개인정보관리책임자 : 미밈</p>
              <p>주소 : 경기도 성남시 분당구 내정로 000번길 0-0 (정자2동) 0층 </p>
              <p>사업자번호 : 000-00-00000 통신판매업신고 : 2016-경기-0000</p>
              <p>minji0123@github.com Hosting by 0000</p>
            </div>

            <hr/>
          
            <div className="info-tag">

              <p>COPYRIGHT ⓒ TheMinnnnmi - 미밈 ALL RIGHT RESERVED.</p>
              <p>Designed by TheMinnnnmi</p>
            </div>

          </div>



        </div>

    </>

  );
}


export default Notice;
