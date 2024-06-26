import express from "express";
import session from "express-session";
import { Product } from "./public/handler/Product.js";
import Order from "./public/handler/Order.js";
import cors from "cors"; // Import middleware cors
const app = express();

// export type CheckoutRequestType = {
//   orderCode: number;
//   amount: number;
//   description: string;
//   cancelUrl: string;
//   returnUrl: string;
//   signature?: string;
//   items?: {
//       name: string;
//       quantity: number;
//       price: number;
//   }[];
//   buyerName?: string;
//   buyerEmail?: string;
//   buyerPhone?: string;
//   buyerAddress?: string;
//   expiredAt?: number;
// };




// Định nghĩa route để phục vụ trang HTML
app.use(express.static("public"));

app.use(cors());

app.use(
  session({
    secret: "abc", // Khóa bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false, // Không tạo session cho người dùng chưa đăng nhập
  })
);

app.set("view engine", "ejs");
app.set("views", "./public/views");

app.use((req, res, next) => {
  res.locals.cart = req.session.cart;
  res.locals.user = req.session.user; // Gán thông tin người dùng từ session vào biến locals.user
  const user = req.session.user;
  next(); // Chuyển tiếp sang middleware hoặc route handler tiếp theo
});

app.get("/", async (req, res) => {
  try {
    const user = req.session.user; // Lấy thông tin người dùng từ session

    const products = await Product.listProducts();
    res.render("index", { products, user: user }); // Truyền danh sách sản phẩm vào trang EJS
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.get("/single-product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.getProductDetail(productId);
    res.render("single-product", { product });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.get("/single-product", (req, res) => {
  res.render("single-product-basic");
});

app.get("/index", (req, res) => {
  res.redirect("/");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/cancel", (req, res) => {
  res.render("cancel");
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/shop", async (req, res) => {
  const products = await Product.listProducts();
  res.render("shop", { products });
});

app.get("/single-product", (req, res) => {
  res.render("single-product");
});
app.get("/cart", async (req, res) => {
  res.render("cart");
});

app.get("/order", async (req, res) => {
  const orders = await Order.getOrderList();
  res.render("order", { orders });
});

app.get("/profile", async (req, res) => {
  res.render("profile");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server front-end đã khởi động trên cổng ${PORT}`)
);



export default app;
