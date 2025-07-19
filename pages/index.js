import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "popup__error_visible",
};

// elements from DOM
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalClose = document.querySelector("#profile-edit-close");
const profileEditForm = profileEditModal.querySelector(".popup__form");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const addCardCloseButton = document.querySelector("#add-card-close");
const addCardForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

const cardListEL = document.querySelector(".cards__list");

const imageModal = document.querySelector("#image-modal");
const imageModalClose = document.querySelector("#image-modal-close");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__caption");

// Functions
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
  openPopup(imageModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  profileFormValidator.resetValidation();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  const newCard = createCard(newCardData);
  cardListEL.prepend(newCard);
  closePopup(addCardModal);
  addCardForm.reset();
  addCardFormValidator.resetValidation(); // disables button after submit
}

// ESC button close
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Overlay close
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closePopup(modal);
    }
  });
});

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation(); // reset validation before opening
  openPopup(profileEditModal);
});

profileEditModalClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation(); // reset validation before opening
  openPopup(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

imageModalClose.addEventListener("click", () => {
  closePopup(imageModal);
});

// Initial Cards
initialCards.forEach((cardData) => {
  cardListEL.append(createCard(cardData));
});

// Enable Form Validation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();
