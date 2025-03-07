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

  
// @todo: Функция удаления карточки
function deleteCard (evt){
  const card = evt.target.closest('.card'); // запись события в переменную и поиск предка с определенным классом от нажатой кнопки 
  card.remove(); //удаление (родителя) карточки
}

// лайк карточки
function likeCard(evt){
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция создания карточки
function createCard (name, link, оnDelete, like, openModalCard){
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElemet = cardTemplate.querySelector('.card').cloneNode(true);//клонирование шаблона карточки
	
	cardElemet.querySelector('.card__image').src = link;
	cardElemet.querySelector('.card__image').alt = name; //запись в значение ссылки картинки
	cardElemet.querySelector('.card__title').textContent = name; //запись в значение заголовка карточки
	cardElemet.querySelector('.card__delete-button').addEventListener('click',оnDelete);
	cardElemet.querySelector('.card__like-button').addEventListener('click', like);
	cardElemet.querySelector('.card__image').addEventListener('click',function(){
		openModalCard(link, name)
	})
	return cardElemet; // возвращение шаблона подготовленного к заполнению
}

export {createCard,likeCard, handleAddCardFormSubmit,deleteCard}