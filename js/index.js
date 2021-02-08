const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
// let submitButton = document.querySelector('.popup__submit-button');
// let closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
// let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_type_name');
let popupPosition = document.querySelector('.popup__input_type_position');
// let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card').content;
const popupTemplate = document.querySelector('#popup').content;
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

function createPopup(popupType) {
  const popupElement = popupTemplate.querySelector('.popup').cloneNode(true);

  popupElement.querySelector('.popup')
  popupElement.querySelector('.popup__title').textContent = popupType.title;
  popupElement.querySelector('.popup__input_type_name').placeholder = popupType.firstInput;
  popupElement.querySelector('.popup__input_type_position').placeholder = popupType.secondInput;
  popupElement.querySelector('.popup__submit-button').textContent = popupType.submit;
  popupElement.querySelector('.popup__form').addEventListener('submit', formSubmit);
  popupElement.querySelector('.popup__close-button').addEventListener('click', closePopup);

  page.append(popupElement);
  
  popup = document.querySelector('.popup');
  popupName = document.querySelector('.popup__input_type_name');
  popupPosition = document.querySelector('.popup__input_type_position');
  // let popupForm = document.querySelector('.popup__form');
  // let closeButton = document.querySelector('.popup__close-button');
}

function openPopup(event) {
  event.preventDefault();

  if(event.target === editButton) {
    createPopup(popupTypeEdit);
    popupName.value = profileName.textContent;
    popupPosition.value = profilePosition.textContent;
  }

  if(event.target === addButton) {
    createPopup(popupTypeAdd);
  }

  console.log(event.target === 'img.card__image');
  /* if(event.target === 'img.card__image') {
    createPopup(popupTypeAdd)
  } */

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.remove();
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__image').addEventListener('click', function(event) {
    openPopup(event);
  })
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
    cardElement.remove();
  })
  cardElement.querySelector('.card__like-button').addEventListener('click', function(event) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  })

  return cardElement;
}

function initializeCards(initialCard) {
  cardsContainer.append(createCard(initialCard));
}



initialCards.forEach(initializeCards);
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

