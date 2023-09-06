import { fadeIn, fadeOut } from '../fade/fade'

(() => {
  document.addEventListener('click', e => { 
    if(e.target.closest('.mobileMenu__top')) {
      const _self = e.target.closest('.mobileMenu__top');
      const parent = _self.parentNode;
      _self.classList.toggle('active');
      fadeIn(parent.querySelector('.mobileMenu__list'), 'flex');
      if(!_self.classList.contains('active')) {
        fadeOut(parent.querySelector('.mobileMenu__list'));
      }
    }
  });
})();