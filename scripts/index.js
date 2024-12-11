const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки

// @todo: DOM узлы

// @todo: Темплейт карточки

// @todo: Функция создания карточки
function createCard (name, link, OnDelete){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElemet = cardTemplate.querySelector('.card').cloneNode(true);//клонирование шаблона карточки
  
  cardElemet.querySelector('.card__image').src = link;
  cardElemet.querySelector('.card__image').alt = name; //запись в значение ссылки картинки
  cardElemet.querySelector('.card__title').textContent = name; //запись в значение заголовка карточки
  cardElemet.querySelector('.card__delete-button').addEventListener('click',OnDelete);

  return cardElemet; // возвращение шаблона подготовленного к заполнению
}

// @todo: Функция удаления карточки
function deleteCard (evt){
  const card = evt.target.closest('.card'); // запись события в переменную и поиск предка с определенным классом от нажатой кнопки 
    card.remove(); //удаление (родителя) карточки
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(element){
  const cardElement = createCard(element.name, element.link, deleteCard);
  cardsContainer.append(cardElement);
})

