export class slideToggle {
  constructor(target, duration = 350) {
    this._target = target;
    this._duration = duration;
  }
  show() {
    const el = this._target;
    if (el.classList.contains('collapsing') || el.classList.contains('collapse--show')) {
      return;
    }
    el.classList.remove('collapse__body');
    const height = el.offsetHeight;
    el.style.height = 0;
    el.style.overflow = 'hidden';
    el.style.transition = `height ${this._duration}ms ease`;
    el.classList.add('collapsing');
    el.offsetHeight;
    el.style.height = `${height}px`;
    window.setTimeout(() => {
      el.classList.remove('collapsing');
      el.classList.add('collapse__body');
      el.classList.add('collapse--show');
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
    }, this._duration);
  }
  hide() {
    const el = this._target;
    if (el.classList.contains('collapsing') || !el.classList.contains('collapse--show')) {
      return;
    }
    el.style.height = `${el.offsetHeight}px`;
    el.offsetHeight;
    el.style.height = 0;
    el.style.overflow = 'hidden';
    el.style.transition = `height ${this._duration}ms ease`;
    el.classList.remove('collapse__body');
    el.classList.remove('collapse--show');
    el.classList.add('collapsing');
    window.setTimeout(() => {
      el.classList.remove('collapsing');
      el.classList.add('collapse__body');
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
    }, this._duration);
  }
  toggle() {
    this._target.classList.contains('collapse--show') ? this.hide() : this.show();
  }
}