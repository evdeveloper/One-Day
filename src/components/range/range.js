const MIN = '[data-min-input]';
const MAX = '[data-max-input]';
const MAX_AMOUNT = 15000;

import noUiSlider from 'nouislider';

class rangeSelector {
  constructor(context) {
    this.slider = context.querySelector('.sliderRange__inner');
    this.min  = context.querySelector(MIN);
    this.max  = context.querySelector(MAX);

    this.initSliders(context);

    this.slider.noUiSlider.on('update', (values, handle) => {
      let value = values[handle];
      if (handle) {
        this.max.value = Math.round(value);
      } else {
        this.min.value = Math.round(value);
      }
    });

    this.min.addEventListener('change', () => {
      this.slider.noUiSlider.set([this.min.value, null]);
    });

    this.max.addEventListener('change', () => {
      this.slider.noUiSlider.set([null, this.max.value]);
    });

    window.onDestroySliders = this.destroySliderIfExists.bind(this);
  }

  initSliders(context) {
    const from = Number(context.dataset.from);
    const to = Number(context.dataset.to);
    const minVal = Number(context.dataset.min);
    const maxVal = Number(context.dataset.max);
    const range = {
      min: [minVal],
      max: [maxVal]
    };

    if ((maxVal - minVal) > MAX_AMOUNT && minVal < MAX_AMOUNT) {
      range['50%'] = [minVal + MAX_AMOUNT];
    }

    this.destroySliderIfExists();

    noUiSlider.create(this.slider, {
      start: [from, to],
      connect: true,
      range
    });
}

  destroySliderIfExists() {
    this.slider?.noUiSlider?.destroy();
  }
}
export default rangeSelector;
