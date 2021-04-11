export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  renderItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
