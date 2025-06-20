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

const profileEditButton = document.querySelector(
  "#profile-edit-button"
); /*because we used id*/

const profileEditModal = document.querySelector("#profile-edit-modal");
console.log(profileEditButton);

const profileEditModalClose = document.querySelector("#profile-edit-close");
console.log(profileEditModalClose); /*we selecting the close modal button*/

/*add card*/
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");

/*add card close button*/
const addCardCloseButton = document.querySelector("#add-card-close");

const addCardSubmitButton = document.querySelector("#submit-image");

/*now we want to grab profile info (title and description)*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*checking what we grabbed see the console.log with textContent to grab text only*/

console.log(profileTitle.textContent);
console.log(profileDescription.textContent);

/*no we want to grab the inputs*/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/*we grabbing add card inputs*/

const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");

/*now we want that from the modal it will go yo the html, to edit our form*/

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEL = document.querySelector(".cards__list");
/*grabing the form from the modal*/

/*adding func to close popup instead of using classlist.remove "modal__opened"*/

/*we erased the hardcoded cards and now need to grab the template element*/
/*also notice that we need the **content itself** and we need the **card content**
 which is the first nested element of card template id*/
/*also we could use another query*/
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
console.log(cardTemplate);

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

  console.log(cardImageEl);
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
  cardListEL.append(newCard);
  addCardModal.classList.remove("modal_opened");
}

/* event listeners*/

/* now we want to submit the form and prevent default which is refreshing of the whole page */
/* we will pass the title and the description to the page through the form */
/* e stands for event, we going to use a callback function */

profileEditForm.addEventListener("submit", handleProfileEditSUbmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add(
    "modal_opened"
  ); /*adding class for the modal to make it open, class modal opened*/
}); /*"click" is the event second argument is function*/

/*open the add card modal*/
addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

addCardSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddCardSubmit();
});

/*close the add card modal*/
addCardCloseButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

profileEditModalClose.addEventListener("click", closepopup);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});

/**Jacques Cousteau  Explorer */
