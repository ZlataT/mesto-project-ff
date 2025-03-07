function openModal(modal){
  modal.classList.add('popup_is-opened');
  modal.addEventListener('mousedown', closeModalOverleyClick);
  document.addEventListener('keydown', closeModalEsc);
}

//закрытие попапа
function closeModal(modal){
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('mousedown', closeModalOverleyClick);
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalOverleyClick(evt){
  if (evt.target === evt.currentTarget){
    closeModal(evt.currentTarget);
  }
}

function closeModalEsc(evt){
  if (evt.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export {openModal, closeModal}