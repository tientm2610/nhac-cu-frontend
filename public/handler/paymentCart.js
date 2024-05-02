
// Thêm lắng nghe sự kiện click cho tất cả các nút "payment-button
const paymentButton = document.getElementById(`payment-button`);
paymentButton.addEventListener("click", handlePaymentClick);

function handlePaymentClick(event) {
  event.preventDefault();

  const orderData = JSON.parse(localStorage.getItem("item"));
  const phone = document.getElementById("order-phone").value;
  const address = document.getElementById("order-address").value;

  // Lưu dữ liệu vào localStorage khi người dùng click nút thanh toán
  localStorage.setItem('phone', phone);
  localStorage.setItem('address', address);
  const phoneRegex = /^[0-9]{10}$/;

  if (!orderData || orderData.length === 0) {
    alert(
      "Giỏ hàng đang trống, vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
    );
    return;
  }

  if (!phone || !address) {
    alert("Vui lòng nhập số điện thoại và địa chỉ nhận hàng.");
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
    return;
  }

  const cartData = JSON.parse(localStorage.getItem("item")) || [];

  fetch("http://localhost:3333/create-payment-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartData }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create payment link");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout URL not found in response");
      }
    })
    .catch((error) => {
      console.error("Error creating payment link:", error);
    });
}

// Thêm phần xử lý URL để kiểm tra trạng thái thanh toán
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get("status1");

  const orderData = JSON.parse(localStorage.getItem("item"));
  const phone = localStorage.getItem('phone');
  const address = localStorage.getItem('address');

  console.log(paymentStatus);
  if (paymentStatus === "cancel") {
    alert("Thanh toán thất bại");
  } else if(paymentStatus === "success") {

    // Chỉ gửi yêu cầu thêm đơn hàng khi thanh toán thành công
    const orderDetails = orderData.map((item) => ({
      price: item.price,
      unit: item.unit,
      productId: item.productId,
    }));

    fetch("http://localhost:3333/api/orders/add-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        order: {
          address: address,
          phone: phone,
        },
        orderDetails: orderDetails,
      }),
      redirect: "manual", // Ngăn chặn chuyển hướng tự động
    })
    localStorage.removeItem("item");
    window.location.href = '/cart'; // refesh lại trang giỏ hàng

  }
};
