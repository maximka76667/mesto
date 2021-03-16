import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

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
  errorClass: 'popup__error_visible'
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


function openPopup(popup) {
  document.addEventListener('keydown', keyHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(event) {
  if(event.key == 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openEditingPopup() {
  editingPopupName.value = profileName.textContent;
  editingPopupPosition.value = profilePosition.textContent;

  openPopup(editingPopup);
}

function openAdditionPopup() {
  additionPopupForm.reset();

  openPopup(additionPopup);
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
  return new Card(cardData.name, cardData.link, '#card').generateCard();
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function setCloseEventListeners(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
}

initialCards.forEach((initialCard) => {
  cardsContainer.append(createCard(initialCard));
});

editingButton.addEventListener('click', openEditingPopup);
additionButton.addEventListener('click', openAdditionPopup);

editingPopupForm.addEventListener('submit', submitEditingForm);
additionPopupForm.addEventListener('submit', submitAdditionForm);

overlays.forEach((overlay) => setCloseEventListeners(overlay));
closeButtons.forEach((closeButton) => setCloseEventListeners(closeButton));

forms.forEach((form) => {
  new FormValidator(validationConfig, form).enableValidation();
});