import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.form = this._popup.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this.form.querySelectorAll(".modal__input");
    this._submitButton = this.form.querySelector(".modal__button_type_submit");
    this._originalText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
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

export { PopupWithForm };
