(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",r),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",r),document.removeEventListener("keydown",n)}function r(e){e.target===e.currentTarget&&t(e.currentTarget)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e){e.target.closest(".card").remove()}function c(e){e.target.classList.toggle("card__like-button_is-active")}function a(e,t,r,n,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);return c.querySelector(".card__image").src=t,c.querySelector(".card__image").alt=e,c.querySelector(".card__title").textContent=e,c.querySelector(".card__delete-button").addEventListener("click",r),c.querySelector(".card__like-button").addEventListener("click",n),c.querySelector(".card__image").addEventListener("click",(function(){o(t,e)})),c}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t,r){var n=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(r.inputErrorClass),n.textContent="",n.classList.remove(r.errorClass)},u=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},l=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){s(e,r,t)})),u(r,n,t)},d=document.querySelector(".page"),p=d.querySelector(".places__list"),f=d.querySelector(".popup_type_edit"),m=d.querySelector(".profile__edit-button"),v=d.querySelector(".popup_type_new-card"),_=d.querySelector(".profile__add-button"),y=d.querySelectorAll(".popup__close");document.querySelector(".popup__form"),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=a(e.name,e.link,o,c,A);p.append(t)})),y.forEach((function(e){e.addEventListener("click",(function(e){t(e.target.closest(".popup"))}))}));var S=d.querySelector(".profile__title"),q=d.querySelector(".profile__description"),h=document.forms["edit-profile"],k=h.name,E=h.description;m.addEventListener("click",(function(){k.value=S.textContent,E.value=q.textContent,e(f)})),h.addEventListener("submit",(function(e){e.preventDefault();var r=k.value,n=E.value;S.textContent=r,q.textContent=n,t(f)})),_.addEventListener("click",(function(){e(v)}));var L=document.forms["new-place"],b=L["place-name"],g=L.link;L.addEventListener("submit",(function(e){e.preventDefault();var r=a(b.value,g.value,o,c,A);p.prepend(r),t(v),L.reset()}));var C,x=document.querySelector(".popup_type_image"),w=x.querySelector(".popup__image"),j=x.querySelector(".popup__caption");function A(t,r){w.src=t,w.alt=r,j.textContent=r,e(x)}m.addEventListener("click",(function(){l(h,i)})),_.addEventListener("click",(function(){l(L,i)})),C=i,Array.from(document.querySelectorAll(C.formSelector)).forEach((function(e){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);u(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.valid?s(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),u(r,n,t)}))}))}(e,C)})),fetch("https://nomoreparties.co/v1/wff-cohort-34/cards",{headers:{authorization:"9e1f29a7-b0e6-43a9-ad98-57be15c5122f"}}).then((function(e){return e.json()})).then((function(e){console.log(e)})),fetch("https://nomoreparties.co/v1/:wff-cohort-34/users/me",{method:"GET",headers:{authorization:"9e1f29a7-b0e6-43a9-ad98-57be15c5122f"}})})();