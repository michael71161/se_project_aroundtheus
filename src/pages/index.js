//Import styles
import "./index.css";

//Import classes, settings and API
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { validationSettings, userSettings } from "../utils/constants.js";
import { Api } from "../utils/Api.js";

//Create API
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b3d22750-6505-4d6a-aa7e-af4edfb03942",
    "Content-Type": "application/json",
  },
});

//Selecting elements
const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");
const avatarEdit = document.querySelector(".image__container");

//Create sectionCard class
const sectionCard = new Section({ renderer: createCard }, ".cards__list");

//Create UserInfo class
const userInfo = new UserInfo(userSettings);

//Create popups classes and set event listeners
const popupImage = new PopupWithImage("#image-modal-id");
const popupEdit = new PopupWithForm("#edit-modal-id", handleEditSumbit);
const popupAdd = new PopupWithForm("#add-modal-id", handleAddSumbit);
const popupAvatar = new PopupWithForm("#avatar-modal-id", handleAvatarSubmit);
const popupDelete = new PopupDelete("#delete-modal-id", handleDeleteSubmit);

//Create validators
const formEditValidator = new FormValidator(validationSettings, popupEdit.form);
const formAddValidator = new FormValidator(validationSettings, popupAdd.form);
const formAvatarValidator = new FormValidator(
  validationSettings,
  popupAvatar.form
);

//Handlers for classes
function createCard(item) {
  const cardElement = new Card(
    item,
    "#card__template",
    handleImageClick,
    handleDeleteClick,
    toggleServerLike
  );
  return cardElement.renderCard();
}

function handleImageClick(data) {
  popupImage.open(data);
}

function handleSubmits(request, popup, loadingText = "Saving...") {
  popup.renderLoading(true, loadingText);
  request()
    .then(() => {
      popup.close();
    })
    .catch(console.error)
    .finally(() => {
      popup.renderLoading(false);
    });
}

function handleEditSumbit(obj) {
  function makeRequest() {
    return api.updateCurrentUser(obj).then((data) => {
      userInfo.setUserInfo(data);
      formEditValidator.disableButton();
    });
  }

  handleSubmits(makeRequest, popupEdit);
}

function handleAddSumbit(obj) {
  function makeRequest() {
    return api.postCard(obj).then((data) => {
      sectionCard.addItem(createCard(data), "prepend");
      popupAdd.form.reset();
      formAddValidator.disableButton();
    });
  }

  handleSubmits(makeRequest, popupAdd);
}

function handleDeleteSubmit(thisCard) {
  function makeRequest() {
    return api.deleteCard(thisCard.id).then(() => {
      thisCard.deleteCard();
    });
  }

  handleSubmits(makeRequest, popupDelete, "Deleting...");
}

function handleAvatarSubmit(obj) {
  function makeRequest() {
    return api.updateCurrentAvatar(obj).then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.form.reset();
      formAvatarValidator.disableButton();
    });
  }

  handleSubmits(makeRequest, popupAvatar);
}

//Sends click event card's data to popupDelete
function handleDeleteClick(thisCard) {
  popupDelete.getCardInfo(thisCard);
  popupDelete.open();
}

//Check state of isLiked in the server and toggle like state in the API
function toggleServerLike(thisCard) {
  if (!thisCard.isLiked) {
    api
      .putLike(thisCard.id)
      .then(() => {
        thisCard.isLiked = !thisCard.isLiked;
        thisCard.toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .deleteLike(thisCard.id)
      .then(() => {
        thisCard.isLiked = !thisCard.isLiked;
        thisCard.toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Fills edit popup inputs according to profile info
function fillProfileInputs(obj) {
  popupEdit.form.querySelector("#name-id").value = obj.name;
  popupEdit.form.querySelector("#aboutMe-id").value = obj.about;
}

//               LOADING/REFRESH                   //

//Check that both request are fulfilled, then add info and cards from API to display
api
  .getInitialData()
  .then(([userProfile, userCards]) => {
    userInfo.setUserInfo(userProfile);
    sectionCard.renderItems(userCards);
  })
  .catch((err) => {
    console.log(err);
  });

//Enable validation
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

//Set event listeners
buttonEdit.addEventListener("click", () => {
  fillProfileInputs(userInfo.getUserInfo());
  popupEdit.open();
});
avatarEdit.addEventListener("click", () => {
  popupAvatar.open();
});
buttonAdd.addEventListener("click", () => popupAdd.open());
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
