import lozad from 'lozad';
import tippy from 'tippy.js';
import { openModal, closeModal } from '../../../src/components/popup/popup';
import { smoothScroll } from '../../../src/components/smoothScroll/smoothScroll';
import { basketObserverCounter, basketProductConter } from '../../../src/components/section/basket/basket';

const body = document.querySelector('body');
const form = document.querySelectorAll('.form');
const formMessages = document.querySelectorAll('.form__textarea');
const header = document.querySelector('.header');
const catalogMenu = header.querySelector('.catalogMenu');
const basket = document.querySelector('.basket');

tippy('[data-tippy-content]');

const observer = lozad('.lozad', {
  rootMargin: '20px 0px',
  threshold: 0.4
});
observer.observe();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(document.querySelector('.popup.show')?.getAttribute('data-popup-target'));
  }
});

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
    catalogMenu?.classList.remove('active');
    header.querySelector('.main-nav')?.classList.remove('active');
  }
  if(e.target.closest('[data-popup-open]')) {
    e.preventDefault();
    openModal(e.target.closest('[data-popup-open]').getAttribute('data-popup-open'));
    document.querySelector('.popup.show').insertAdjacentHTML('afterbegin', '<div class="lds-ripple"><div></div><div></div></div>');
    setTimeout(() => document.querySelector('.popup.show .lds-ripple').remove(), 450);
    if(document.querySelectorAll('.popup.show').length > 1) {
      document.querySelector('.popup.popup-agree .popup__backdrop').style.display = 'none';
      body.classList.add('hidden');
    }
  }
  if(e.target.closest('.popup__close') || e.target.closest('.popup__button-close')) {
    closeModal(e.target.closest('.popup').getAttribute('data-popup-target'));
  }
  if(e.target.closest('.popup__backdrop')) {
    if(document.querySelectorAll('.popup.show').length > 1) {
      document.querySelector('.popup.popup-agree').classList.remove('show');
      return false;
    }
    document.querySelector('.popup.show').classList.remove('show');
    body.classList.remove('hidden');
  }
  if(e.target.closest('.js-confirm-order')) {
    document.querySelector('form.order-form > button[type="submit"]')?.click();
  }
});

// Vendor
import '../../vendor/vendor'

// Components
import '../../components/components'
