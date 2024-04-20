// renderCart.js

// Phương thức để lấy danh sách sản phẩm từ localStorage
const getAllFromCart = () => {
  try {
    // Lấy danh sách sản phẩm từ localStorage
    const cartItems = JSON.parse(localStorage.getItem("item")) || [];
    return cartItems;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Lấy danh sách sản phẩm từ localStorage và render trên trang
const renderCart = () => {
  const cartData = getAllFromCart();
  const productListHTML = cartData
    .map(
      (item) => `
    <tr id="cart_item">

            <td class="product-remove">
                <a title="Remove this item" class="remove" href="#">×</a>
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
                <div class="quantity buttons_added">
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
};

 // Gọi hàm renderCart khi trang đã tải hoàn tất
 document.addEventListener("DOMContentLoaded", renderCart);

// Thêm sự kiện cho nút "+" và "-"
document.addEventListener("click", function (event) {
  const target = event.target;

  // Kiểm tra xem có phải là nút "+" hay không
  if (target.classList.contains("plus")) {
    // Lấy phần tử cha trực tiếp (tr) của nút được nhấn
    const parentTr = target.closest("tr");

    // Lấy số lượng hiện tại từ ô input
    const quantityInput = parentTr.querySelector(".qty");
    let unit = parseInt(quantityInput.value);

    // Tăng số lượng và cập nhật giá trị vào ô input
    unit++;
    quantityInput.value = unit;

    // Cập nhật tổng thành tiền
    updateTotal(parentTr, unit);
  }

  // Kiểm tra xem có phải là nút "-" hay không
  if (target.classList.contains("minus")) {
    // Lấy phần tử cha trực tiếp (tr) của nút được nhấn
    const parentTr = target.closest("tr");

    // Lấy số lượng hiện tại từ ô input
    const quantityInput = parentTr.querySelector(".qty");
    let unit = parseInt(quantityInput.value);

    // Đảm bảo số lượng không nhỏ hơn 1
    if (unit > 1) {
      // Giảm số lượng và cập nhật giá trị vào ô input
      unit--;
      quantityInput.value = unit;

      // Cập nhật tổng thành tiền
      updateTotal(parentTr, unit);
    }
  }
});

// Hàm cập nhật tổng thành tiền
function updateTotal(parentTr, unit) {
  // Lấy giá tiền từ ô span
  const priceSpan = parentTr.querySelector(".product-price .amount");
  const price = parseFloat(priceSpan.textContent);

  // Cập nhật tổng thành tiền vào ô span
  const subtotalSpan = parentTr.querySelector(".product-subtotal .amount");
  subtotalSpan.textContent = unit * price + `$`;
}

document
.getElementById("order-button")
.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của nút
  // Thực hiện các hành động cần thiết khi nhấn nút thanh toán
  // Ví dụ: Gọi hàm để gửi dữ liệu đến backend
  sendOrderDataToBackend();
  
   // Load lại trang /cart
});



function sendOrderDataToBackend() {
  
     // Lấy dữ liệu từ localStorage
     const orderData = JSON.parse(localStorage.getItem('item'));
     const phone = document.getElementById('order-phone').value;
     const address = document.getElementById('order-address').value;

      // Kiểm tra xem giỏ hàng có trống không
      if (!orderData || orderData.length === 0) {
        alert('Giỏ hàng đang trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.');
        return;
    }

    // Kiểm tra xem số điện thoại và địa chỉ đã được nhập hay chưa
    if (!phone || !address) {
        alert('Vui lòng nhập số điện thoại và địa chỉ nhận hàng.');
        return;
    }
     
     fetch('http://localhost:3333/api/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' ,
        body: JSON.stringify({
            order: {
                address: address,
                phone: phone
            },
            orderDetails: orderData
        }),
        redirect: 'manual' // Ngăn chặn chuyển hướng tự động
    })
    .then(response => {
        if (response.status === 200) {
            alert(`Đặt hàng thành công!`)
            // Phản hồi thành công, chuyển hướng trang
            
            //xóa giỏ hàng
            localStorage.removeItem("item");

            window.location.href = '/cart'; // Chuyển hướng tới trang mới
            
        } else if (response.status === 400) {
            // Phản hồi có lỗi, trích xuất thông báo lỗi từ dữ liệu JSON
            response.json().then(data => {
                alert(data.error); // Hiển thị thông báo lỗi từ server
            });
        } else {
            // Phản hồi không thành công, hiển thị thông báo lỗi mặc định
            alert('Có lỗi xảy ra khi xử lý đơn hàng');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi nếu cần
        alert('Có lỗi xảy ra khi xử lý đơn hàng');
    });
}


  