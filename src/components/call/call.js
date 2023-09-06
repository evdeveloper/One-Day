(() => {
  document.addEventListener('click', e => {
    if(e.target.closest('.callComponent__btn')) {
      let _self = e.target.closest('.callComponent__btn');
      _self.classList.toggle('active');
      let url = _self.querySelector('use');
      let hash = url.getAttributeNS('http://www.w3.org/1999/xlink', 'href').split('#')[0];
      if(_self.classList.contains('active')) {
      url.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${hash}#close`);
      } else {
      url.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${hash}#phone`);
      }
    }
  });
})();