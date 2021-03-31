export default class FormValidator {
  constructor(config, formElement, openingButtonSelector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._openingButtonSelector = openingButtonSelector;
    this._formElement = formElement;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._hasInvalidInput(this._inputList));

    this._formElement.addEventListener('submit', () => {
      this._toggleButtonState(this._hasInvalidInput(this._inputList));
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._hasInvalidInput(this._inputList));
      });
    });

    this._openingButton = document.querySelector(this._openingButtonSelector);
    this._openingButton.addEventListener('click', () =>
      this._clearValidation()
    );
  }

  _toggleButtonState(isValid) {
    if (isValid) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
      this._submitButtonElement.setAttribute('disabled', true);
    } else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  _checkInputValidity(inputElement) {
    this._errorMessage = inputElement.validationMessage;
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _clearValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(true);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
