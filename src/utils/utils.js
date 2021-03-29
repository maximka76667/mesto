function setInputValues({ name, position }, popupSelector) {
  document.querySelector(`${popupSelector} .popup__input_type_name`).value = name;
  document.querySelector(`${popupSelector} .popup__input_type_position`).value = position;
}

export { setInputValues }