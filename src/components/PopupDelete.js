import { Popup } from "./Popup.js";

class PopupDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.form = this._popup.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this.form.querySelector(".modal__button_type_submit");
    this._originalText = this._submitButton.textContent;
  }

  getCardInfo(card) {
    this._card = card;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._originalText;
    }
  }
}

export { PopupDelete };
