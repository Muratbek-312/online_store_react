export function calcSubPrice(product){
    return product.count * product.item.price
}

export function calcTotalPrice(products){  //need array of the products
    let totalPrice = 0;
    products.forEach(elem => {
        totalPrice += elem.subPrice
    });
    return totalPrice;
}

export function getCountProductsInCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart.products.length : 0
}