import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

(() => {

  // Swiper Group
  const swiperGroup = document.querySelectorAll('.swiperGroup');
  swiperGroup.forEach(slider => {
    const sliderSwiper = new Swiper(slider, {
      speed: 700,
      modules: [Navigation, Pagination],
      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 'auto',
        },
        481: {
          spaceBetween: 10,
          slidesPerView: 'auto',
        },
        769: {
          slidesPerView: 'auto',
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 40
        }
      },
      navigation: {
        nextEl: '.swiperGroup__next',
        prevEl: '.swiperGroup__prev',
      },
    });

    if (window.matchMedia("(min-width: 1200px)").matches) {
      sliderSwiper.on('slideNextTransitionStart', e => e.el.classList.add('swiperGroup__change'));
      sliderSwiper.on('slidePrevTransitionStart', e => e.el.classList.remove('swiperGroup__change'));
    }

  });

  // Swiper Group card
  const swiperCard = document.querySelectorAll('.cardMain__swiper');
  swiperCard.forEach(slider => {
    const sliderCard = new Swiper(slider, {
      slidesPerView: 'auto',
      speed: 700,
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
    });
    sliderCard.pagination.bullets.forEach((bullet, index) => {
      bullet.addEventListener('mouseenter', () => sliderCard.slideTo(index));
    });
  });

  // Swiper Group articlesSwiper
  const articlesSwiper = document.querySelectorAll('.articles__swiper');
  articlesSwiper.forEach(slider => {
    const sliderCard = new Swiper(slider, {
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          spaceBetween: 20,
          slidesPerView: 'auto'
        },
        769: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          enabled: true
        },
        1200: {
          slidesPerView: 4,
          enabled: false,
          spaceBetween: 50
        }
      }
    });
  });

  // Swiper Group kitchen
  const swiperKitchen = document.querySelectorAll('.kitchen__swiper');
  swiperKitchen.forEach(slider => {
    const sliderCard = new Swiper(slider, {
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 'auto'
        },
        769: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          enabled: true
        },
        1200: { enabled: false }
      }
    });
  });

  // Swiper Group galleryCard
  const galleryCard = document.querySelectorAll('.galleryCard');
  galleryCard.forEach(slider => {
    const sliderGallery = new Swiper(slider, {
      slidesPerView: 'auto',
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        320: {
          spaceBetween: 10,
          enabled: true
        },
        481: { enabled: false }
      }
    });
  });

  // Swiper popupGallery
  const popupGallery = document.querySelectorAll('.popupGallery');
  popupGallery.forEach((slider, index) => {
    new Swiper(slider, {
      slidesPerView: 'auto',
      modules: [Navigation, Pagination],
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function(currentClass, totalClass) { 
          return `Фото <span class="${currentClass}"></span> из <span class="${totalClass}"></span>`; 
        }
      },
      navigation: {
        nextEl: '.popupGallery__next',
        prevEl: '.popupGallery__prev',
      },
      
    });
    
  });

})();
