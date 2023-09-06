(() => {
  const header = document.querySelector('.header');
  const catalogMenu = header.querySelector('.catalogMenu');
  let headerHeight = header.offsetHeight;
  let logoUse = header.querySelector('.logo use');
  let path = logoUse.getAttributeNS('http://www.w3.org/1999/xlink', 'href').split('#')[0];
  let cloneLocation = header.querySelector('.header__top')?.cloneNode(true);
  let afterElement = header.querySelector('.counterLink');
  window.addEventListener('scroll', e => {
    if (window.matchMedia("(min-width: 1100px)").matches) {
      if(headerHeight < window.scrollY) {
        header.classList.add('fixed');
        header.closest('.wrapper').style.paddingTop = `${headerHeight}px`;
        logoUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${path}#logo-small`);
        header.querySelector('.header__inner')?.insertBefore(cloneLocation, afterElement);
      } else {
        header.classList.remove('fixed');
        header.closest('.wrapper').style.paddingTop = 0;
        logoUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `${path}#logo`);
        header.querySelector('.header__inner .header__top')?.remove();
      }
    }
  });

  catalogMenu.addEventListener('click', function(){
    this.classList.toggle('active');
    header.querySelector('.main-nav').classList.toggle('active');
  });

})();