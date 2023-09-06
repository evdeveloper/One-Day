import lozad from 'lozad'
import { openModal, closeModal } from '../../../src/components/popup/popup';
import { smoothScroll } from '../../../src/components/smoothScroll/smoothScroll';
import { basketObserverCounter, basketProductConter } from '../../../src/components/section/basket/basket';

const formMessages = document.querySelectorAll('.form__textarea');
const header = document.querySelector('.header');
const catalogMenu = header.querySelector('.catalogMenu');
const basket = document.querySelector('.basket');
const observer = lozad();
observer.observe();

if(basket) {
  basketObserverCounter();
  basketProductConter();
}

document.querySelectorAll('.filter__tab').forEach(tab => {
  tab.addEventListener('click', function(){
    const id = this.getAttribute('data-tab'),
    content = document.querySelector('.filter__item[data-tab="'+id+'"]'),
    activeTrigger = document.querySelector('.filter__tab.active'),
    activeContent = document.querySelector('.filter__item.active');
    activeTrigger.classList.remove('active');
    tab.classList.add('active');
    activeContent.classList.remove('active');
    content.classList.add('active');
  });
});

formMessages.forEach(field => {
  field.addEventListener("input", function(){
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }, false);
});

const cardObserver = new IntersectionObserver(
  ([entry]) => {
    const equi = entry.target || {};
    if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
      document.querySelector('.card-mobile-modal')?.classList.remove('hidden');
    } else {
      document.querySelector('.card-mobile-modal')?.classList.add('hidden');
    }
  },
  { threshold: [0.2] }
);
cardObserver.observe(document.querySelector('.footer'));

document.addEventListener('click', e => {
  if(e.target.closest('[data-scroll-element]')) {
    e.preventDefault();
    smoothScroll(e.target.closest('[data-scroll-element]').getAttribute('data-scroll-element'));
  }
  if(!e.target.closest('.catalogMenu')) {
    catalogMenu.classList.remove('active');
    header.querySelector('.main-nav').classList.remove('active');
  }
  if(e.target.closest('[data-popup-open]')) {
    e.preventDefault();
    openModal(e.target.closest('[data-popup-open]').getAttribute('data-popup-open'));
  }
  if(e.target.closest('.popup__close') || e.target.closest('.popup__backdrop')) {
    closeModal(e.target.closest('.popup').getAttribute('data-popup-target'));
  }
  if(e.target.closest('.js-confirm-order')) {
    document.querySelector('form.order-form > button[type="submit"]')?.click();
  }
});



// Vendor
import '../../vendor/vendor'

// Components
import '../../components/components'
