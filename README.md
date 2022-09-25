# React 기반 쇼핑몰 TheMinnnnmi

![](/assets/images/2022/2022-09-25-23-39-16.png)

<a style="color:skyblue">https://minji0123.github.io/shoppingmall/</a>

<hr/>

## 사용 라이브러리 및 기술

<a href="#1" style="color:pink">react-bootstrap</a>  
<a href="#2" style="color:pink">react-router-dom</a>  
<a href="#3" style="color:pink">axios</a>  
<a href="#4" style="color:pink">react-redux</a>  
<a href="#5" style="color:pink">local storage</a>  

<hr/>


<h3 id="1"> react-router-dom </h3>

- router 라이브러리로 페이지 이동 구현
- 등록하지 않은 페이지 방문 시 (404) 발생하는 오류 대비

```js
<Route path="/detail/:id" element={<DetailPage shoes={shoes}/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="*" element={<div>없는 페이지에요</div>}/>
```

<h3 id="2"> useNavigate (hook)</h3>

- useNavigate 훅으로 페이지 이동 구현

```js
let navigate = useNavigate();

<Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
<Nav.Link onClick={() => {navigate('/Cart')}}>Cart</Nav.Link>
<Nav.Link href="#notice" >About</Nav.Link>
```
<hr/>

<h3 id="3"> axios</h3>

- 더미데이터가 아닌, 서버에서 전송받은 데이터로 화면 설계
- axios 라이브러리를 사용하여 데이터를 받아온 뒤, useState 에 값을 저장시켜 데이터 바인딩

- https://minji0123.github.io/shoppingmall/data/items.json
- https://minji0123.github.io/shoppingmall/image/image1.jpg


```js
useEffect(()=>{
    axios.get(`https://minji0123.github.io/shoppingmall/data/items.json`)
    .then((결과)=>{
        let copy = [...shoes, ...결과.data];
        setShoes(copy);
    })
    .catch(() => {
        console.log('실패함ㅅㄱ');
    })
},[]);
```

<hr/>

<h3 id="4"> react-redux</h3>

- redux 라이브러리를 이용해 장바구니 기능 구현
- 화면 상세 페이지에서 상품을 **장바구니에 추가 시**, redux store 에 선언한 함수를 호출해서 **장바구니 페이지에서 추가한 상품을 확인할 수 있게** 함

```html
<button className="btn btn-danger" onClick={()=>{
        let param = {
            id:찾은상품.id,
            name:찾은상품.title,
            price:찾은상품.price,
            count:1,
        }
        dispatch(changeItem(param));
        cartTimer();
    }}
>주문하기</button>
```
<hr/>

<h3 id="5"> local storage</h3>

- local storage 를 이용해 최근 본 상품 기능 구현
- 새로고침 시 데이터가 초기화되는 현상 방지

```js
if(!localStorage.getItem('watched'))
localStorage.setItem('watched',JSON.stringify([]));
```
