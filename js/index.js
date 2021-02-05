const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__submit-button');
let closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_type_name');
let popupPosition = document.querySelector('.popup__input_type_position');
let popupForm = document.querySelector('.popup__form');
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
  nameInput: 'Ваше имя',
  positionInput: 'Ваша должность',
  submit: 'Сохранить'
};

const popupTypeAdd = {
  title: 'Новое место',
  nameInput: 'Название',
  positionInput: 'Ссылка на картинку',
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

  popupElement.querySelector('.popup__title').textContent = popupType.title;
  popupElement.querySelector('.popup__input_type_name').placeholder = popupType.nameInput;
  popupElement.querySelector('.popup__input_type_position').placeholder = popupType.positionInput;
  popupElement.querySelector('.popup__submit-button').textContent = popupType.submit;

  page.append(popupElement);
  
  popup = document.querySelector('.popup');
  popupName = document.querySelector('.popup__input_type_name');
  popupPosition = document.querySelector('.popup__input_type_position');
  popupForm = document.querySelector('.popup__form');
  closeButton = document.querySelector('.popup__close-button');
  popupForm.addEventListener('submit', formSubmit);
  closeButton.addEventListener('click', closePopup);
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
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.remove();
}

function addCard(props) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = props.name;
  cardElement.querySelector('.card__image').src = props.link;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
    cardElement.remove();
  })
  cardElement.querySelector('.card__like-button').addEventListener('click', function(event) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  })

  cardsContainer.prepend(cardElement);
}



initialCards.forEach(addCard);

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopup);

