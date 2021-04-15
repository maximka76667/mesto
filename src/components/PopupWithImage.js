import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;

    super.open();
  }
}
