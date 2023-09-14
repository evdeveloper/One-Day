import IMask from 'imask';

const phoneMask = document.querySelectorAll('input[type="tel"]');
phoneMask?.forEach(tel => {
  tel.addEventListener('focus', (e) => {
    IMask(tel, {mask: "+{7} 000 000-00-00", lazy: false});
  });
});