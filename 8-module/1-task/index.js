class ProductList {
  products = [];
  cartProducts = [];

  options = {
    productsUrl: '/assets/data/products.json',
    productsStoreKey: 'cart-products',
  };


  
    
  constructor(element) {
    this.el = element;
  }

  show() {
    return fetch(this.options.productsUrl)
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this.el.innerHTML = this.getProductListHTML(this.products);
        
        // Обработчик добавления товара в корзину
        this.el.addEventListener('click', event => {
          if (event.target.dataset.buttonRole === 'add-to-cart'
              && confirm('Вы уверенны, что хотите добавить этот товар в корзину?'))
          {
            let productId = +event.target.closest('[data-product-id]').dataset.productId;
            
            // Если товара еще нет в корзине
            if ( !this.cartProducts.find(product => product.id === productId) ) {
              this.cartProducts.push(this.products.find(product => product.id === productId));
            }
            
            localStorage.setItem(this.options.productsStoreKey, JSON.stringify(this.cartProducts));
          }
        });
      });
  }

  getProductListHTML(products) {
    let html = 
        `<div class="row justify-content-end">`
      +   `<div class="col-lg-9">`
      +     `<h3 class="section-title">Top Recommendations for You | <a href="/checkout.html">Your Cart</a></h3>`
      +     `<div class="row homepage-cards">`;

    for (let product of products) {
      html += this.getProductHTML(product);
    }

    html = html
      +     `</div>`
      +   `</div>`
      + `</div>`;
    
    return html;
  }

  getProductHTML(product) {
    let html =
        `<div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">`
      +   `<div class="card">`
      +     `<div class="card-img-wrap">`
      +       `<img class="card-img-top" src="${product.imageUrl}" alt="${product.title}">`
      +     `</div>`
      +     `<div class="card-body">`
      +       `<h5 class="card-title">${product.title}</h5>`
      +       this.getProductRatingHTML(product)
      +       this.getProductPriceHTML(product)
      +       `<button class="product-add-to-cart" data-button-role="add-to-cart">`
      +         `Add to cart`
      +       `</button>`
      +     `</div>`
      +   `</div>`
      + `</div>`;

    return html;
  }

  getProductPriceHTML(product) {
    let html;

    if (product.oldPrice === null) {
      html =
          `<p class="card-text price-text">`
        +   `<strong>${product.price}</strong>`
        + `</p>`;
    }
    else {
      html =
          `<p class="card-text price-text discount">`
        +   `<strong>${product.price}</strong>`
        +   `<small class="ml-2">${product.oldPrice}</small>`
        + `</p>`;
    }

    return html;
  }

  getProductRatingHTML(product) {
    let html = '';
    
    if (product.rating !== null) {
      html = `<div class="rate">`;

      for (let i = 1; i <= 5; i++) {
        if (i <= product.rating.stars) {
          html += `<i class="icon-star checked"></i>`;
        } else {
          html += `<i class="icon-star active"></i>`;
        }
      }

      html += 
          `<span class="rate-amount ml-2">${product.rating.reviewsAmount}</span>`
      + `</div>`;
    }

    return html;
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
