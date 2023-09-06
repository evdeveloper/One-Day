import { counterReplace } from '../../counterReplace/counterReplace';
import { closeModal } from '../../popup/popup';

const basket = document.querySelector('.basket');

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
  basket.querySelector('.basket__price-count').innerHTML = `
  товаров: ${basket.querySelectorAll('.basket__item').length} шт.
  `;
  if(!basket.querySelectorAll('.basket__item').length) basket.querySelector('.basket__price-sum span').textContent = 0;
}

(() => {
  document.addEventListener('click', e => {
    if(e.target.closest('.counter')) {
      let counterPrice = e.target.closest('.counter').querySelector('.counter__price span');
      let counterValue = e.target.closest('.counter').querySelector('.counter__value');
      let counterCurrent = +counterValue.textContent;
      let counterPriceCurrent = +counterPrice.textContent.replace(/\s/g, '');
      if(e.target.closest('.counter__minus')) {
      if(counterCurrent === 1) return;
      counterValue.textContent = counterCurrent - 1;
      counterPrice.textContent = counterReplace(counterPriceCurrent / counterCurrent);
      basketObserverCounter();
      }
      if(e.target.closest('.counter__plus')) {
      counterValue.textContent = counterCurrent + 1;
      counterPrice.textContent = counterReplace(counterPriceCurrent * (counterCurrent + 1));
      basketObserverCounter();
      }
    }
    if(e.target.closest('.js-add-basket')) {
      const _self = e.target.closest('.js-add-basket')
      _self.classList.toggle('button--gold');
      if(_self.classList.contains('button--gold')) {
      _self.querySelector('span').textContent = 'В корзине';
      } else {
      const parent = _self.parentNode;
      if(parent.classList.contains('card-mobile-button')) {
        _self.querySelector('span').textContent = 'В корзину';
        return false;
      }
      _self.querySelector('span').textContent = 'Добавить в корзину';
      }
    }
    if(e.target.closest('.js-basket-product-remove')) {
      e.preventDefault();
      const _self = e.target.closest('.js-basket-product-remove');
      let productPopupID = _self.closest('.popup').getAttribute('data-product-id');
      document.getElementById(`${productPopupID}`).remove();
      closeModal(e.target.closest('.popup').getAttribute('data-popup-target'));
      basketObserverCounter();
      basketProductConter();
    }
    if(e.target.closest('.js-basket-product-postpone')) {
      e.preventDefault();
      const _self = e.target.closest('.js-basket-product-postpone');
      closeModal(e.target.closest('.popup').getAttribute('data-popup-target'));
    }
    if(e.target.closest('.basket__item-remove')) {
      const _self = e.target.closest('.basket__item-remove');
      let productID = _self.closest('.basket__item').id;
      document.querySelector('.popup-delete-product')?.setAttribute('data-product-id', `${productID}`);
    }
  });
})();