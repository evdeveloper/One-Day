const body = document.querySelector('body')

export function openModal(id) {
  document.querySelector(`[data-popup-target="${id}"]`).classList.add('show');
  body.classList.add('hidden');
}
export function closeModal(id) {
  document.querySelector(`[data-popup-target="${id}"]`).classList.remove('show');
  if(id === 'agree' && document.querySelectorAll('.popup.show').length >= 1) return;
  body.classList.remove('hidden');
}