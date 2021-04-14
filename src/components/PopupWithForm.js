import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitForm = submitForm;
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._submitButtonTextDefault = this._submitButton.textContent;
  }

  close() {
    super.close();

    this._popup.querySelector('.popup__form').reset();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector('.popup__form')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        this._submitForm(this._getInputValues());
      });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Загрузка...';
    } else {
      this._submitButton.textContent = this._submitButtonTextDefault;
    }
  }
}
