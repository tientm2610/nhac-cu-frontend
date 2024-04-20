import { apiRequest } from "./apiRequest.js";

export class Product{

  
    constructor(data){
        this.productId = data.productId;
        this.productName = data.productName;
        this.unit = data.unit;
        this.price = data.price;
        this.image = data.image;
        this.categoryId = data.categoryId;
        this.description = data.description;
    }

    static listProducts = async() =>{
        // const { products } = await apiRequest("GET", "/products");
        const response = await fetch(`http://localhost:3333/api/products`);
        const products = await response.json();
        return products.map((product) => new Product(product));
    }

    static getProductDetail= async(productId) =>{
        const response = await fetch(`http://localhost:3333/api/products/${productId}`);
        const product = await response.json();
        return new Product(product);
    }

    static getProductByCategory = async (categoryId) =>{
        const response = await fetch(`http://localhost:3333/api/products/category/${categoryId}`);
        const products = await response.json();
        return products.map((product) => new Product(product));

    }
    
}
