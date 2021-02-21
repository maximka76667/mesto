const checkInputValidity = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorMessage = inputElement.validationMessage;
  if (!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage, inputErrorClass, errorClass});
  } else {
    hideInputError({formElement, inputElement, inputErrorClass, errorClass});
  }
};

const showInputError = ({formElement, inputElement, errorMessage, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = ({formElement, inputElement, inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (buttonElement, inactiveButtonClass, isValid) => {
  if(isValid) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = ({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  toggleButtonState(buttonElement, inactiveButtonClass, hasInvalidInput(inputList));
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity({formElement, inputElement, inputErrorClass, errorClass});
      toggleButtonState(buttonElement, inactiveButtonClass, hasInvalidInput(inputList));
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formElements = document.querySelectorAll(formSelector);
  const formList = Array.from(formElements);

  formList.forEach(formElement => {
    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  })
};

enableValidation(validationConfig);