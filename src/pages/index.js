import './index.css'

import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

import { initialCards, 
  validationConfig, 
  editingButton, 
  editingPopupOverlay, 
  additionButton, 
  additionPopupOverlay, 
  imgPopupImage, 
  imgPopupTitle, 
  imgPopupOverlay 
} from '../utils/constants.js'

import { setInputValues } from '../utils/utils.js'

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
additionPopupOverlay.addEventListener('click', () => additionPopup.close());
createFormValidator(additionPopupForm, validationConfig.additionButtonSelector);

// Image Popup
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

imgPopupOverlay.addEventListener('click', () => popupWithImage.close());

const cardList = new Section({ 
  data: initialCards,
  renderer: (element) => {
    const cardElement = new Card(element, '#card', handleCardClick).generateCard();
    cardList.renderItem(cardElement);
  }
}, '.cards__container', handleCardClick);

cardList.renderItems();