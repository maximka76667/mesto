export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
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
