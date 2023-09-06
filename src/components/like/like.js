(() => {
  document.addEventListener('click', e => {
    if(e.target.closest('.js-like')) {
      let like = e.target.closest('.js-like');
      let url = like.querySelector('use');
      let hash = url.getAttributeNS('http://www.w3.org/1999/xlink', 'href').split('#')[0];
      like.classList.toggle('active');
      if(like.classList.contains('active')) {
      url.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${hash}#heart-fill`);
      } else {
      url.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${hash}#heart`);
      }
    }
  });
})();