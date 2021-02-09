const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__submit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupTitle = document.querySelector('.popup__title');
let popupName = document.querySelector('.popup__input_type_name');
let popupPosition = document.querySelector('.popup__input_type_position');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position');
const imgPopup = document.querySelector('.img-popup');
let imgPopupTitle = document.querySelector('.img-popup__title');
let imgPopupImage = document.querySelector('.img-popup__image');
let imgPopupCloseButton = document.querySelector('.img-popup__close-button');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card').content;
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

const popupTypeEdit = {
  title: 'Редактировать профиль',
  firstInput: 'Ваше имя',
  secondInput: 'Ваша должность',
  submit: 'Сохранить'
};

const popupTypeAdd = {
  title: 'Новое место',
  firstInput: 'Название',
  secondInput: 'Ссылка на картинку',
  submit: 'Создать'
};

function openPopup(event) {
  event.preventDefault();

  if(event.target === editButton) {
    popupTitle.textContent = popupTypeEdit.title;
    popupName.placeholder = popupTypeEdit.firstInput;
    popupPosition.placeholder = popupTypeEdit.secondInput;
    submitButton.textContent = popupTypeEdit.submit;
    popupName.value = profileName.textContent;
    popupPosition.value = profilePosition.textContent;
  }
  if(event.target === addButton) {
    popupTitle.textContent = popupTypeAdd.title;
    popupName.placeholder = popupTypeAdd.firstInput;
    popupPosition.placeholder = popupTypeAdd.secondInput;
    submitButton.textContent = popupTypeAdd.submit;
    popupName.value = '';
    popupPosition.value = '';
  }

  popup.classList.add('popup_opened');
}

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

function openImgPopup(event) {
  event.preventDefault();

  imgPopupTitle.textContent = event.target.alt;

  imgPopupImage.alt = event.target.alt
  console.log(event.target.src);
  imgPopupImage.src = event.target.src;
  imgPopupCloseButton.addEventListener('click', closeImgPopup);

  imgPopup.classList.add('img-popup_opened');
}

function closeImgPopup(event) {
  imgPopup.classList.remove('img-popup_opened');
}

function formSubmit(event) {
  event.preventDefault();
  if(event.target.textContent.trim() == popupTypeEdit.submit) {
    profileName.textContent = popupName.value;
    profilePosition.textContent = popupPosition.value;
  }
  if(event.target.textContent.trim() == popupTypeAdd.submit) {
    addCard({
      name: popupName.value,
      link: popupPosition.value
    });
  }
  closePopup();
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function initializeCards(initialCard) {
  cardsContainer.append(createCard(initialCard));
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__image').addEventListener('click', openImgPopup);
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
    cardElement.remove();
  })
  cardElement.querySelector('.card__like-button').addEventListener('click', function(event) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  })

  return cardElement;
}

initialCards.forEach(initializeCards);
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', formSubmit);