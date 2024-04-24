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

document.addEventListener("DOMContentLoaded", async function() {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const isLoggedIn = await checkLoginStatus(); // Hàm này cần phải được thay thế bằng cách kiểm tra thực tế trạng thái đăng nhập của người dùng

  // Lấy các phần tử DOM tương ứng
  const loginBtn = document.getElementById(`login-button-header`);
  const logoutBtn = document.getElementById('logout-button-header');
  const orderLink = document.getElementById('order-button-header');
  const profileLink = document.getElementById('profile-button-header');

  // Nếu người dùng đã đăng nhập, ẩn nút đăng nhập và hiển thị nút đăng xuất, đơn hàng và thông tin người dùng
  if (isLoggedIn) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "block";
      orderLink.style.display = "block";
      profileLink.style.display = "block";
  } else { // Nếu người dùng chưa đăng nhập, ẩn nút đăng xuất, đơn hàng và thông tin người dùng, hiển thị nút đăng nhập
      loginBtn.style.display = "block";
      logoutBtn.style.display = "none";
      orderLink.style.display = "none";
      profileLink.style.display = "none";
  }
});

// Hàm mẫu để kiểm tra trạng thái đăng nhập (cần thay thế bằng hàm thực tế)
async function checkLoginStatus() {
  const response = await fetch('http://localhost:3333/api/users/check-login-status', {
    method: 'GET',
    credentials: 'include'
})
  if(response.status === 200){
    return true;
  }else{
    return false;
  }
}