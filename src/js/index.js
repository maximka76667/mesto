import '../pages/index.css'


import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Popup from './Popup.js'

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
const additionButton = document.querySelector('.profile__add-button');
const editingPopup = document.querySelector('.popup_type_editing');
const editingPopupName = editingPopup.querySelector('.popup__input_type_name');
const editingPopupPosition = editingPopup.querySelector('.popup__input_type_position');
const editingPopupForm = editingPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const additionPopup = document.querySelector('.popup_type_addition');
const additionPopupName = additionPopup.querySelector('.popup__input_type_name');
const additionPopupLink = additionPopup.querySelector('.popup__input_type_link');
const additionPopupForm = additionPopup.querySelector('.popup__form');
const cardsContainer = document.querySelector('.cards__container');
const overlays = Array.from(document.querySelectorAll('.popup__overlay'));
const closeButtons = Array.from(document.querySelectorAll('.popup__close-button'));
const forms = Array.from(document.querySelectorAll('.popup__form'));
const imgPopup = document.querySelector('.popup_type_image');
const imgPopupTitle = imgPopup.querySelector('.popup__title');
const imgPopupImage = imgPopup.querySelector('.popup__image');

function openEditingPopup() {
  editingPopupName.value = profileName.textContent;
  editingPopupPosition.value = profilePosition.textContent;

  openPopup(editingPopup);
}

function openAdditionPopup() {
  additionPopupForm.reset();

  openPopup(additionPopup);
}

function handleCardClick(name, link) {
  imgPopupImage.src = link;
  imgPopupTitle.textContent = name;
  openPopup(imgPopup);
}

function submitEditingForm(event) {
  event.preventDefault();
  
  profileName.textContent = editingPopupName.value;
  profilePosition.textContent = editingPopupPosition.value;

  closePopup(editingPopup);

  editingPopupForm.reset();
}

function submitAdditionForm(event) {
  event.preventDefault();

  addCard({
    name: additionPopupName.value,
    link: additionPopupLink.value
  });

  closePopup(additionPopup);

  additionPopupForm.reset();
}

function createCard(cardData) {
  return new Card(cardData, '#card', handleCardClick).generateCard();
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function createFormValidator(formElement, openingButtonSelector) {
  new FormValidator(validationConfig, formElement, openingButtonSelector).enableValidation();
}

initialCards.forEach((initialCard) => {
  cardsContainer.append(createCard(initialCard));
});

editingButton.addEventListener('click', openEditingPopup);
editingPopupForm.addEventListener('submit', submitEditingForm);
createFormValidator(editingPopupForm, validationConfig.editingButtonSelector);

additionButton.addEventListener('click', openAdditionPopup);
additionPopupForm.addEventListener('submit', submitAdditionForm);
createFormValidator(additionPopupForm, validationConfig.additionButtonSelector);

overlays.forEach((overlay) => setCloseEventListeners(overlay));
closeButtons.forEach((closeButton) => setCloseEventListeners(closeButton));
