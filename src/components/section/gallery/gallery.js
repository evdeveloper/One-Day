import { wordCounter } from '../../wordCounter/wordCounter';
import enquire from 'enquire.js';
import { Fancybox } from "@fancyapps/ui";

(() => {
  const gallery = document.querySelector('.galleryCard');
  const galleryInner = gallery?.querySelector('.galleryCard__inner');
  const galleryPopup = document.querySelector('.popupGallery');
  const galleryPopupSlides = galleryPopup?.querySelectorAll('.popupGallery__slide');
  let counterShowGallery = 4;
  let galleryCounter = galleryPopupSlides?.length - counterShowGallery;
  let counter = counterShowGallery;
  Fancybox.bind("[data-fancybox]");
  if(gallery) {
    if(galleryPopupSlides?.length > counterShowGallery) {
      gallery.querySelector('.js-gallery-upload').textContent = `Смотреть ещё ${galleryCounter} ${wordCounter(galleryCounter, ['фотографию', 'фотографии', 'фотографий'])}`;
    } else {
      gallery.querySelector('.js-gallery-upload').remove();
    }
  }
  document.addEventListener('click', e => {
    if(e.target.closest('.js-gallery-upload')) {
      const _self = e.target.closest('.js-gallery-upload');
      counter++;
      galleryCounter--;
      _self.textContent = `Смотреть ещё ${galleryCounter} ${wordCounter(galleryCounter, ['фотографию', 'фотографии', 'фотографий'])}`;
      if(!galleryCounter) { _self.remove(); }
    } 
  });

  enquire.register("screen and (max-width:481px)", {
    match: function() {
      document.querySelectorAll('.galleryCard__item')?.forEach(slide => slide.removeAttribute('data-popup-open'));
      if(gallery) {
        galleryInner.innerHTML = '';
        for(let i = 1; galleryPopupSlides?.length + 1 > i; i++) {
          galleryInner.innerHTML += ` 
            <div class="swiper-slide galleryCard__item" data-fancybox data-src="../static/images/card/${i}.webp" data-caption="Описание">
              <picture>
                <source srcset="../static/images/card/${i}.webp" type="image/webp">
                <img class="lozad" data-src="../static/images/card/${i}.jpg" alt="img">
              </picture>
            </div>
          `;
        }
      }
    }
  });
})();