const page = document.querySelector('.page'); //все элементы body 
const cardsContainer = page.querySelector('.places__list'); //элемент куда будем вставлять карточки

// @todo: DOM узлы

// @todo: Темплейт карточки

// @todo: Функция создания карточки
function createCard (name, link){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElemet = cardTemplate.querySelector('.card').cloneNode(true);//клонирование шаблона карточки
  
  cardElemet.querySelector('.card__image').src = link;
  cardElemet.querySelector('.card__image').alt = name; //запись в значение ссылки картинки
  cardElemet.querySelector('.card__title').textContent = name; //запись в значение заголовка карточки
  cardElemet.querySelector('.card__delete-button').addEventListener('click', function(evt){
    const card = evt.target.closest('.card'); // запись события в переменную и поиск предка с определенным классом от нажатой кнопки 
    card.remove(); //удаление (родителя) карточки
  }); //добавление кнопке функцию удаления при нажатии

  return cardElemet; // возвращение шаблона подготовленного к заполнению
}

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу

initialCards.forEach(function(element){
  const cardElement = createCard(element.name, element.link)
  cardsContainer.append(cardElement);
})

//Большое спасибо за ревью
//Не поняла немного замечания предать удаление карточки как параметр в функции создания карточки, решила реализовать "одной строкой", но придерживаюсь метода подробного написания кода для более удобной читаемости в дальнейшем
//Объясните пожалуйста в чем разница вызова функции или передача ее как параметра
//Не понятно написано замечание в 9 строке
//"Функция должна принимать как параметры кроме объекта с атрибутами карточки, обработчик события удаления карточки deleteCard."