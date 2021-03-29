const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  closeButtonSelector: '.popup__close-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  editingButtonSelector: '.profile__edit-button',
  additionButtonSelector: '.profile__add-button'
}

const editingButton = document.querySelector('.profile__edit-button');
const editingPopup = document.querySelector('.popup_type_editing');
const editingPopupOverlay = editingPopup.querySelector('.popup__overlay');

const additionButton = document.querySelector('.profile__add-button');
const additionPopup = document.querySelector('.popup_type_addition');
const additionPopupOverlay = additionPopup.querySelector('.popup__overlay');

const imgPopup = document.querySelector('.popup_type_image');
const imgPopupOverlay = imgPopup.querySelector('.popup__overlay');
const imgPopupTitle = imgPopup.querySelector('.popup__title');
const imgPopupImage = imgPopup.querySelector('.popup__image');

export { initialCards, validationConfig, editingButton, editingPopupOverlay, additionButton, additionPopupOverlay, imgPopupImage, imgPopupTitle, imgPopupOverlay }