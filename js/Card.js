const imgPopup = document.querySelector('.popup_type_image');
const imgPopupTitle = imgPopup.querySelector('.popup__title');
const imgPopupImage = imgPopup.querySelector('.popup__image');
const closeButton = imgPopup.querySelector('.popup__close-button');

export class Card {
  constructor (name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this.isLiked = false;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => this._like());

    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', () => this._delete());

    this._element
    .querySelector('.card__image')
    .addEventListener('click', () => this._handleOpenPopup())

    closeButton.addEventListener('click', () => this._handleClosePopup())
  }

  _delete() {
    this._element.remove();
  }

  _like() {
    this.isLiked = !this.isLiked;
    
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleOpenPopup() {
    imgPopupImage.src = this._link;
    imgPopupTitle.textContent = this._name;
    imgPopup.classList.add('popup_opened');
  }

  _handleClosePopup() {
    imgPopupImage.src = '';
    imgPopupTitle.textContent = '';
    imgPopup.classList.remove('popup_opened');
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }
}