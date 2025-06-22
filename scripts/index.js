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

console.log(initialCards);

/* elements */

const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");

const profileEditModalClose = document.querySelector("#profile-edit-close");

/*add card*/
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");

/*add card close button*/
const addCardCloseButton = document.querySelector("#add-card-close");

const addCardSubmitButton = document.querySelector("#submit-image");

/*get profile elements*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*get inputs elements*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

/*get form modal element*/

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".cards__list");

/*image popup selectors*/
const imageModal = document.querySelector("#image-modal");
const imageModalClose = document.querySelector("#image-modal-close");
const imageModalImage = imageModal.querySelector(".image__modal_image");
const imageModalCaption = imageModal.querySelector(".image__modal_caption");

/*get card template*/

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* functions */

function closepopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    imageModalImage.src = cardData.link;
    imageModalImage.alt = cardData.name;
    imageModalCaption.textContent = cardData.name;
    imageModal.classList.add("image__modal_opened");
  });

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  return cardElement;
}
/*event handlers*/
function handleProfileEditSUbmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closepopup();
}

function handleAddCardSubmit() {
  const newCard = getCardElement({
    link: cardLinkInput.value,
    name: cardTitleInput.value,
  });
  cardListEL.prepend(newCard);
  addCardModal.classList.remove("modal_opened");
}

/* event listeners*/

profileEditForm.addEventListener("submit", handleProfileEditSUbmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

/*open the add card modal*/
addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

/*add card to the DOM*/
addCardSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddCardSubmit();
});

/*close  modals*/
imageModalClose.addEventListener("click", () => {
  imageModal.classList.remove("image__modal_opened");
});

addCardCloseButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

profileEditModalClose.addEventListener("click", closepopup);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});
