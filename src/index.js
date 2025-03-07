import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {openModal, closeModal} from './scripts/modal.js'
import {createCard,likeCard,deleteCard} from './scripts/card.js'

// @todo: DOM узлы
const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки

const popupTypeEdit = page.querySelector('.popup_type_edit'); //модалка редактирования профиля
const profileEditButton = page.querySelector('.profile__edit-button');

const popupTypeNewCard = page.querySelector('.popup_type_new-card'); //модалка создания новой карточки
const cardAddButton= page.querySelector('.profile__add-button');

const buttonClosePopup = page.querySelectorAll('.popup__close');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(element){
  const cardElement = createCard(element.name, element.link, deleteCard, likeCard, openPopupCard);
  cardsContainer.append(cardElement);
})

// слушатель на кнопку закрытия модального окна
buttonClosePopup.forEach (function (button){
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
profileEditButton.addEventListener('click', openEditPopup);

function openEditPopup(){
  nameEditProfileInput.value = profileTitle.textContent;
  descriptionEditProfileInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

//функиция сохрания изменений
function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameEditProfileInput.value;
  const newDescription = descriptionEditProfileInput.value;
  
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closeModal(popupTypeEdit);
}

modalEditProfile.addEventListener('submit', handleFormSubmit); 

//----------- модалка добавления карточки---------

// открытие окна
cardAddButton.addEventListener('click', function(){
  openModal(popupTypeNewCard);});

//форма добавления изображения 

const popupFormNewPlace = document.forms['new-place']
const formPlaceName = popupFormNewPlace['place-name']
const formLinkImgPlace = popupFormNewPlace['link']


popupFormNewPlace.addEventListener('submit',handleAddCardFormSubmit)

//------------------Модалка изображения-------
function openPopupCard(link, name){
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElm = popupImage.querySelector('.popup__image');
  const popupCaptionElm = popupImage.querySelector('.popup__caption');

  popupImageElm.src = link;
  popupImageElm.alt = name;
  popupCaptionElm.textContent = name;

  openModal(popupImage);
}



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

