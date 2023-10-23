import enquire from 'enquire.js';

(() => {
  const header = document.querySelector('.header');
  const catalogMenu = header.querySelector('.catalogMenu');
  const headerMobile = document.querySelector('.headerMobile');
  let headerHeight = header.offsetHeight;
  let logoUse = header.querySelector('.logo use');
  let path = logoUse.getAttributeNS('http://www.w3.org/1999/xlink', 'href').split('#')[0];
  let cloneLocation = header.querySelector('.header__top')?.cloneNode(true);
  let afterElement = header.querySelector('.counterLink');
  let scrolltop = scrollY;

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
    enquire.register('screen and (max-width: 600px)', {
      match() {
        if (scrollY > scrolltop) {
          headerMobile.classList.remove('fixed');
          headerMobile.classList.add('drop');
        } else {
          headerMobile.classList.add('fixed');
          headerMobile.classList.remove('drop');
        }
        if(scrollY === 0) { headerMobile.classList.remove('fixed'); }
        scrolltop = scrollY;
      }
    })
  });

  catalogMenu?.addEventListener('click', function(){
    this.classList.toggle('active');
    header.querySelector('.main-nav').classList.toggle('active');
  });

})();