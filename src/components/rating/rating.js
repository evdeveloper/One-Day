(() => {
  document.addEventListener('click', e => {
    if(e.target.closest('.rating__circle')) {
      const _self = e.target.closest('.rating__circle');
      const parent = _self.closest('.rating__list');
      parent.querySelectorAll('.rating__check').forEach(check => check.classList.remove('active'));
      _self.parentNode.classList.add('active');
    }
  });
})();