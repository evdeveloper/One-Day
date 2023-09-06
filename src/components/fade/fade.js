export function fadeOut(el,timeout) {
  timeout = 5;
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;
  setTimeout(() => el.style.display = 'none', timeout);
};

export function fadeIn(el,display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity 5ms`;
  setTimeout(() => el.style.opacity = 1, 10);
  if(el.classList.contains('d-none')) {
    el.classList.remove('d-none');
  }
};