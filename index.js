import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {openModal, closeModal} from './scripts/modal.js'
import {createCard,likeCard, handleAddCardFormSubmit,deleteCard} from './scripts/card.js'

// @todo: DOM узлы
const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки

const popupTypeEditProfile = page.querySelector('.popup_type_edit'); //модалка редактирования профиля
const profileEditButton = page.querySelector('.profile__edit-button');

const popupTypeNewCard = page.querySelector('.popup_type_new-card'); //модалка создания новой карточки
const cardAddButton= page.querySelector('.profile__add-button');

const buttonsClosePopups = page.querySelectorAll('.popup__close');


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

  openModal(popupImage);
}





