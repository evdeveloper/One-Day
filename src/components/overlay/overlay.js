const body = document.querySelector('body');
const filterModal = document.querySelector('.filterModal');

export function overlayAdd() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  body.classList.add('hidden');
  body.appendChild(overlay);
}
export function overlayRemove() {
  const overlay = document.querySelector('.overlay');
  filterModal.classList.remove('active');
  if (overlay) { overlay.remove(); }
  body.classList.remove('hidden');
}