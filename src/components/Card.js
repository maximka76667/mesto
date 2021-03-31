export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this.isLiked = false;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => this._like());

    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', () => this._delete());

    this._image = this._element.querySelector('.card__image');
    this._image.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _delete() {
    this._element.remove();
  }

  _like() {
    this.isLiked = !this.isLiked;
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }
}
