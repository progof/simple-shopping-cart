import { shared } from "./shared.js";
import {renderProductGrid} from "./product.js"
import {renderCart} from "./cart.js"

function initShop() {
  renderProductGrid();
  renderCart();
}

initShop(shared);