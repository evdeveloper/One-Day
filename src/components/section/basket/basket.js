import { counterReplace } from '../../counterReplace/counterReplace';
import { closeModal } from '../../popup/popup';

const basket = document.querySelector('.basket');
const basketPriceCounter = basket?.querySelector('.basket__price-count');
const orderModal = document.querySelector('.confirm-order');
const footer = document.querySelector('.footer');
const counterBasketHeader = document.querySelector('.header .js-counterLink-basket');
const counterBasketMobile = document.querySelector('.headerMobile .js-counterLink-basket');
const counterFavoriteHeader = document.querySelector('.header .js-counterLink-favorite');
const counterFavoriteMobile = document.querySelector('.headerMobile .js-counterLink-favorite');
let counterFavorite = 0;

export function basketObserverCounter() {
  let arrNumber = [];
  basket.querySelectorAll('.basket__item').forEach(item => {
    let count = +item.querySelector('.counter__price span').textContent.split(' ').join('');
    arrNumber.push(count);
    let result = arrNumber.reduce((sum, current) => sum + current, 0);
    basket.querySelector('.basket__price-sum span').innerHTML = `${counterReplace(result)}`;
  });
}

export function basketProductConter() {
  basketPriceCounter.innerHTML = `товаров: ${basket.querySelectorAll('.basket__item').length} шт.`;
  if(counterBasketHeader) {
    counterBasketHeader.textContent = `${basket.querySelectorAll('.basket__item').length}`;
  }
  if(counterBasketMobile) {
    counterBasketMobile.textContent = `${basket.querySelectorAll('.basket__item').length}`;
  }
  if(!basket.querySelectorAll('.basket__item').length) {
    basket.querySelector('.basket__price-sum span').textContent = 0;
  }
}

if(orderModal) {
  const buyObserver = new IntersectionObserver(
    ([entry]) => {
      const equi = entry.target || {};
      if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
        orderModal.classList.add('active');
      } else {
        orderModal.classList.remove('active');
      }
    },
    { threshold: [0.2] }
  );
  buyObserver.observe(footer);
}

function basketCheckCounter() {
  let list = basket.querySelectorAll('.basket__item');
  let listNumber = Array.from(list).map(item => +item.querySelector('.counter__value').textContent);
  let result = listNumber.reduce((sum, current) => sum + current, 0);
  basketPriceCounter.innerHTML = `товаров: ${result} шт.`;
  if(counterBasketHeader) {
    counterBasketHeader.textContent = `${result}`;
  }
  if(counterBasketMobile) {
    counterBasketMobile.textContent = `${result}`;
  }
  if(!basket.querySelectorAll('.basket__item').length) {
    result = 0;
    basketPriceCounter.innerHTML = `товаров: ${result} шт.`;
    if(counterBasketHeader) {
      counterBasketHeader.textContent = `${result}`;
    }
    if(counterBasketMobile) {
      counterBasketMobile.textContent = `${result}`;
    }
  }
  return result;
}
document.addEventListener('click', e => {
  if(e.target.closest('.counter')) {
    let counterPrice = e.target.closest('.counter').querySelector('.counter__price span');
    let counterValue = e.target.closest('.counter').querySelector('.counter__value');
    let counterCurrent = +counterValue.textContent;
    let counterPriceCurrent = +counterPrice.textContent.replace(/\s/g, '');
    if(e.target.closest('.counter__plus')) {
      counterValue.textContent = counterCurrent + 1;
      counterPrice.textContent = counterReplace(counterPriceCurrent * (counterCurrent + 1));
      basketObserverCounter();
      basketCheckCounter();
    }
    if(e.target.closest('.counter__minus')) {
      if(counterCurrent === 1) return;
      counterValue.textContent = counterCurrent - 1;
      counterPrice.textContent = counterReplace(counterPriceCurrent / counterCurrent);
      basketObserverCounter();
      basketCheckCounter();
    }
  }
  if(e.target.closest('.js-add-basket')) {
    let counterBasketHeaderValue = +counterBasketHeader.textContent;
    let counterBasketMobileValue = +counterBasketMobile.textContent;
    const _self = e.target.closest('.js-add-basket');
    document.querySelectorAll('.js-add-basket').forEach(btn => {
      btn.classList.toggle('button--gold');
      if(btn.classList.contains('button--gold')) {
        btn.querySelector('span').textContent = 'В корзине';
      } else {
        const parent = btn.parentNode;
        if(parent.classList.contains('card-mobile-button')) {
          btn.querySelector('span').textContent = 'В корзину';
          return false;
        }
        btn.querySelector('span').textContent = 'Добавить в корзину';
      }
    });
    if(_self.classList.contains('button--gold')) {
      counterBasketHeader.textContent = `${counterBasketHeaderValue + 1}`;
      counterBasketMobile.textContent = `${counterBasketMobileValue + 1}`;
    } else {
      counterBasketHeader.textContent = `${counterBasketHeaderValue - 1}`;
      counterBasketMobile.textContent = `${counterBasketMobileValue - 1}`;
    }
  }
  if(e.target.closest('.js-basket-product-remove') || e.target.closest('.js-basket-product-postpone')) {
    e.preventDefault();
    const _self = e.target.closest('.js-basket-product-remove') || e.target.closest('.js-basket-product-postpone');
    let productPopupID = _self.closest('.popup').getAttribute('data-product-id');
    let product = document.getElementById(`${productPopupID}`);
    product.remove();
    closeModal(e.target.closest('.popup').getAttribute('data-popup-target'));
    basketObserverCounter();
    basketProductConter();
    basketCheckCounter();
  }
  if(e.target.closest('.js-basket-product-postpone')) {
    counterFavorite++;
    if(counterFavoriteHeader) {
      counterFavoriteHeader.textContent = `${counterFavorite}`;
    }
    if(counterFavoriteMobile) {
      counterFavoriteMobile.textContent = `${counterFavorite}`;
    }
    
  }
  if(e.target.closest('.basket__item-remove')) {
    const _self = e.target.closest('.basket__item-remove');
    let productID = _self.closest('.basket__item').id;
    document.querySelector('.popup-delete-product')?.setAttribute('data-product-id', `${productID}`);
  }
});
