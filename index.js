import express from "express";
import session from "express-session";
import { Product } from "./public/handler/Product.js";

// const dotenv = require('dotenv');
// dotenv.config();
const app = express();

// Định nghĩa route để phục vụ trang HTML
app.use(express.static("public"));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server front-end đã khởi động trên cổng ${PORT}`)
);

export default app;
