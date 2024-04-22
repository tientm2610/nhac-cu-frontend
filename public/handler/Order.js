
export class OrderDetail {
  constructor(data) {
    this.price = data.price;
    this.unit = data.unit;
    this.orderId = data.orderId;
    this.productId = data.productId;
  }
}
export default class Order {
  constructor(data) {
    this.orderId = data.orderId;
    this.address = data.address;
    this.orderDate = data.orderDate;
    this.phone = data.phone;
    this.status = data.status;
    this.totalPrice = data.totalPrice;
    this.username = data.username;
  }

  static getOrderList = async () => {
    try {
      const response = await  fetch('http://localhost:3333/api/orders/but2610/my-orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        redirect: 'manual' // Ngăn chặn chuyển hướng tự động
    });

      const orders = await response.json();
      return orders.map((order) => new Order(order));
    } catch (error) {
      console.log("Error fetching orders:", error);
      return [];
    }
  };

  createOrder = async (orderData, orderDetailsData) => {
    try {
      const requestData = {
        order: orderData,
        orderDetails: orderDetailsData,
      };
      const response = await fetch(`http://localhost:3333/api/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: 'include'

      });
      const order = response.json();
      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  getOrderDetailList = async (orderId) => {
    const response = await fetch(`http://localhost:3333/api/orders/my-orders/${orderId}`);
    const orderDetails = await response.json();
    return orderDetails.map(orderDetail => new OrderDetail(orderDetail));
  };
}
