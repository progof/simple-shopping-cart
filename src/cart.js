import { shared } from "./shared.js";
import {
  calculateOrderTotal,
  calculateGrandTotal,
  changeQty,
} from "./calculates.js";

// Add product to cart
export function addToCart(product) {
  const { cart, producerActive, productActive } = shared;
  const producerName = product.producer;

  if (!cart[producerName]) {
    cart[producerName] = [];
    producerActive[producerName] = true;
    productActive[producerName] = {};
  }

  const existingProduct = cart[producerName].find((p) => p.id === product.id);

  if (existingProduct) {
    existingProduct.qty += product.qty ?? 1;
  } else {
    cart[producerName].push({ ...product, qty: product.qty ?? 1 });
  }

  productActive[producerName][product.id] = true;
  renderCart();
}


// Render selected product in cart
export function renderCart() {
  const { cart, cartContainer, grandTotalElement } = shared;
  cartContainer.innerHTML = "";

  if (!cartContainer.innerHTML == "") {
    cartContainer.innerHTML = `Cart is empty`
  }

  for (let producer in cart) {
    const group = cart[producer];
    const groupElement = document.createElement("div");
    groupElement.className = "producer-wrapper";

    const headerWrapper = document.createElement("div");
    headerWrapper.className = "producer-header";

    const isChecked = shared.producerActive[producer] ?? true;
    shared.producerActive[producer] = isChecked;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isChecked;
    checkbox.dataset.producer = producer;
    checkbox.className = "producer-checkbox";

    checkbox.addEventListener("change", () => {
      shared.producerActive[producer] = checkbox.checked;
      if (shared.productActive[producer]) {
        for (let id in shared.productActive[producer]) {
          shared.productActive[producer][id] = checkbox.checked;
        }
      }
      renderCart();
    });

    const label = document.createElement("label");
    label.textContent = producer;

    headerWrapper.appendChild(checkbox);
    headerWrapper.appendChild(label);
    groupElement.appendChild(headerWrapper);

    group.forEach((item) => {
      const isProductChecked =
        shared.productActive[producer]?.[item.id] ?? true;
      shared.productActive[producer][item.id] = isProductChecked;

      const itemContainer = document.createElement("div");
      itemContainer.innerHTML = `
    <div class="product-field">
      <div class="product-cart">
        <input type="checkbox" name="product-cart" class="product-checkbox" 
          data-id="${item.id}" data-producer="${item.producer}"
          ${isProductChecked ? "checked" : ""} />
        <img src="${item.imageUrl}" style="max-width: 64px;" alt="Image with product" />
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <div class="product-qty">
          <button class="qty-dec" data-id="${item.id}" data-producer="${item.producer
        }">-</button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}" data-producer="${item.producer
        }">+</button>
        </div>
      </div>
      <button type="button" class="delete-item-btn" data-id="${item.id
        }" data-producer="${item.producer}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m9.4 15.808l2.6-2.6l2.6 2.6l.708-.708l-2.6-2.6l2.6-2.6l-.708-.708l-2.6 2.6l-2.6-2.6l-.708.708l2.6 2.6l-2.6 2.6zM6 20V6H5V5h4v-.77h6V5h4v1h-1v14zm1-1h10V6H7zM7 6v13z"/></svg>
      </button>
    </div>
  `;
      groupElement.appendChild(itemContainer);
    });

    groupElement.querySelectorAll(".product-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const producer = checkbox.dataset.producer;
        const id = checkbox.dataset.id;
        shared.productActive[producer][id] = checkbox.checked;
        renderCart();
      });
    });

    const total = document.createElement("div");
    total.innerHTML = `<span>Total: $${calculateOrderTotal(producer)}</span>`;
    groupElement.appendChild(total);
    cartContainer.appendChild(groupElement);
  }


  grandTotalElement.innerHTML = `<span>Grand total: $${calculateGrandTotal()}</span>`;

  cartContainer.querySelectorAll(".qty-inc").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { producer, id } = btn.dataset;
      const item = shared.cart[producer]?.find((i) => i.id === Number(id));
      if (item) changeQty(shared, producer, id, item.qty + 1);
    });
  });

  cartContainer.querySelectorAll(".qty-dec").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { producer, id } = btn.dataset;
      const item = shared.cart[producer]?.find((i) => i.id === Number(id));
      if (item) changeQty(shared, producer, id, item.qty - 1);
    });
  });

  cartContainer.querySelectorAll(".delete-item-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const { producer, id } = btn.dataset;
      removeFromCart(shared, producer, id);
    });
  });
}

// Remove product item from cart
export function removeFromCart(shared, producer, prodID) {
  const idNum = Number(prodID);
  shared.cart[producer] = shared.cart[producer].filter(
    (item) => item.id !== idNum
  );

  if (shared.cart[producer].length === 0) {
    delete shared.cart[producer];
    delete shared.productActive[producer];
    delete shared.producerActive[producer];
  } else {
    delete shared.productActive[producer][prodID];
  }

  renderCart();
}