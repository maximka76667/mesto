import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open(name, link) {
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__title').textContent = name;

    super.open();
  }
}
