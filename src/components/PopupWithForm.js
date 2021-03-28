import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    
  }
}