// ----------------валидация форм---------------




const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

//показ ошибки валидации
const showInputError = (formElement, inputElement, errorMassage, setting) =>{
  const  errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMassage;
  errorElement.classList.add(setting.errorClass);
}

//скрытие ошибки валидации
const hideInputError = (formElement, inputElement, setting) =>{
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.textContent ='';
  errorElement.classList.remove(setting.errorClass);
}

//проверка наа валидность поля
const checkInputValidity = (formElement, inputElement, setting) =>{
  if(!inputElement.validity.valid){
    showInputError (formElement, inputElement,inputElement.validationMessage ,setting)
  } else{
    hideInputError(formElement, inputElement, setting);
  };
}

const hasInvalidInput = (inputList, validationConfig) => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
    })
}


//состояние кнопки при ваалидации
const toggleButtonState = (inputList, buttonElement, setting) => {
  
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(setting.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(setting.inactiveButtonClass);
  }
};

// слушатель проверки валидности на каждое поле
const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, setting);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, setting);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};

const enableValidation = (setting) =>{
    const formList = Array.from(document.querySelectorAll(setting.formSelector));
    formList.forEach((formElement)=>{
      setEventListeners(formElement ,setting);
    });
  };
  
// очищение ошибок валидации
const clearValidation =(formElement,setting)=>{
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);

  inputList.forEach(inputElement =>{
    hideInputError(formElement, inputElement, setting);
  });

toggleButtonState(inputList, buttonElement, setting);

}


export {setEventListeners, enableValidation, validationConfig, clearValidation}