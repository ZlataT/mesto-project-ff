import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {openModal, closeModal} from './scripts/modal.js'
import {createCard, likeCard, deleteCard} from './scripts/card.js'
import {setEventListeners, enableValidation, validationConfig, clearValidation } from './scripts/validation.js'


// @todo: DOM узлы
const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки

const popupTypeEditProfile = page.querySelector('.popup_type_edit'); //модалка редактирования профиля
const profileEditButton = page.querySelector('.profile__edit-button');

const popupTypeNewCard = page.querySelector('.popup_type_new-card'); //модалка создания новой карточки
const cardAddButton= page.querySelector('.profile__add-button');

const buttonsClosePopups = page.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(element){
  const cardElement = createCard(element.name, element.link, deleteCard, likeCard, openPopupCard);
  cardsContainer.append(cardElement);
})

// слушатель на кнопку закрытия модального окна
buttonsClosePopups.forEach (function (button){
  button.addEventListener('click', function(evt) {
    const modal = evt.target.closest('.popup');
    closeModal(modal);
  });
});

//добавление новой карточки
function handleAddCardFormSubmit(evt){
  evt.preventDefault();
  
  const namePlace = formPlaceName.value;
  const linkPlaceImage = formLinkImgPlace.value;
  
  const newCard = createCard (namePlace, linkPlaceImage, deleteCard, likeCard, openPopupCard)
  
  cardsContainer.prepend(newCard);
  closeModal(popupTypeNewCard);
  
  popupFormNewPlace.reset();
}


//------------ модалка редактирования профиля--------------

const profileTitle = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');

// форма редактирования профиля и его поля

const modalEditProfile = document.forms['edit-profile'];
const nameEditProfileInput = modalEditProfile.name;
const descriptionEditProfileInput = modalEditProfile.description;

//функция заполнения и открытия модульного окна редактирования профиля
profileEditButton.addEventListener('click', openEditProfilePopup);

function openEditProfilePopup(){
  nameEditProfileInput.value = profileTitle.textContent;
  descriptionEditProfileInput.value = profileDescription.textContent;
  openModal(popupTypeEditProfile);
}

//функиция сохрания изменений
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameEditProfileInput.value;
  const newDescription = descriptionEditProfileInput.value;
  
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(popupTypeEditProfile);
}

modalEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//----------- модалка добавления карточки---------

// открытие окна
cardAddButton.addEventListener('click', function(){
  openModal(popupTypeNewCard);});

//форма добавления изображения 

const popupFormNewPlace = document.forms['new-place']
const formPlaceName = popupFormNewPlace['place-name']
const formLinkImgPlace = popupFormNewPlace['link']


popupFormNewPlace.addEventListener('submit',handleAddCardFormSubmit)

const popupImageCard = document.querySelector('.popup_type_image');
const popupImageElmCard = popupImageCard.querySelector('.popup__image');
const popupCaptionElmCard = popupImageCard.querySelector('.popup__caption');

//------------------Модалка изображения карточки-------
function openPopupCard(link, name){
  popupImageElmCard.src = link;
  popupImageElmCard.alt = name;
  popupCaptionElmCard.textContent = name;

  openModal(popupImageCard);
}


//включение валидации 



//вешание очистки ошибок валидации на формы
profileEditButton.addEventListener('click', () => {
  clearValidation(modalEditProfile, validationConfig);
});

cardAddButton.addEventListener('click', () => {
  clearValidation(popupFormNewPlace, validationConfig);
});

enableValidation(validationConfig);

fetch('https://nomoreparties.co/v1/wff-cohort-34/cards', {
  headers: {
    authorization: '9e1f29a7-b0e6-43a9-ad98-57be15c5122f'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  fetch ('https://nomoreparties.co/v1/:wff-cohort-34/users/me',{
    method: 'GET', 
    headers: {
      authorization: '9e1f29a7-b0e6-43a9-ad98-57be15c5122f'
    },
  })
   
  