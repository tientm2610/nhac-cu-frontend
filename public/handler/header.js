const renderProductCount = () => {
  // Lấy danh sách sản phẩm từ localStorage
  const cartData = getAllFromCart();

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

