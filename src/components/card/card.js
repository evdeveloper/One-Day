(() => {
  const buy = document.querySelector('.js-add-basket');
  const footer = document.querySelector('.footer');
  const modal = document.querySelector('.card-mobile-button');
  if(buy) {
    const buyObserver = new IntersectionObserver(
      ([entry]) => {
        const equi = entry.target || {};
        if (!entry.isIntersecting || entry.intersectionRatio <= 0.1) {
          modal.classList.add('active');
        } else {
          modal.classList.remove('active');
        }
      },
      { threshold: [0.1] }
    );
    buyObserver.observe(buy);
    buyObserver.observe(footer);
  }
  
})();