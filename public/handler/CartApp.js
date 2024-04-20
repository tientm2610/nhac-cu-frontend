import { Product } from "./Product.js";
import {ProductCart} from "./ProductCart.js";
export class CartApp{
    
    constructor(){

        this._singleProduct = document.querySelector(`#add_to_cart_button`);
        this._unit = document.querySelector(`#product-quantity`);
        this._name = document.querySelector(`#product-name`);
        this._price = document.querySelector(`#product-price`);

        this._addToCart = this._addToCart.bind(this);
        this._singleProduct.addEventListener(`click`, this._addToCart);
        this.cart = document.querySelector(`.shopping-item`);
      

    };

     _addToCart = async (event) =>{
      event.preventDefault();
        const unit =this._unit.value;
        const productName = this._name.textContent;
        const productPrice = parseFloat(this._price.textContent);
        const productId = this._singleProduct.getAttribute(`data-productId`);
       
        await ProductCart.addToCart(productId,productName,productPrice,unit)
            .then(message => {
                
                alert(message);
            })
            .catch(error => console.error(error))
       
    }

      
};


export class CartProduct{
    constructor(data){
        this.productId = data.productId;
        this.productName = data.productName;
        this.price = data.price;
        this.image = data.image;
        this.quantity = data.quantity;
    }

};