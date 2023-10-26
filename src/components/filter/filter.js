import noUiSlider from 'nouislider';
import { fadeIn } from '../fade/fade';
import rangeSelector from '../range/range';
import { overlayAdd, overlayRemove } from '../overlay/overlay';
import { siblings } from '../siblings/siblings';

(() => {
  const body = document.querySelector('body');
  const filterModal = document.querySelector('.filterModal');
  const filterLimit = document.querySelectorAll('.filter__limit');
  // const sliderRange = document.querySelectorAll('.sliderRange');

  // sliderRange.forEach(range => new rangeSelector(document, range.className));
  // sliderRange.forEach(range => console.log(range.className));

  // new rangeSelector(document, '.sliderRange');
  // new rangeSelector(document, '.sliderRange');
  function updateRangeSelectors() {
    document.querySelectorAll('[data-component="rangeSelector"]').forEach((e=>new rangeSelector(e)))
  }
  updateRangeSelectors();
  
  filterLimit.forEach(limit => {
    const itemCheckbox = limit.querySelectorAll('.filter__checkbox');
    if(itemCheckbox.length <= 5) {
      limit.querySelector('.filter__view-all').style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if(e.target.closest('.filter__view-all')) {
      const checkboxAll = e.target.closest('.filter__view-all').closest('.filter__limit').querySelectorAll('.filter__checkbox');
      checkboxAll.forEach(check => fadeIn(check, 'flex'));
      e.target.remove();
    }
    if(e.target.closest('.filter__sort-item')) {
      document.querySelectorAll('.filter__sort-item').forEach(sort => sort.classList.remove('active'));
      e.target.classList.add('active');
    }
    if(e.target.closest('.filterModal__close')) {
      overlayRemove();
      document.querySelectorAll('.filter__sort-item').forEach(sort => sort.classList.remove('active'));
      e.target.classList.add('active');
    }
    if(e.target.closest('.filter__select')) {
      let select = e.target.closest('.filter__select');
      select.classList.toggle('active');
      let filterContains = Array.from(select.querySelectorAll('.filter__select-item')).filter(item => item.classList.contains('active'));
      if(filterContains.length) {
      select.querySelector('.filter__select-top span').textContent = `${select.querySelector('.filter__select-item.active').textContent}`;
      }
      select.querySelectorAll('.filter__select-item').forEach(item => {
      item.addEventListener('click', function(){
          let nodes = siblings(item);
          nodes.forEach(node => node.classList.remove('active'));
          item.classList.add('active');
          item.closest('.filter__select').querySelector('.filter__select-top span').textContent = `${this.textContent}`;
      })
      });
  }
    if(!e.target.closest('.filter__select')) {
      document.querySelectorAll('.filter__select')?.forEach(select => select.classList.remove('active'));
    }
    if(e.target.closest('.filter__reset')) {
      let _self = e.target.closest('.filter__reset');
      let parent = _self.closest('.filterModal');
      parent.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
      parent.querySelector('.sliderRange').noUiSlider.reset();
    }
    if(e.target.closest('.filter__open')) {
      const _self = e.target.closest('.filter__open');
      overlayAdd();
      filterModal.classList.add('active');
      body.classList.add('hidden');
    }
  });
})();