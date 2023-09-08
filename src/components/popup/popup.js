const body = document.querySelector('body')

export function openModal(id) {
  document.querySelectorAll('[data-popup-target]').forEach(popup => {
    if(popup.classList.contains('show')) { popup.classList.remove('show'); }
  });
  document.querySelector(`[data-popup-target="${id}"]`).classList.add('show');
  body.classList.add('hidden');
}
export function closeModal(id) {
  document.querySelector(`[data-popup-target="${id}"]`).classList.remove('show');
  body.classList.remove('hidden');
}