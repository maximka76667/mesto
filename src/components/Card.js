export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardRemoving) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes ? data.likes.length : 0;
    this._id = data._id;
    this._ownerId = data.owner ? data.owner._id : '72db3d92fc8d79fed59d83b8';
    this._templateSelector = templateSelector;
    this.isLiked = false;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoving = handleCardRemoving;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => this._like());

    this._deleteButton = this._element.querySelector('.card__delete-button');
    if (this._ownerId == '72db3d92fc8d79fed59d83b8') {
      this._deleteButton.addEventListener('click', () => {
        this._handleCardRemoving(this._element);
      });
    } else {
      this._deleteButton.remove();
    }

    this._image = this._element.querySelector('.card__image');
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
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

    this._element.setAttribute('data-id', this._id);
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._likesCount = this._element.querySelector('.card__likes-count');
    this._likesCount.textContent = this._likes;
    return this._element;
  }
}
