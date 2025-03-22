import {fetchDeleteCard, fetchLikeCard} from './api'

// @todo: Функция удаления карточки
function deleteCard (cardElement, idCard){
  fetchDeleteCard(idCard)
		.then(() => {
			cardElement.remove()
		})
		.catch(err => {
			console.log(`Ошибка при удалении карточки: ${err}`)
		})
}

// лайк карточки
function likeCard(likeButton, cardId, likesCount){
  
  const liked = likeButton.classList.contains('card__like-button_is-active');//булевое значение наличия класса

  fetchLikeCard(liked, cardId)
    .then(updatedCard => {
      likesCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
      
    })
    .catch(err => console.log(err))
}

// @todo: Функция создания карточки
function createCard (cardData, cardId, userId, оnDelete, like, openModalCard){
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElemet = cardTemplate.querySelector('.card').cloneNode(true);//клонирование шаблона карточки
	const cardDeleteButton = cardElemet.querySelector('.card__delete-button');
  const likeButton = cardElemet.querySelector('.card__like-button');
  const likesCount = cardElemet.querySelector('.card__like-count')

	likesCount.textContent = cardData.likes.length;

	cardElemet.querySelector('.card__image').src = cardData.link;
	cardElemet.querySelector('.card__image').alt = cardData.name; //запись в значение ссылки картинки
	cardElemet.querySelector('.card__title').textContent = cardData.name; //запись в значение заголовка карточки

  likeButton.addEventListener('click', () => {like (likeButton, cardId, likesCount)});
	cardElemet.querySelector('.card__image').addEventListener('click',function(){
		openModalCard(cardData.link, cardData.name)
	})

  const hasLike = cardData.likes.some(like => like._id === userId)
  if(hasLike){
    likeButton.classList.add('card__like-button_is-active');
  }

	if (cardData.owner._id !== userId) {
		cardDeleteButton.remove(); // 
	}else {
	  cardDeleteButton.addEventListener('click', () => оnDelete (cardElemet, cardId));}

	return cardElemet; // возвращение шаблона подготовленного к заполнению
}

export {createCard,likeCard, deleteCard}