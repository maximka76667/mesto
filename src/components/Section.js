import Card from "./Card";

export default class Section {
  constructor({ data }, containerSelector, handleCardClick) {
    this._initialArray = data;
    this._container = document.querySelector(containerSelector);
    this._handleCardClick = handleCardClick;
  }

  renderItems() {
    this._initialArray.forEach(element => {
      const cardElement = new Card(element, '#card', this._handleCardClick).generateCard();
      this.renderItem(cardElement);
    });
  }

  renderItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
} 