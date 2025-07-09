import { productArray } from "./mockup.js";
import { addToCart } from "./cart.js";

export function renderProductGrid() {
  const grid = document.getElementById("product-list");
  grid.innerHTML = "";

  productArray.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-field";

    if (product.qty === undefined) product.qty = 1;

    div.innerHTML = `
      <div class="item-layout">
        <span class="product-id">Product ID: ${product.id}</span>
        <div class="item-wrapper">
          <img src="${product.imageUrl}" class="item-image" alt="Image with product" />
          <div class="item-names">
            <h3>${product.name}</h3>
            <span>${product.producer}</span>
          </div>
        </div>
        <div class="item-description">${product.description}</div>
        <div class="add-to-cart">
          <span class="product-price">$${product.price}</span>
          <span class="px-05" role="separator">|</span>
          <div class="product-qty">
            <button class="qty-dec" data-id="${product.id}">-</button>
            <span class="qty-val" data-id="${product.id}">${product.qty}</span>
            <button class="qty-inc" data-id="${product.id}">+</button>
          </div>
          <span class="px-05" role="separator">|</span>
          <div id="add-cart-btn">
            <button type="button" class="add-cart-btn" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11.5 8.5v-3h-3v-1h3v-3h1v3h3v1h-3v3zM7.308 21.116q-.633 0-1.067-.434t-.433-1.066t.433-1.067q.434-.433 1.067-.433t1.066.433t.434 1.067t-.434 1.066t-1.066.434m9.384 0q-.632 0-1.066-.434t-.434-1.066t.434-1.067q.434-.433 1.066-.433t1.067.433q.433.434.433 1.067q0 .632-.433 1.066q-.434.434-1.067.434M2 3.5v-1h2.448l4.096 8.616h7l3.67-6.616h1.14l-4.225 7.616H8.1l-1.639 3h11.731v1H4.741l2.744-4.9L3.808 3.5z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    div.querySelector(".add-cart-btn").addEventListener("click", () => {
      addToCart(product);
    });

    div.querySelector(".qty-inc").addEventListener("click", () => {
      product.qty += 1;
      div.querySelector(".qty-val").textContent = product.qty;
    });

    div.querySelector(".qty-dec").addEventListener("click", () => {
      if (product.qty > 1) {
        product.qty -= 1;
        div.querySelector(".qty-val").textContent = product.qty;
      }
    });

    grid.appendChild(div);
  });
}