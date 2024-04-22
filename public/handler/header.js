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

document.addEventListener("DOMContentLoaded", function() {
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const isLoggedIn = checkLoginStatus(); // Hàm này cần phải được thay thế bằng cách kiểm tra thực tế trạng thái đăng nhập của người dùng

  // Lấy các phần tử DOM tương ứng
  const loginBtn = document.querySelector('a[href="login"]');
  const logoutBtn = document.getElementById('btn_logout');
  const orderLink = document.querySelector('a[href="order"]');
  const profileLink = document.querySelector('a[href="profile"]');

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
function checkLoginStatus() {
  // Lấy danh sách cookie
  const cookies = document.cookie.split(';');

  // Duyệt qua từng cookie
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Tách tên và giá trị của cookie
      const [cookieName, cookieValue] = cookie.split('=');

      // Kiểm tra nếu tên của cookie là "session_id" và giá trị của cookie là "user k"
      if (cookieName === 'conenct.sid' && cookieValue === 'user') {
          // Cookie session_id có giá trị là "user k"
          console.log('Session ID cookie has value "user"');
          return true;
      }
  }
  // Không tìm thấy cookie session_id có giá trị "user k"
  console.log('Session ID cookie does not have value "user k"');
  return false;
  
}