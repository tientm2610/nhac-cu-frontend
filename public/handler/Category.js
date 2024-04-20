import { API_URL, apiRequest } from './apiRequest.js';

export default class Category{
    constructor(data){
        this.categoryId = data.categoryId;
        this.categoryName = data.categoryName;  
    }
    // Hiển thị danh sách category
    async getAllCategories(){
        const response = await fetch(`http://localhost:3333/api/categories`);
        const categories = await response.json();
        return categories.map((category) => new Category(category))
    }

    
}