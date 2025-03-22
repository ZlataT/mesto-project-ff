  //базовые настройки запроса
const config = {
    baseUrl : 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: { 
      authorization: '9e1f29a7-b0e6-43a9-ad98-57be15c5122f',
      'Content-Type': 'application/json'
    }
  }

  export function fetchNewCard(name, link){
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST', 
      headers: {
        authorization: config.headers.authorization, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(checkResponse);
  }
  
  export function fetchDeleteCard(cardId){
    return fetch(`${config.baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: config.headers.authorization,}
    })
    .then(checkResponse);
  }
  
  export function fetchLikeCard(isLiked, cardId){
    const method = isLiked ? 'DELETE' : 'PUT'
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
      method,
      headers: {
        authorization: config.headers.authorization,}
    })
    .then(checkResponse);
  }
  
  //проверка ответа то сервера
  export function checkResponse(res){
    if (res.ok){
      return res.json();
    } else {
      return Promise.reject (`Ошибка ${res.status}`)
    }
  }
  
  //функция запроса данных пользователя
export  function fetchUserData(){
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET', 
      headers: {
        authorization : config.headers.authorization
      }
    })
    .then(checkResponse);
  }
  
  //функция запроса карточек
  export function fetchCards (){
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET', 
      headers: {
        authorization : config.headers.authorization
      }
    })
    .then(checkResponse);
  }
  
  // запрос отредактированного профиля
export function fetchEditProfile(name, about){
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH', 
      headers: {
        authorization: config.headers.authorization, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(checkResponse)
  }

export function fetchEditAvatar(avatar){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH', 
        headers: {
          authorization: config.headers.authorization, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            avatar: avatar,
        })
      })
      .then(checkResponse)
}