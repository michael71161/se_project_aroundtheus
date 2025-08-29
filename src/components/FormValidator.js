class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  _setEventsListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          this._form,
          inputElement,
          this._inputErrorClass,
          this._errorClass
        );
        this._toggleButtonState(
          this._inputList,
          this._buttonSubmit,
          this._inactiveButtonClass
        );
      });
    });
  }

  _toggleButtonState(inputList, buttonSubmit, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton();
    } else {
      buttonSubmit.classList.remove(inactiveButtonClass);
      buttonSubmit.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _checkInputValidity(form, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        form,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      this._hideInputError(form, inputElement, inputErrorClass, errorClass);
    }
  }

  _showInputError(
    form,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(form, inputElement, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  enableValidation() {
    this.disableButton();
    this._setEventsListeners();
  }

  disableButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }
}

export { FormValidator };
