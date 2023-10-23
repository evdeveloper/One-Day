import noUiSlider from 'nouislider';
import { fadeIn } from '../fade/fade';
import { overlayAdd, overlayRemove } from '../overlay/overlay';
import { siblings } from '../siblings/siblings';

(() => {
  const body = document.querySelector('body');
  const filterModal = document.querySelector('.filterModal');
  const filterPrices = document.querySelectorAll('.filter__price');
  const filterLimit = document.querySelectorAll('.filter__limit');

  filterPrices.forEach(price => {
    let rangeInputMin = price.querySelector('.priceRange__min');
    let rangeInputMax = price.querySelector('.priceRange__max');
    let rangeInputMiddle = price.querySelector('.priceRange__middle');
    let rangeInputs = [rangeInputMin, rangeInputMiddle, rangeInputMax];

    noUiSlider.create(price.querySelector('.sliderRange'), {
      // start: [0, 30000],
      start: [0, 15000, 30000],
      behaviour: 'drag-all',
      connect: true,
      step: 1,
      range: {
        'min': [+rangeInputMin.value],
        'max': [+rangeInputMax.value]
      }
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null, null];
      arr[i] = value;
      price.querySelector('.sliderRange').noUiSlider.set(arr);
    };

    rangeInputs.forEach((el, i) => {
      if(el) {
        el.addEventListener('input', e => setRangeSlider(i, e.currentTarget.value));
        el.addEventListener('blur', e => setRangeSlider(i, el.value));
      }
      
    });

    price.querySelector('.sliderRange').noUiSlider.on('update', function(values, handle){
      rangeInputs[handle].value = Math.round(values[handle]);
    });
  });

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