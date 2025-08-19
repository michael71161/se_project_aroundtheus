import "../pages/index.css";
import Card from "../../components/Card.js";
import FormValidator from "../../components/FormValidator.js";
import Section from "../../components/Section.js";
import Popup from "../../components/Popup.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import UserInfo from "../../components/UserInfo.js";
import Api from "../../components/Api.js";

import { initialCards, validationConfig } from "../../utils/constants.js";

// DOM Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

const profileEditForm = document.querySelector(
  "#profile-edit-modal .popup__form"
);
const addCardForm = document.querySelector("#add-card-form");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

//create API class
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b3d22750-6505-4d6a-aa7e-af4edfb03942",

    "Content-Type": "application/json",
  },
});

// user info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

// display image on click popup
const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// create new card func
function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open({ name, link });
  });
  return card.generateCard();
}

// card section
const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// profile form popup
const profilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  api.updateCurrentUser({
    name: data.name,
    about: data.about,
  });
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

// create new card popup
const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const newCardElement = createCard({
    name: data.title,
    link: data.link,
  });
  cardSection.addItem(newCardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

//form validation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileFormValidator.enableValidation();
// console.log("Sacha");
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

api.getInitialData().then(([users, cards]) => {
  userInfo.setUserInfo(users);
  cardSection.renderItems(cards);
});

// open profie modal
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  profileFormValidator.resetValidation();
  profilePopup.open();
});

// open add card modal
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});
