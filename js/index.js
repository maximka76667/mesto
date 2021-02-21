const editingButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__submit-button');
const additionButton = document.querySelector('.profile__add-button');
const editingPopup = document.querySelector('.popup_type_editing');
const editingPopupTitle = editingPopup.querySelector('.popup__title');
const editingPopupName = editingPopup.querySelector('.popup__input_type_name');
const editingPopupPosition = editingPopup.querySelector('.popup__input_type_position');
const editingPopupForm = editingPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const additionPopup = document.querySelector('.popup_type_addition');
const additionPopupTitle = additionPopup.querySelector('.popup__title');
const additionPopupName = additionPopup.querySelector('.popup__input_type_name');
const additionPopupLink = additionPopup.querySelector('.popup__input_type_link');
const additionPopupForm = additionPopup.querySelector('.popup__form');
const imgPopup = document.querySelector('.popup_type_image');
const imgPopupTitle = imgPopup.querySelector('.popup__title');
const imgPopupImage = imgPopup.querySelector('.popup__image');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = document.querySelector('#card').content;

function openPopup(popup) {
  document.addEventListener('keydown', keyHandler);

  const overlay = popup.querySelector('.popup__overlay');
  overlay.addEventListener('click', () => closePopup(popup));

  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', () => closePopup(popup));

  popup.classList.add('popup_opened');
}

function keyHandler(event) {
  if(event.key == 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditingPopup() {
  editingPopupName.value = profileName.textContent;
  editingPopupPosition.value = profilePosition.textContent;

  openPopup(editingPopup);
}

function openAdditionPopup() {
  openPopup(additionPopup);
}

function openImgPopup(event) {
  event.preventDefault();

  const popupImg = event.target;

  imgPopupTitle.textContent = popupImg.alt;
  imgPopupImage.alt = popupImg.alt;
  imgPopupImage.src = popupImg.src;

  openPopup(imgPopup);
}

function submitEditingForm(event) {
  event.preventDefault();
  
  profileName.textContent = editingPopupName.value;
  profilePosition.textContent = editingPopupPosition.value;

  closePopup(editingPopup);

  editingPopupForm.reset();
}

function submitAdditionForm(event) {
  event.preventDefault();

  addCard({
    name: additionPopupName.value,
    link: additionPopupLink.value
  });

  closePopup(additionPopup);

  additionPopupForm.reset();
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function initializeCards(initialCard) {
  cardsContainer.append(createCard(initialCard));
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', openImgPopup);
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
    cardElement.remove();
  })
  cardElement.querySelector('.card__like-button').addEventListener('click', function(event) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  })

  return cardElement;
}

initialCards.forEach(initializeCards);

editingButton.addEventListener('click', openEditingPopup);
additionButton.addEventListener('click', openAdditionPopup);

editingPopupForm.addEventListener('submit', submitEditingForm);
additionPopupForm.addEventListener('submit', submitAdditionForm);