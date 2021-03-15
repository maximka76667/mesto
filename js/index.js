import { Card } from './Card.js'

const editingButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__submit-button');
const additionButton = document.querySelector('.profile__add-button');
const editingPopup = document.querySelector('.popup_type_editing');
const editingPopupTitle = editingPopup.querySelector('.popup__title');
const editingPopupName = editingPopup.querySelector('.popup__input_type_name');
const editingPopupPosition = editingPopup.querySelector('.popup__input_type_position');
const editingPopupForm = editingPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const additionPopup = document.querySelector('.popup_type_addition');
const additionPopupTitle = additionPopup.querySelector('.popup__title');
const additionPopupName = additionPopup.querySelector('.popup__input_type_name');
const additionPopupLink = additionPopup.querySelector('.popup__input_type_link');
const additionPopupForm = additionPopup.querySelector('.popup__form');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card').content;
// const overlays = Array.from(document.querySelectorAll('.popup__overlay'));
// const closeButtons = Array.from(document.querySelectorAll('.popup__close-button'));

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
  clearValidation(editingPopup, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass);

  openPopup(editingPopup);
}

function openAdditionPopup() {
  additionPopupForm.reset();
  const submitButton = additionPopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(submitButton, validationConfig.inactiveButtonClass, true);
  clearValidation(additionPopup, validationConfig.inputSelector, validationConfig.inputErrorClass, validationConfig.errorClass);

  openPopup(additionPopup);
}

function openImgPopup(event) {
  event.preventDefault();

  const popupImg = event.target;

  imgPopupTitle.textContent = popupImg.alt;
  imgPopupImage.alt = popupImg.alt;
  imgPopupImage.src = popupImg.src;

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
  const submitButton = additionPopup.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(submitButton, validationConfig.inactiveButtonClass, true);
}

// function createCard(card) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

//   const cardImage = cardElement.querySelector('.card__image');

//   cardElement.querySelector('.card__title').textContent = card.name;
//   cardImage.src = card.link;
//   cardImage.alt = card.name;
//   cardImage.addEventListener('click', openImgPopup);
//   cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
//     cardElement.remove();
//   })
//   cardElement.querySelector('.card__like-button').addEventListener('click', function(event) {
//     cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
//   })

//   return cardElement;
// }

// function addCard(card) {
//   cardsContainer.prepend(createCard(card));
// }

// function initializeCards(initialCard) {
  
// }

function setCloseEventListeners(element) {
  element.addEventListener('click', (event) => closePopup(event.target.closest('.popup')));
}

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.name, initialCard.link, '#card');
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

editingButton.addEventListener('click', openEditingPopup);
additionButton.addEventListener('click', openAdditionPopup);

editingPopupForm.addEventListener('submit', submitEditingForm);
additionPopupForm.addEventListener('submit', submitAdditionForm);

// overlays.forEach(setCloseEventListeners);
// closeButtons.forEach(setCloseEventListeners);