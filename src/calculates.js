import { shared } from "./shared.js";
import { renderCart, removeFromCart} from "./cart.js";

export function calculateOrderTotal(producer) {
  return shared.cart[producer].reduce((sum, item) => {
    if (!shared.productActive?.[producer]?.[item.id]) return sum;
    return sum + item.price * item.qty;
  }, 0);
}


// export function calculateGrandTotal(){
//     return Object.keys(shared.cart).reduce((sum, prod) => sum + calculateOrderTotal(prod), 0);
// }

export function calculateGrandTotal() {
  let total = 0;

  for (let producer in shared.cart) {
    if (!shared.producerActive[producer]) continue;
    total += calculateOrderTotal(producer);
  }

  return total;
}

export function changeQty(shared, producer, prodID, newQty){

    const idNum = Number(prodID);
    const qty = parseInt(newQty);
    if(isNaN(qty)) return;
    const item = shared.cart[producer].find(item => item.id === idNum);
    
    if(item){
        item.qty = qty;
        if(item.qty <= 0){
            removeFromCart(shared, producer, prodID);
        }else{
            renderCart();
        }
    }
}



