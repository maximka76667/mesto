import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  validationConfig,
  editingButton,
  additionButton,
  imgPopupImage,
  imgPopupTitle,
  avatar,
  profileName,
  profilePosition,
} from '../utils/constants.js';

import { setInputValues } from '../utils/utils.js';

function handleCardClick(name, link) {
  imgPopupImage.src = link;
  imgPopupTitle.textContent = name;
  popupWithImage.open(name, link);
}

function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, () => {
    removingPopup.open();
  }).generateCard();
  return card;
}

function createFormValidator(formElement, openingButtonSelector) {
  new FormValidator(
    validationConfig,
    formElement,
    openingButtonSelector
  ).enableValidation();
}

// UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__position');

// Editing Popup
const editingPopup = new PopupWithForm(
  '.popup_type_editing',
  ({ profileName, profilePosition }) => {
    editingPopup.close();
    userInfo.setUserInfo(profileName, profilePosition);
    api.setProfileInfo({ profileName, profilePosition });
  }
);
editingPopup.setEventListeners();

editingButton.addEventListener('click', () => {
  setInputValues(userInfo.getUserInfo(), '.popup_type_editing');
  editingPopup.open();
});
createFormValidator(editingPopupForm, validationConfig.editingButtonSelector);

// Addition Popup
const additionPopup = new PopupWithForm(
  '.popup_type_addition',
  ({ placeName, placeLink }) => {
    const cardElement = createCard({ name: placeName, link: placeLink });
    cardList.addItem(cardElement);
    api.addCard({ name: placeName, link: placeLink });
    additionPopup.close();
  }
);
additionPopup.setEventListeners();
additionButton.addEventListener('click', () => additionPopup.open());
createFormValidator(additionPopupForm, validationConfig.additionButtonSelector);

// Image Popup
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// Avatar Popup

const avatarPopup = new PopupWithForm(
  '.popup_type_avatar',
  ({ avatarLink }) => {
    avatar.querySelector('.profile__avatar-image').src = avatarLink;
    avatarPopup.close();
  }
);
avatarPopup.setEventListeners();

avatar.addEventListener('click', () => {
  avatarPopup.open();
});
createFormValidator(avatarPopupForm, validationConfig.avatarSelector);

// Removing Popup

const removingPopup = new PopupWithForm('.popup_type_remove', () => {
  removingPopup.close();
});
removingPopup.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '6e0d021d-4f3f-452d-8c82-5a27e9592d29',
    'Content-Type': 'application/json',
  },
});

// Card List

const cardList = new Section(
  (element) => {
    const cardElement = new Card(element, '#card', handleCardClick, () => {
      removingPopup.open();
      api.removeCard(cardElement.getId()).then(() => cardElement.removeCard());
    }).generateCard();
    cardList.renderItem(cardElement);
  },
  '.cards__container',
  handleCardClick
);

api
  .getProfileInfo()
  .then((result) => {
    avatar.src = result.avatar;
    profileName.textContent = result.name;
    profilePosition.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
  });

api.getInitialCards().then((res) => {
  cardList.renderItems(res);
});
