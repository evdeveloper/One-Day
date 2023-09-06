import enquire from 'enquire.js'
import { overlayAdd, overlayRemove } from '../overlay/overlay'

const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobileMenu');
const mobileMenuClose = mobileMenu.querySelector('.mobileMenu__close');

function showMenu() {
  mobileMenu.classList.add('active');
  overlayAdd();
}

function hideMenu() {
  mobileMenu.classList.remove('active');
  overlayRemove();
}

enquire.register('screen and (max-width: 1100px)', {
  match() {
    hamburger.addEventListener('click', showMenu);
    document.addEventListener('click', e => {
      if (e.target.closest('.overlay')) { hideMenu(); }
    })
    mobileMenuClose.addEventListener('click', hideMenu);
  },
  unmatch() {
    mobileMenuClose.removeEventListener('click', hideMenu);
  }
})
