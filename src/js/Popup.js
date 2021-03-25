export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => this._handleEscClose(event));
  }

  _handleEscClose(event) {
    if(event.key == 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    
  }
}

// function setCloseEventListeners(element) {
//   element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
// }