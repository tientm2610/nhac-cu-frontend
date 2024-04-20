
export class ProductCart {
  constructor() {}

  static addToCart = async (productId, productName, productPrice, unit) => {
    try {
      if (typeof localStorage !== "undefined") {
        // Lấy danh sách sản phẩm từ localStorage
        let cartItems = JSON.parse(localStorage.getItem("item")) || [];

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = cartItems.findIndex(
          (item) => item.productId === productId
        );

        if (existingItemIndex !== -1) {
          // Nếu sản phẩm đã tồn tại, cập nhật số lượng
          cartItems[existingItemIndex].unit += parseInt(unit);
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
          cartItems.push({
            productId: productId,
            productName: productName,
            price: productPrice,
            unit: parseInt(unit),
          });
        }

        // Lưu danh sách sản phẩm vào localStorage
        localStorage.setItem("item", JSON.stringify(cartItems));

        return "Thêm sản phẩm vào giỏ hàng thành công.";
      } else {
        throw new Error("localStorage is not supported in this environment.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  
  static getAllFromCart = async () => {
    try {
      let cartItemsArray = [];
      const cartItems = JSON.parse(localStorage.getItem("item")) || [];
      // Chuyển đổi dữ liệu từ localStorage sang mảng
      for (const item of cartItems) {
        cartItemsArray.push({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          unit: item.unit,
        });
      }
      return cartItemsArray;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  

  static deleteCart = async () => {
    try {
      if (typeof localStorage !== "undefined") {
        // Xóa toàn bộ giỏ hàng từ localStorage
        localStorage.removeItem("item");
        return "Xóa giỏ hàng thành công.";
      } else {
        throw new Error("localStorage is not supported in this environment.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  static removeFromCart = async (productId) => {
    try {
      if (typeof localStorage !== "undefined") {
        // Lấy danh sách sản phẩm từ localStorage
        let cartItems = JSON.parse(localStorage.getItem("item")) || [];

        // Lọc ra sản phẩm cần xóa khỏi giỏ hàng
        cartItems = cartItems.filter((item) => item.productId !== productId);

        // Lưu danh sách sản phẩm mới vào localStorage
        localStorage.setItem("item", JSON.stringify(cartItems));

        return "Xóa sản phẩm khỏi giỏ hàng thành công.";
      } else {
        throw new Error("localStorage is not supported in this environment.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

}
