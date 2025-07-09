export const shared = {
    productContainer: document.getElementById("product-list"),
    cartContainer: document.getElementById("cart-item"),
    // buttonAddProduct: document.getElementById("add-cart-btn"),
    // svgIconForButton: document.getElementById("add-cart-btn-svg"),
    buttonRemoveItem: document.getElementById("remove-item"),
    orderTotalElement: document.getElementById("order-total"),
    grandTotalElement: document.getElementById("grand-total-box"),
    newProductContainer: null,
    newCartContainer: null,
    cart: {},
    // orderTotal: 0,
    // grandTotal: 0,
    producerActive: {},
    productActive: {}, 
}

const msg = "Test string"

console.log(msg.substring())