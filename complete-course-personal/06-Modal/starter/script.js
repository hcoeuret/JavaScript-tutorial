'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

function onModalClick() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function hideModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

closeButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', onModalClick);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
