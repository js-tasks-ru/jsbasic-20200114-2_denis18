'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
    
      </ul>
    </li>
  
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
    
       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
    
      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    this.el = element;
    this.el.innerHTML = this.template;
    this.backdropEl = document.querySelector('.backdrop');
    this.selectEvent = new CustomEvent('select');

    let items = this.el.querySelectorAll('.dropdown');
    for (let item of items) {
      // Обработчик. Отображение подменю
      item.addEventListener('pointerenter', (event) => {
        event.target.querySelector('.dropdown-menu').classList.add('show');
        this.backdropEl.classList.add('show');
      });
      // Обработчик. Скрытие подменю
      item.addEventListener('pointerleave', (event) => {
        event.target.querySelector('.dropdown-menu').classList.remove('show');
        this.backdropEl.classList.remove('show');
      });
      
      let subItems = item.querySelectorAll('.dropdown-item');
      for (let subItem of subItems) {
        subItem.addEventListener('click', (event) => {
          let liEl = event.target.closest('li');
          // Инициация пользовательского события 'select'
          liEl.dispatchEvent(new CustomEvent('select', {
            bubbles: true,
            detail: { id: liEl.dataset.id }
          }));
        });
      }
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;