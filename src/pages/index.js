import './index.css'

import Section from '../components/Section'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithImage from '../components/PopupWithImage'

import { initialCards, validationConfig, editingButton, additionButton, imgPopupImage, imgPopupTitle } from '../utils/constants.js'

// function openEditingPopup() {
//   editingPopupName.value = profileName.textContent;
//   editingPopupPosition.value = profilePosition.textContent;

//   openPopup(editingPopup);
// }

// function openAdditionPopup() {
//   additionPopupForm.reset();

//   openPopup(additionPopup);
// }

function handleCardClick(name, link) {
  imgPopupImage.src = link;
  imgPopupTitle.textContent = name;
  popupWithImage.open(name, link);
}

// function submitEditingForm(event) {
//   event.preventDefault();
  
//   profileName.textContent = editingPopupName.value;
//   profilePosition.textContent = editingPopupPosition.value;

//   closePopup(editingPopup);

//   editingPopupForm.reset();
// }

// function submitAdditionForm(event) {
//   event.preventDefault();

//   addCard({
//     name: additionPopupName.value,
//     link: additionPopupLink.value
//   });

//   closePopup(additionPopup);

//   additionPopupForm.reset();
// }

// function createCard(cardData) {
//   return new Card(cardData, '#card', handleCardClick).generateCard();
// }

// function addCard(card) {
//   cardsContainer.prepend(createCard(card));
// }

function createFormValidator(formElement, openingButtonSelector) {
  new FormValidator(validationConfig, formElement, openingButtonSelector).enableValidation();
}

// initialCards.forEach((initialCard) => {
//   cardsContainer.append(createCard(initialCard));
// });

const editingPopup = new Popup('.popup_type_editing');
editingPopup.setEventListeners();

editingButton.addEventListener('click', () => editingPopup.open());
// editingPopupForm.addEventListener('submit', submitEditingForm);
createFormValidator(editingPopupForm, validationConfig.editingButtonSelector);

const additionPopup = new PopupWithForm('.popup_type_addition');
additionPopup.setEventListeners();

additionButton.addEventListener('click', () => additionPopup.open());
// additionPopupForm.addEventListener('submit', submitAdditionForm);
createFormValidator(additionPopupForm, validationConfig.additionButtonSelector);

// overlays.forEach((overlay) => setCloseEventListeners(overlay));
// closeButtons.forEach((closeButton) => setCloseEventListeners(closeButton));

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const cardList = new Section({ data: initialCards }, '.cards__container', handleCardClick);
cardList.renderItems();