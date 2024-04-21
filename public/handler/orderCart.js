 // Thêm lắng nghe sự kiện click cho tất cả các nút "order-button
 const orderButton = document.getElementById(`order-button`);
 orderButton.addEventListener('click', handleOrderClick);



 function handleOrderClick(event) {
    event.preventDefault();
   // Lấy dữ liệu từ localStorage
   const orderData = JSON.parse(localStorage.getItem('item'));
   const phone = document.getElementById('order-phone').value;
   const address = document.getElementById('order-address').value;
   const phoneRegex = /^[0-9]{10}$/;

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

   // Kiểm tra định dạng số điện thoại
   if (!phoneRegex.test(phone)) {
       alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
       return;
   }

   // Chỉ lấy các trường cần thiết từ orderData
   const orderDetails = orderData.map(item => ({
        price: item.price,
        unit: item.unit,
       productId: item.productId
      
   }));

   fetch('http://localhost:3333/api/orders/add', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       credentials: 'include',
       body: JSON.stringify({
           order: {
               address: address,
               phone: phone
           },
           orderDetails: orderDetails
       }),
       redirect: 'manual' // Ngăn chặn chuyển hướng tự động
   })
   .then(response => {
       if (response.status === 200) {
           alert(`Đặt hàng thành công!`);
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
