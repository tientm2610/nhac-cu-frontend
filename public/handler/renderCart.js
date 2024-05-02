

// Lấy danh sách sản phẩm từ localStorage và render trên trang
const renderCart = () => {
  const cartData = JSON.parse(localStorage.getItem("item")) || [];
  const productListHTML = cartData
    .map(
      (item) => `
    <tr id="cart_item" data-productId="${item.productId}">

            
    <td class="product-remove">
    <a title="Remove this item" class="remove-item" href="#">×</a>
</td>
            <td class="product-image">
                <a href="single-product/${
                  item.productId
                }"><img width="145" height="145" class="shop_thumbnail" src="http://localhost:3333/api/products/${
        item.productId
      }/image"></a>
            </td>
            <td id="product-name" class="product-name">
                <a href="single-product/${item.productId}">${
        item.productName
      }</a>
            </td>
            <td id="product-price" class="product-price">
                <span class="amount">${item.price}$</span>
            </td>
            <td id="product-quantity" class="product-quantity">
                <div class="quantity buttons_added" id ="button-cart-container">
                    <input type="button" class="minus" value="-">
                    <input type="number" size="4" class="input-text qty text" title="Qty" value="${
                      item.unit
                    }" min="0" step="1">
                    <input type="button" class="plus" value="+">
                </div>
            </td>
            <td class="product-subtotal">
                <span class="amount">${item.unit * item.price}$</span>
            </td>
        
    </tr>
    `
    )
    .join("");

  // Gán nội dung HTML vào phần tử trên trang
  document.getElementById("cart-items").innerHTML = productListHTML;

  // Thêm lắng nghe sự kiện click cho tất cả các nút "remove-item"
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', handleRemoveItemClick);
  });
};

 // Gọi hàm renderCart khi trang đã tải hoàn tất
 document.addEventListener("DOMContentLoaded", renderCart);

 
// Xử lý sự kiện khi click vào nút "remove-item"
 function handleRemoveItemClick(event) {
  event.preventDefault();
  const parentTr = event.target.closest('tr');
  const productId = parentTr.getAttribute('data-productId');
  let cartItems = JSON.parse(localStorage.getItem('item')) || [];
  cartItems = cartItems.filter(item => item.productId !== productId);
  localStorage.setItem('item', JSON.stringify(cartItems));
  
  //cập nhật lại số lượng sản phẩm trên icon giỏ hàng
  renderProductCount();
  //cập nhật lại giỏ hàng
  // renderCart();
  window.location.href = "/cart";
  //cập nhật lại tổng thành tiền
  renderTotalPrice();
}

document.addEventListener('DOMContentLoaded', function() {
  const plusButtons = document.querySelectorAll('.plus');
  const minusButtons = document.querySelectorAll('.minus');

  plusButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const parentTr = event.target.closest('tr');
      updateQuantity(parentTr, 1);
    });
  });

  minusButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const parentTr = event.target.closest('tr');
      updateQuantity(parentTr, -1);
    });
  });
});

function updateQuantity(parentTr, increment) {
  const quantityInput = parentTr.querySelector('.qty');
  let unit = parseInt(quantityInput.value);
  unit += increment;
  if (unit < 1) {
    unit = 1; // Đảm bảo số lượng không nhỏ hơn 1
  }
  quantityInput.value = unit;
  updateLocalStorage(parentTr, unit);
  updateTotal(parentTr, unit);
  renderTotalPrice();
}

// Hàm cập nhật tổng thành tiền và thành tiền cho từng sản phẩm
function updateTotal(parentTr, unit) {
  const priceSpan = parentTr.querySelector(".product-price .amount");
  const price = parseFloat(priceSpan.textContent);
  const subtotalSpan = parentTr.querySelector(".product-subtotal .amount");
  subtotalSpan.textContent = unit * price + `$`;

  // Cập nhật tổng thành tiền của đơn hàng
  renderTotalPrice();
}

// Hàm cập nhật số lượng vào LocalStorage
function updateLocalStorage(parentTr, unit) {
  const productId = parentTr.getAttribute('data-productId');
  let cartItems = JSON.parse(localStorage.getItem('item')) || [];
  const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].unit = unit;
    localStorage.setItem('item', JSON.stringify(cartItems));
  }
}


// Hàm render tổng giá trị của giỏ hàng
const renderTotalPrice = () => {
  // Lấy danh sách sản phẩm từ localStorage
  const cartData = JSON.parse(localStorage.getItem("item")) || [];

  // Tạo biến để lưu tổng giá trị
  let totalPrice = 0;

  // Lặp qua mỗi sản phẩm trong giỏ hàng và tính tổng giá trị
  cartData.forEach((item) => {
      totalPrice += item.price * item.unit;
  });

  // Tạo nội dung HTML cho tổng thành tiền
  const totalPriceHTML = `
      <td class="order-total-price" colspan="6"  id="cart-total-price">
          <strong><span class="amount">Tổng thành tiền: ${totalPrice}$</span></strong>
      </td>
  `;

  // Gán nội dung HTML vào phần tử trên trang
  document.getElementById("cart-total-price").innerHTML = totalPriceHTML;
};
document.addEventListener("DOMContentLoaded", renderTotalPrice);

const renderProductCount = () => {
  // Lấy danh sách sản phẩm từ localStorage
  const cartData = JSON.parse(localStorage.getItem("item")) || [];

  // Đếm số lượng sản phẩm trong giỏ hàng

  const productCount = cartData.length;
  // Tạo nội dung HTML cho tổng thành tiền
  const productCountHTML = `
  <a href="cart">Giỏ hàng</span> <i
  class="fa fa-shopping-cart"></i> <span  class="product-count">${productCount}</span></a>
  `;

  // Gán nội dung HTML vào phần tử trên trang
  document.getElementById("product-count").innerHTML = productCountHTML;
};
// Gọi hàm  để hiển thị tổng giá trị của giỏ hàng khi trang đã tải hoàn tất
document.addEventListener("DOMContentLoaded", renderProductCount);


document.addEventListener("DOMContentLoaded", function() {
  const orderButton = document.getElementById("order-button");
  const paymentButton = document.getElementById("payment-button");
  const bankMethod = document.getElementById("payment_method_bank");
  const codMethod = document.getElementById("payment_method_cod");

  // Ẩn nút "Thanh toán" khi trang được tải lần đầu
  paymentButton.style.display = "none";

  // Thêm sự kiện click cho nút "Thanh toán khi nhận hàng"
  codMethod.addEventListener("click", function() {
      orderButton.style.display = "inline"; // Hiển thị nút "Đặt hàng"
      paymentButton.style.display = "none"; // Ẩn nút "Thanh toán"
  });

  // Thêm sự kiện click cho nút "Thanh toán bằng ngân hàng"
  bankMethod.addEventListener("click", function() {
      orderButton.style.display = "none"; // Ẩn nút "Đặt hàng"
      paymentButton.style.display = "inline"; // Hiển thị nút "Thanh toán"
  });
});
