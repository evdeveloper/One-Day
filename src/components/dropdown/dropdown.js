import { slideToggle } from './../slideToggle/slideToggle'

(() => {
  document.addEventListener('click', e => {
    if(e.target.closest('.dropdown')) {
      if(e.target.closest('.dropdown__top')) {
      e.target.classList.toggle('active');
      }
    }
    if(e.target.closest('.collapse')) {
      if(e.target.closest('.collapse__top')) {
      const collapse = new slideToggle(e.target.closest('.collapse').querySelector('.collapse__body'));
      collapse.toggle();
      }
    }
  });
})();