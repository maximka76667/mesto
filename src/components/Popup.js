export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key == 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector('.popup__close-button')
      .addEventListener('click', () => this.close());
    this._popup
      .querySelector('.popup__overlay')
      .addEventListener('click', () => this.close());
  }
}
