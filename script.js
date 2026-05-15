// DOM 선택 querySelector

// 생산품 리스트
const productList = document.querySelector("#product-list");

// 카트 리스트
const cartList = document.querySelector("#cart-list");

// 총 합계
const totalPrice = document.querySelector("#total-price");



// 상품 데이터
const products = [
    { id: 1, name: "노트북", price: 500000 },
    { id: 2, name: "마우스", price: 10000 },
    { id: 3, name: "키보드", price: 50000 }
];



// 장바구니 데이터
let cart = [];


// 화면에 상품 데이터 출력 (DOM : productList)
function showProducts() {

    // 생산품 리스트 비우기 -> 안 비우면 중복으로 출력
    productList.innerHTML = "";

    // 생산품 데이터 하나씩 생산품 리스트에 넣음
    products.forEach(function (product) {

        // div요소 생성 후 productItem으로 할당
        const productItem = document.createElement("div");

        // div 요소, 즉 productItem 하나 당 클래스 적용
        productItem.classList.add("product-item");

        // div(productItem)에 요소 삽입
        productItem.innerHTML = `
            <span>${product.name}</span>
            <strong>${product.price}</strong>
            <button class="add-btn" data-id="${product.id}">추가</button>
        `;

        // 만든 div(productItem)을 생산품 리스트에 넣기
        productList.appendChild(productItem);

    })
}

// 장바구니에 추가 이벤트 리스너 적용
productList.addEventListener("click", function (event) {

    // 만약 클릭한 요소의 class에 "add-btn"이 있다면
    if (event.target.classList.contains("add-btn")) {

        //클릭 요소 data- 형태의 요소 출력
        const productId = Number(event.target.dataset.id);

        // 클릭한 요소가 실제 상품데이터와 일치하는지 확인
        const selectedProduct = products.find(function (product) { // find - true면 해당 객체 반환
            return product.id === productId; // true, false 출력
        });

        // 클릭한 요소가 장바구니에 있는지 확인
        const selectedCart = cart.find(function (item) { // find - true면 해당 객체 반환
            return item.id === productId; // true, false 출력
        });

        // 이미 장바구니에 있으면 수량만 증가
        if (selectedCart) {
            selectedCart.quantity += 1;
        }

        // 장바구니에 없으면 새로 추가 (quantity: 1 속성 추가)
        else {
            cart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1
            });
        }

        // 장바구니 데이터 갱신
        showCart();

    }
})


// 화면에 장바구니 데이터 출력 (DOM : cartList)
function showCart() {

    // 생산품 리스트 비우기 -> 안 비우면 중복으로 출력
    cartList.innerHTML = "";

    // 생산품 데이터 하나씩 생산품 리스트에 넣음 (배열 : cart)
    cart.forEach(function (item) {

        // li요소 생성 후 cartItem으로 할당
        const cartItem = document.createElement("li");

        // li 요소, 즉 cartItem 하나 당 클래스 적용
        cartItem.classList.add("cart-item");

        // 상품별 총 금액 계산
        const itemTotalPrice = item.price * item.quantity;

        // li(carttItem)에 요소 삽입 
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <strong>${item.price}</strong>
            <span>수량 : ${item.quantity}</span>
            <span>합계: ${itemTotalPrice.toLocaleString()}원</span>
            <button class="minus-btn" data-id="${item.id}">-1</button>
            <button class="delete-btn" data-id="${item.id}">목록 삭제</button>
        `;

        // 만든 li(productItem)를 생산품 리스트에 넣기
        cartList.appendChild(cartItem);

    })

    calculateTotalPrice();
}


// 장바구니 목록 제거 함수
function removeCartItem(cartId, itemName) {

  // 삭제 전 경고창
  const result = confirm(`해당 상품(${itemName})을 장바구니에서 삭제할까요?`);

  // 사용자가 취소를 누르면 해당 시점에서 코드 종료
  if (result === false) {
    return;
  }

  // cart 배열에서 cartId와 다른 id를 가진 상품만 남김
  cart = cart.filter(function (item) { // filter는 true만 골라서 재배열
    return item.id !== cartId; // 같지 않다면 true, 같으면 false
  });

  // 장바구니 화면 다시 출력
  showCart();
}


// 수량 감소 함수
function decreaseCartItem(cartId) {

  // cart 배열에서 클릭한 상품 확인 (find 함수는 객체 반환)
  const selectedCart = cart.find(function (item) {
    return item.id === cartId;
  });

  // 만약 수량이 1이하가 되면 cart 배열에서 제거
  if (selectedCart.quantity <= 1) {
    removeCartItem(cartId, selectedCart.name);
    return;
  }

  // 찾은 상품의 수량을 1 감소
  selectedCart.quantity -= 1;

  // 장바구니 화면 다시 출력
  showCart();
}


// -1 클릭 시 동작
cartList.addEventListener("click", function (event) {

  // 만약 클릭한 요소의 class에 "minus-btn"이 있다면
  if (event.target.classList.contains("minus-btn")) {

    // 클릭 요소 data- 형태의 요소 출력
    const cartId = Number(event.target.dataset.id);

    // 수량 감소 함수 실행
    decreaseCartItem(cartId);
  }
});


// 목록 삭제 클릭 시 동작
cartList.addEventListener("click", function (event) {

    // 만약 클릭한 요소의 class에 "delete-btn"이 있다면
    if (event.target.classList.contains("delete-btn")) {

        //클릭 요소 data- 형태의 요소 출력
        const cartId = Number(event.target.dataset.id);

        // cart 배열에서 클릭한 상품 확인 (find 함수는 객체 반환)
        const selectedCart = cart.find(function (item) {
            return item.id === cartId;
        });

        // 삭제 전 경고창
        const result = confirm(`해당 상품(${selectedCart.name})을 장바구니에서 삭제할까요?`);

        // 사용자가 취소를 누르면 해당 시점에서 코드 종료
        if (result === false) {
            return;
        }

        // cart 배열에서 cartId와 다른 id를 가진 상품만 남김
        cart = cart.filter(function (item) { // filter는 true만 골라서 재배열
            return item.id !== cartId; // 같지 않다면 true, 같으면 false
        });

        // 장바구니 화면 다시 출력
        showCart();
    }
})


// 총 합계 (DOM : totalPrice)
function calculateTotalPrice(){ 

    let total = 0;

    cart.forEach(function (item){
        total += item.price * item.quantity;

    });

    // DOM요소 안 textContent 변경
    totalPrice.textContent = total.toLocaleString();
}



// 화면 갱신
showProducts();