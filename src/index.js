
import {fetchNewCard, fetchUserData, fetchCards, fetchEditProfile, fetchEditAvatar} from './scripts/api.js'
import './pages/index.css'
import {openModal, closeModal} from './scripts/modal.js'
import {createCard, likeCard, deleteCard} from './scripts/card.js'
import {enableValidation, clearValidation } from './scripts/validation.js'


// @todo: DOM узлы
const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки



const popupTypeEditProfile = page.querySelector('.popup_type_edit'); //модалка редактирования профиля
const profileEditButton = page.querySelector('.profile__edit-button');

const popupTypeNewCard = page.querySelector('.popup_type_new-card'); //модалка создания новой карточки
const cardAddButton= page.querySelector('.profile__add-button');

const popupAvatar = page.querySelector('.popup_type_avatar');
const buttonEditAvatar = page.querySelector('.profile__image');
const avatarForm = document.forms['edit-avatar'];
const inputLinkAvatar = avatarForm.name;

const buttonsClosePopups = page.querySelectorAll('.popup__close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function renderLoading (isLoading, formElement){
  const buttonElement = formElement.querySelector('.popup__button')
  if (isLoading) {
		buttonElement.setAttribute('data-text', buttonElement.textContent)
		buttonElement.textContent = 'Сохранение...'
	} else {
		buttonElement.textContent = buttonElement.getAttribute('data-text')
		buttonElement.removeAttribute('data-text')
	}
}

buttonEditAvatar.addEventListener('click', function(){
  avatarForm.reset();
  openModal(popupAvatar);
})

avatarForm.addEventListener('submit', editAvatarSumbit);


function editAvatarSumbit(evt){
  evt.preventDefault()
  renderLoading(true, avatarForm)
  const avatarLink = inputLinkAvatar.value;
  fetchEditAvatar(avatarLink)
    .then(avatar =>{
      buttonEditAvatar.style.backgroundImage = `url(${avatar.avatar})`;
      avatarForm.reset();
      closeModal(popupAvatar);
    })
    .catch(err => console.log(err))
    .finally(()=>{
      renderLoading(false, avatarForm)
    })
}

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
  renderLoading(true, popupFormNewPlace)
  const namePlace = formPlaceName.value;
  const linkPlaceImage = formLinkImgPlace.value;
  
  fetchNewCard(namePlace, linkPlaceImage)
    .then((cardData)=>{
      const newCard = createCard (cardData, cardData._id, userData._id, deleteCard, likeCard, openPopupCard);
      
      cardsContainer.prepend(newCard);
      closeModal(popupTypeNewCard);
      
      popupFormNewPlace.reset();
    })
    .finally(()=>{
      renderLoading(false, popupFormNewPlace)
    })
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
  clearValidation(modalEditProfile, validationConfig);
  openModal(popupTypeEditProfile);
}

//функиция сохрания изменений
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, modalEditProfile)
  const newName = nameEditProfileInput.value;
  const newDescription = descriptionEditProfileInput.value;

  fetchEditProfile(newName, newDescription)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEditProfile);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(()=>{
      renderLoading(false, modalEditProfile)
    })
    
}

modalEditProfile.addEventListener('submit', handleProfileFormSubmit); 

//----------- модалка добавления карточки---------

// открытие окна
cardAddButton.addEventListener('click', function(){
  clearValidation(popupFormNewPlace, validationConfig);
  openModal(popupTypeNewCard);
});

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


enableValidation(validationConfig);


//вывод всех карточек если запросы верны
Promise.all([fetchUserData(), fetchCards()])
  .then(([userData, cards]) => {
    //записываем данные о себе с сервера
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    buttonEditAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, cardData._id, userData._id, deleteCard, likeCard, openPopupCard);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

