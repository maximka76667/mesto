let popupForm = document.querySelector('.popup__form'); 
let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_type_name');
let popupPosition = document.querySelector('.popup__input_type_position');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position');

function formSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profilePosition.textContent = popupPosition.value;
  closePopup();
}

function openPopup(event) {
  event.preventDefault();
  popupName.value = profileName.textContent;
  popupPosition.value = profilePosition.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', formSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);