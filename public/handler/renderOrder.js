const getAllOrer = async () => {
  try {
    const response = await fetch("http://localhost:3333/api/orders/my-orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      redirect: "manual", // Ngăn chặn chuyển hướng tự động
    });
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3333/api/orders/my-orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        redirect: "manual", // Ngăn chặn chuyển hướng tự động
      });
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  // Gọi hàm renderCart khi trang đã tải hoàn tất

const renderOrder = async () => {
  const orders = await getAllOrer();
  const orderListHTML = orders
    .map(
      (item) =>
        ` <tr class="order-item">
        <!-- Các cột thông tin đơn hàng -->
        <td class="order-detail">
            <a title="Detail" href="#" class="order-detail-link"  id="order-detail-link"  data-order-id="${item.orderId}" >${item.orderId}</a>
        </td>
        <td class="order-address">
            <span>${item.address}</span>
        </td>
        <td class="order-date">
            <span>${item.orderDate}</span>
        </td>
        <td class="order-phone">
            <span>${item.phone}</span>
        </td>
        <td class="order-status" style="color: ${getStatusColor(item.status)};"> 
            <span>${item.status}</span>
        </td>
        <td class="order-total" style="color: ${getTotalPriceColor(item.totalPrice)};font-size: large;">
            <span>${item.totalPrice}$</span>
        </td>
        <div>
    </tr>`)
    .join("");

  // Gán nội dung HTML vào phần tử trên trang
  document.getElementById("orders-container").innerHTML = orderListHTML;

   // Gán nội dung HTML vào phần tử trên trang
   document.getElementById("orders-container").innerHTML = orderListHTML;

   // Thêm sự kiện click cho các liên kết chi tiết đơn hàng
   const detailLinks = document.querySelectorAll('.order-detail-link');
   detailLinks.forEach(link => {
     link.addEventListener('click', async (event) => {
       event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
       const orderId = link.getAttribute('data-order-id');
       const orderDetails = await getOrderDetails(orderId);
       const orderDetailHTML = orderDetails.map(item => `
       <div class="order-detail-item" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
       <div style="margin-bottom: 8px;">
          
           <p style="font-weight: bold; margin: 0;">Mã đơn hàng: ${item.orderId}</p>
           <img src="http://localhost:3333/api/products/${item.productId}/image"/ style ="height: 80px;">
           <p style="margin: 0;">Mã sản phẩm: ${item.productId}</p>
           <p style="margin: 0;">Giá: ${item.price}$</p>
           <p style="margin: 0;">Số lượng: ${item.unit}</p>
          
       </div>
      
   </div>
       `).join('');
       document.getElementById("order-detail-container").innerHTML = orderDetailHTML;
     });
   });

};
document.addEventListener("DOMContentLoaded", renderOrder);


function getStatusColor(status) {
    switch (status) {
        case 'Chưa thanh toán':
            return 'blue';
        case 'Giao hàng thành công':
            return 'fuchsia';
        case 'Đã hủy':
            return 'red';
        case 'Đã thanh toán':
            return 'green';
        default:
            return 'black';
    }
}

function getTotalPriceColor(totalPrice) {
    if (totalPrice > 0) {
        return 'red';
    }else {
        return 'black';
    }
}




// const renderOrderDetail = async (event) => {
//     try {
//       // Lấy orderId từ phần tử được nhấn
//       const orderId = event.target.textContent;
//       console.log(orderId);
  
//       // Gọi hàm getOrderDetails để lấy thông tin chi tiết đơn hàng
//       const orderDetails = await getOrderDetails(orderId);
  
//       // Tạo danh sách chi tiết đơn hàng
//       const orderDetailListHTML = orderDetails.map((item) => `
//       <div class="order-detail-item" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
//       <div style="margin-bottom: 8px;">
          
//           <p style="font-weight: bold; margin: 0;">Mã đơn hàng: ${item.orderId}</p>
//           <p style="margin: 0;">Mã sản phẩm: ${item.productId}$</p>
//           <p style="margin: 0;">Giá: ${item.price}$</p>
//           <p style="margin: 0;">Số lượng: ${item.unit}</p>
          
//       </div>
      
//   </div>`).join("");
  
//       // Hiển thị danh sách chi tiết đơn hàng lên trang
//       document.getElementById("order-detail-container").innerHTML = orderDetailListHTML;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };
  
//   // Thêm lắng nghe sự kiện click cho tất cả các nút "order-detail-link"
//   const orderDetailButton = document.getElementById('order-detail-link');
//   orderDetailButton.forEach(button => {
//     button.addEventListener('click', renderOrderDetail);
//   });
