(()=>{"use strict";var t="https://nomoreparties.co/v1/wff-cohort-34",e="9e1f29a7-b0e6-43a9-ad98-57be15c5122f";function n(t){return t.ok?t.json():Promise.reject("Ошибка ".concat(t.status))}function r(t){t.classList.add("popup_is-opened"),t.addEventListener("mousedown",a),document.addEventListener("keydown",c)}function o(t){t.classList.remove("popup_is-opened"),t.removeEventListener("mousedown",a),document.removeEventListener("keydown",c)}function a(t){t.target===t.currentTarget&&o(t.currentTarget)}function c(t){"Escape"===t.key&&o(document.querySelector(".popup_is-opened"))}function i(r,o){var a;(a=o,fetch("".concat(t,"/cards/").concat(a),{method:"DELETE",headers:{authorization:e}}).then(n)).then((function(){r.remove()})).catch((function(t){console.log("Ошибка при удалении карточки: ".concat(t))}))}function u(r,o,a){(function(r,o){var a=r?"DELETE":"PUT";return fetch("".concat(t,"/cards/likes/").concat(o),{method:a,headers:{authorization:e}}).then(n)})(r.classList.contains("card__like-button_is-active"),o).then((function(t){a.textContent=t.likes.length,r.classList.toggle("card__like-button_is-active")})).catch((function(t){return console.log(t)}))}function l(t,e,n,r,o,a){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-count");l.textContent=t.likes.length,c.querySelector(".card__image").src=t.link,c.querySelector(".card__image").alt=t.name,c.querySelector(".card__title").textContent=t.name,u.addEventListener("click",(function(){o(u,e,l)})),c.querySelector(".card__image").addEventListener("click",(function(){a(t.link,t.name)}));var s=t.likes.some((function(t){return t._id===n}));return s&&u.classList.add("card__like-button_is-active"),t.owner._id!==n?i.remove():i.addEventListener("click",(function(){return r(c,e)})),c}var s=function(t,e,n){var r=t.querySelector(".".concat(e.name,"-error"));e.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)},d=function(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled=!0,e.classList.add(n.inactiveButtonClass))},f=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(n){s(t,n,e)})),d(n,r,e)};function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var v=document.querySelector(".page"),m=v.querySelector(".places__list"),_=v.querySelector(".popup_type_edit"),y=v.querySelector(".profile__edit-button"),h=v.querySelector(".popup_type_new-card"),S=v.querySelector(".profile__add-button"),b=v.querySelector(".popup_type_avatar"),g=v.querySelector(".profile__image"),E=document.forms["edit-avatar"],q=E.name,C=v.querySelectorAll(".popup__close"),L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function k(t,e){var n=e.querySelector(".popup__button");t?(n.setAttribute("data-text",n.textContent),n.textContent="Сохранение..."):(n.textContent=n.getAttribute("data-text"),n.removeAttribute("data-text"))}g.addEventListener("click",(function(){E.reset(),r(b)})),E.addEventListener("submit",(function(r){var a;r.preventDefault(),k(!0,E),(a=q.value,fetch("".concat(t,"/users/me/avatar"),{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({avatar:a})}).then(n)).then((function(t){g.style.backgroundImage="url(".concat(t.avatar,")"),E.reset(),o(b)})).catch((function(t){return console.log(t)})).finally((function(){k(!1,E)}))})),C.forEach((function(t){t.addEventListener("click",(function(t){o(t.target.closest(".popup"))}))}));var x=v.querySelector(".profile__title"),A=v.querySelector(".profile__description"),T=document.forms["edit-profile"],w=T.name,j=T.description;y.addEventListener("click",(function(){w.value=x.textContent,j.value=A.textContent,f(T,L),r(_)})),T.addEventListener("submit",(function(r){var a,c;r.preventDefault(),k(!0,T),(a=w.value,c=j.value,fetch("".concat(t,"/users/me"),{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:a,about:c})}).then(n)).then((function(t){x.textContent=t.name,A.textContent=t.about,o(_)})).catch((function(t){console.error("Ошибка при обновлении профиля:",t)})).finally((function(){k(!1,T)}))})),S.addEventListener("click",(function(){f(z,L),r(h)}));var z=document.forms["new-place"],O=z["place-name"],B=z.link;z.addEventListener("submit",(function(r){var a,c;r.preventDefault(),k(!0,z),(a=O.value,c=B.value,fetch("".concat(t,"/cards"),{method:"POST",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:a,link:c})}).then(n)).then((function(t){var e=l(t,t._id,userData._id,i,u,J);m.prepend(e),o(h),z.reset()})).finally((function(){k(!1,z)}))}));var D,P=document.querySelector(".popup_type_image"),I=P.querySelector(".popup__image"),N=P.querySelector(".popup__caption");function J(t,e){I.src=t,I.alt=e,N.textContent=e,r(P)}D=L,Array.from(document.querySelectorAll(D.formSelector)).forEach((function(t){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);d(n,r,e),n.forEach((function(o){o.addEventListener("input",(function(){!function(t,e,n){e.validity.valid?s(t,e,n):function(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(t,e,e.validationMessage,n)}(t,o,e),d(n,r,e)}))}))}(t,D)})),Promise.all([fetch("".concat(t,"/users/me"),{method:"GET",headers:{authorization:e}}).then(n),fetch("".concat(t,"/cards"),{method:"GET",headers:{authorization:e}}).then(n)]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return p(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];x.textContent=o.name,A.textContent=o.about,g.style.backgroundImage="url(".concat(o.avatar,")"),a.forEach((function(t){var e=l(t,t._id,o._id,i,u,J);m.append(e)}))})).catch((function(t){console.error("Ошибка при загрузке данных:",t)}))})();