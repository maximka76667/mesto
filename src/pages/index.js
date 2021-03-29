import './index.css'

import Section from '../components/Section'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithImage from '../components/PopupWithImage'

import { initialCards, validationConfig, editingButton, additionButton, imgPopupImage, imgPopupTitle } from '../utils/constants.js'
import UserInfo from '../components/UserInfo'

function handleCardClick(name, link) {
  imgPopupImage.src = link;
  imgPopupTitle.textContent = name;
  popupWithImage.open(name, link);
}

function createCard({ name, link }) {
  return new Card({ name, link }, '#card', handleCardClick).generateCard();
}

function createFormValidator(formElement, openingButtonSelector) {
  new FormValidator(validationConfig, formElement, openingButtonSelector).enableValidation();
}

function setInputValues({ name, position }, popupSelector) {
  document.querySelector(`${popupSelector} .popup__input_type_name`).value = name;
  document.querySelector(`${popupSelector} .popup__input_type_position`).value = position;
}

// UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__position');

// Editing Popup
const editingPopup = new PopupWithForm('.popup_type_editing', ({ profileName, profilePosition }) => {
  editingPopup.close();
  userInfo.setUserInfo(profileName, profilePosition);
});
editingPopup.setEventListeners();

editingButton.addEventListener('click', () => {
  setInputValues(userInfo.getUserInfo(), '.popup_type_editing');
  editingPopup.open();
});
const editingPopupOverlay = document.querySelector('.popup_type_editing .popup__overlay')
editingPopupOverlay.addEventListener('click', () => editingPopup.close());
createFormValidator(editingPopupForm, validationConfig.editingButtonSelector);

// Addition Popup
const additionPopup = new PopupWithForm('.popup_type_addition', ({ placeName, placeLink }) => {
  additionPopup.close();

  const cardElement = createCard({ name: placeName, link: placeLink });

  cardList.addItem(cardElement);
});
additionPopup.setEventListeners();

additionButton.addEventListener('click', () => additionPopup.open());
const additionPopupOverlay = document.querySelector('.popup_type_addition .popup__overlay');
additionPopupOverlay.addEventListener('click', () => additionPopup.close());
createFormValidator(additionPopupForm, validationConfig.additionButtonSelector);

// Image Popup
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const imgPopupOverlay = document.querySelector('.popup_type_image .popup__overlay')
imgPopupOverlay.addEventListener('click', () => popupWithImage.close());

const cardList = new Section({ data: initialCards }, '.cards__container', handleCardClick);
cardList.renderItems();