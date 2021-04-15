const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
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
  additionButtonSelector: '.profile__add-button',
  avatarSelector: '.profile__avatar',
  avatarImageSelector: '.profile__avatar-image',
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__position',
};

const editingButton = document.querySelector(
  validationConfig.editingButtonSelector
);

const additionButton = document.querySelector(
  validationConfig.additionButtonSelector
);

const imgPopup = document.querySelector('.popup_type_image');
const imgPopupTitle = imgPopup.querySelector('.popup__title');
const imgPopupImage = imgPopup.querySelector('.popup__image');

const profile = document.querySelector('.profile__container');
const avatar = profile.querySelector(validationConfig.avatarSelector);
const avatarImage = profile.querySelector(validationConfig.avatarImageSelector);
const profileName = profile.querySelector('.profile__name');
const profilePosition = profile.querySelector('.profile__position');

export {
  initialCards,
  validationConfig,
  editingButton,
  additionButton,
  imgPopupImage,
  imgPopupTitle,
  avatar,
  avatarImage,
  profileName,
  profilePosition,
};
