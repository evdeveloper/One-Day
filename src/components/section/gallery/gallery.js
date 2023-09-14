import { wordCounter } from '../../wordCounter/wordCounter';
import enquire from 'enquire.js';

(() => {
  const gallery = document.querySelector('.galleryCard');
  const galleryPopup = document.querySelector('.popupGallery');
  const galleryPopupSlides = galleryPopup?.querySelectorAll('.popupGallery__slide');
  let counterShowGallery = 4;
  let galleryConter = galleryPopupSlides?.length - counterShowGallery;
  let counter = counterShowGallery;
  if(gallery) {
    if(galleryPopupSlides?.length > counterShowGallery) {
      gallery.querySelector('.js-gallery-upload').textContent = `Смотреть ещё ${galleryConter} ${wordCounter(galleryConter, ['фотографию', 'фотографии', 'фотографий'])}`;
    } else {
      gallery.querySelector('.js-gallery-upload').remove();
    }
  }
  document.addEventListener('click', e => {
    if(e.target.closest('.js-gallery-upload')) {
      const _self = e.target.closest('.js-gallery-upload');
      counter++;
      galleryConter--;
      _self.textContent = `Смотреть ещё ${galleryConter} ${wordCounter(galleryConter, ['фотографию', 'фотографии', 'фотографий'])}`;
      if(!galleryConter) { _self.remove(); }
    } 
  });

  enquire.register("screen and (max-width:481px)", {
    match: function() {
      document.querySelectorAll('.galleryCard__item')?.forEach(slide => slide.removeAttribute('data-popup-open'));
    }
  });
})();