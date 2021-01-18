let likeButtons = document.querySelectorAll('.element__like-button');

for(let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function(event) {
    event.preventDefault();
    likeButtons[i].classList.toggle('element__like-button_active');
  })
}

let popupForm = document.querySelector('.popup__form'); 
let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_type_name');
let popupPosition = document.querySelector('.popup__input_type_position');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position');
let profileNameDefault = 'Ваше имя';
let profilePositionDefault = 'Ваша должность';

function formSubmit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profilePosition.textContent = popupPosition.value;
    checkEmpty();
    popup.classList.remove('popup_opened');
}

function checkEmpty() {
  if(popupName.value == 0) { 
    profileName.innerHTML = profileNameDefault; 
  }
  if(popupPosition.value == 0) {
    profilePosition.innerHTML = profilePositionDefault;
  }
}

function checkDefault() {
  if(profileName.innerHTML == profileNameDefault) {
    popupName.value = '';
  }
  if(profilePosition.innerHTML == profilePositionDefault) {
    popupPosition.value = '';
  }
}

popupForm.addEventListener('submit', formSubmit);

editButton.addEventListener('click', function(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  popupName.value = profileName.innerHTML;
  popupPosition.value = profilePosition.innerHTML;
  checkDefault();
})

closeButton.addEventListener('click', function(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
})