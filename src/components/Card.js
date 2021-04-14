export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardRemoving,
    cardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes ? data.likes.length : 0;
    this._likers = data.likes;
    this._id = data._id;
    this._myId = '72db3d92fc8d79fed59d83b8';
    this._ownerId = data.owner ? data.owner._id : this._myId;
    this.isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoving = handleCardRemoving;
    this._cardLike = cardLike;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => this._cardLike(this));

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

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    if (
      this._likers.some((liker) => {
        return liker._id == this._myId;
      })
    ) {
      this._cardLike(this);
    } else {
      this.isLiked = false;
    }

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
