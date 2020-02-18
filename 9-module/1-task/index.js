'use strict';

class CheckoutProductList {
  products = [];

  options = {
    productsStoreKey: 'cart-products',
  }
  

  constructor(parentElement) {
    this.el = parentElement;
    
    const productJSON = localStorage.getItem(this.options.productsStoreKey);
    if (productJSON) {
      this.products = JSON.parse(productJSON);
    }
    
    this.el.innerHTML = this.getProductListHTML();

    // Добавляем обработчик удаления товара
    this.el.addEventListener('click', event => {
      if (event.target.dataset.buttonRole === 'checkout-remove-product'
          && confirm('Вы уверенны, что хотите удалить этот товар из корзины?')
      ) {
        const productId = +event.target.closest('[data-product-id]').dataset.productId;
        const productIndex = this.products.findIndex(product => product.id === productId);
        
        this.products.splice(productIndex, 1);
        localStorage.setItem(this.options.productsStoreKey, JSON.stringify(this.products));
        
        this.el.innerHTML = this.getProductListHTML();
      }
    });
  }

  getProductListHTML() {
    let html = '';

    html += '<div class="product-list-box">';

    for (const product of this.products) {
      html += this.getProductHTML(product);
    }

    html += '</div>';

    return html;
  }

  getProductHTML(product) {
    let html = '';

    html = html
      + `<div data-product-id="${product.id}" class="product-wrapper box-inner-col description-col">`
      +   `<div class="product-image-container">`
      +     `<img class="product-image" src="${product.imageUrl}" alt="img">`
      +   `</div>`
      +   `<div class="product-description">`
      +     `<h4 class="col-title mb-2">${product.title}</h4>`
      +     this.getProductRatingHTML(product)
      +   `</div>`
      +   `<div class="product-price">`
      +     `<p class="mb-0 font-weight-light">Price:</p>`
      +     `<h4 class="col-title price-text mb-2">${product.price}</h4>`
      +   `</div>`
      +   `<div class="product-remove-button-wrapper">`
      +     `<button type="button"`
      +             `data-button-role="checkout-remove-product"`
      +             `class="product-remove-button">`
      +       `X`
      +     `</button>`
      +   `</div>`
      + `</div>`;

      return html;
  }

  getProductRatingHTML(product) {
    let html;
    
    if (product.rating) {
      html = `<div class="rate">`;

      for (let i = 1; i <= 5; i++) {
        if (i <= product.rating.stars) {
          html += `<i class="icon-star checked"></i>`;
        } else {
          html += `<i class="icon-star active"></i>`;
        }
      }

      html = html 
        + `</div>`
        + `<p class="rate-amount d-none d-md-block mt-1">${product.rating.reviewsAmount} reviews</p>`;
    } 
    else {
      html = '';
    }

    return html;
  }

}

window.CheckoutProductList = CheckoutProductList;
