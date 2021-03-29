import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitForm = submitForm;
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => this._handleEscClose(event));

    this._popup.querySelector('.popup__form').reset();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._inputValues = {};

    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })

    console.log(this._inputValues);
    return this._inputValues;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());

    this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitForm(this._getInputValues());
    });
  }
}