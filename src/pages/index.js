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
  avatarImage,
  profileName,
  profilePosition,
} from '../utils/constants.js';

import { setInputValues } from '../utils/utils.js';

let tempCard;

function handleCardClick(name, link) {
  imgPopupImage.src = link;
  imgPopupTitle.textContent = name;
  popupWithImage.open(name, link);
}

function handleCardRemoving(card) {
  removingPopup.open();
  tempCard = card;
}

function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, (card) => {
    handleCardRemoving(card);
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

function cardLike() {}

// UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__position');

// Editing Popup
const editingPopup = new PopupWithForm(
  '.popup_type_editing',
  ({ profileName, profilePosition }) => {
    editingPopup.renderLoading(true);
    api
      .setProfileInfo({ profileName, profilePosition })
      .then((res) => {
        if (res.ok) {
          userInfo.setUserInfo(profileName, profilePosition);
          editingPopup.close();
          return Promise.resolve('Успех');
        }
        Promise.reject(res.status);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editingPopup.renderLoading(false);
      });
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
    additionPopup.renderLoading(true);
    api
      .addCard({ name: placeName, link: placeLink })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка' + res.status);
      })
      .then((result) => {
        const cardElement = createCard(result);
        cardList.addItem(cardElement);
        additionPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        additionPopup.renderLoading(false);
      });
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
    avatarPopup.renderLoading(true);
    api
      .changeAvatar(avatarLink)
      .then((res) => {
        if (res.ok) {
          avatarImage.src = avatarLink;
          avatarPopup.close();
          return Promise.resolve('Успех');
        }
        return Promise.reject(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  }
);
avatarPopup.setEventListeners();

avatar.addEventListener('click', () => {
  avatarPopup.open();
});
createFormValidator(avatarPopupForm, validationConfig.avatarSelector);

// Removing Popup

const removingPopup = new PopupWithForm('.popup_type_remove', () => {
  removingPopup.renderLoading(true);
  api
    .removeCard(tempCard.dataset.id)
    .then((res) => {
      if (res.ok) {
        removingPopup.close();
        cardList.removeCard(tempCard.dataset.id);
        return Promise.resolve('Успех');
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removingPopup.renderLoading(false);
    });
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
    const cardElement = createCard(element);
    cardList.renderItem(cardElement);
  },
  '.cards__container',
  handleCardClick
);

api
  .getProfileInfo()
  .then((result) => {
    avatarImage.src = result.avatar;
    profileName.textContent = result.name;
    profilePosition.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    Promise.reject('Ошибка');
  })
  .then((result) => {
    cardList.renderItems(result);
  })
  .catch((err) => console.log(err));
