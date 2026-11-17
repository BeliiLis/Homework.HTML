document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.querySelector('.products');
  const cartContainer = document.querySelector('.cart__products');

  productsContainer.addEventListener('click', (e) => {
    // Счётчик количества
    if (e.target.classList.contains('product__quantity-control_dec') ||
        e.target.classList.contains('product__quantity-control_inc')) {
      const isDec = e.target.classList.contains('product__quantity-control_dec');
      const controls = e.target.parentElement;
      const valueEl = controls.querySelector('.product__quantity-value');
      let val = parseInt(valueEl.textContent) + (isDec ? -1 : 1);
      if (val < 1) val = 1;
      valueEl.textContent = val;
      return;
    }

    // Добавление в корзину
    if (e.target.classList.contains('product__add') || e.target.closest('.product__add')) {
      const btn = e.target.closest('.product__add');
      const card = btn.closest('.product');
      const id = card.dataset.id;
      const imgSrc = card.querySelector('.product__image').src;
      const count = parseInt(card.querySelector('.product__quantity-value').textContent);

      let cartItem = cartContainer.querySelector(`.cart__product[data-id="${id}"]`);
      if (cartItem) {
        const countEl = cartItem.querySelector('.cart__product-count');
        countEl.textContent = parseInt(countEl.textContent) + count;
      } else {
        cartItem = document.createElement('div');
        cartItem.className = 'cart__product';
        cartItem.dataset.id = id;
        cartItem.innerHTML = `
          <img class="cart__product-image" src="${imgSrc}">
          <div class="cart__product-count">${count}</div>
        `;
        cartContainer.appendChild(cartItem);
      }
    }
  });
});
