'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;

    // Активный слайд
    // TODO: Сделать приватным с геттером и сеттером
    this.activeSlideId = null;
    if (this.slides.length > 0) {
      this.activeSlideId = this.slides[0].id;
    }

    this.render();
  }

  render() {
    this.el.classList.add('main-carousel', 'slide');

    let innerHTML = '';
    
    // Индикаторы
    innerHTML += '<ol class="carousel-indicators">';
    for (let slide of this.slides) {
      innerHTML += `<li data-target="#mainCarousel" data-slide-to="${slide.id}" class="carousel-indicator"></li>`;
    }
    innerHTML += '</ol>';

    // Обертка для актвивного слайда
    innerHTML += '<div class="carousel-inner"></div>';

    // Кнопки
    innerHTML += 
        `<button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">`
      +   `<span class="carousel-control-prev-icon" aria-hidden="true"></span>`
      +   `<span class="sr-only">Previous</span>`
      + `</button>`
      + `<button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">`
      +   `<span class="carousel-control-next-icon" aria-hidden="true"></span>`
      +   `<span class="sr-only">Next</span>`
      + `</button>`;
        
    this.el.innerHTML = innerHTML;

    this.renderSlide(this.activeSlideId);


    // --- Вешаем обработчики --- //
    
    // Кнопка "Предыдущий слайд"
    this.el.querySelector('[data-slide="prev"]').addEventListener('click', (event) => {
      this.renderSlide(this.getPrevSlide().id);
    });

    // Кнопка "Следующий слайд"
    this.el.querySelector('[data-slide="next"]').addEventListener('click', (event) => {
      this.renderSlide(this.getNextSlide().id);
    });

    // Индикаторы слайдов
    this.el.querySelector('.carousel-indicators').addEventListener('click', (event) => {
      this.renderSlide(+event.target.dataset.slideTo);
    });

  }

  renderSlide(id) {
    let slide = this.getSlide(id);

    if (slide) {
      let slideEl = this.el.querySelector('.carousel-inner');

      slideEl.innerHTML = 
          `<div class="carousel-item active">`
        +   `<img src="${slide.img}" alt="Activelide">`
        +   `<div class="container">`
        +     `<div class="carousel-caption">`
        +       `<h3 class="h1">${slide.title}</h3>`
        +       ` <div>`
        +         `<a class="btn" href="#" role="button">`
        +           `View all DEALS`      
        +           `<img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">`     
        +         `</a>`          
        +       `</div>`              
        +     `</div>`             
        +   `</div>`        
        + `</div>`;

      this.activeSlideId = id;
      this.setActiveIndicator(id);
  
      return true;
    } else {
      return false;
    }
  }

  getSlide(id) {
    return this.slides.find(
      slide => slide.id === id
    );
  }

  getSlideIndex(id) {
    return this.slides.findIndex(
      slide => slide.id === id
    );
  }

  getPrevSlide() {
    let activeSlideIndex = this.getSlideIndex(this.activeSlideId);

    if (activeSlideIndex === 0) {
      return this.slides[this.slides.length - 1];
    } else {
      return this.slides[activeSlideIndex - 1];
    }
  }

  getNextSlide() {
    let activeSlideIndex = this.getSlideIndex(this.activeSlideId);

    if (activeSlideIndex === this.slides.length - 1) {
      return this.slides[0];
    } else {
      return this.slides[activeSlideIndex + 1];
    }
  }

  setActiveIndicator(id) {
    let indicatorEls = this.el.querySelectorAll('.carousel-indicators li');

    for (let indicatorEl of indicatorEls) {
      if (+indicatorEl.dataset.slideTo === id) {
        indicatorEl.classList.add('active');
      } else {
        indicatorEl.classList.remove('active');
      }
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
