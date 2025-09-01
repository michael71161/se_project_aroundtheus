import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__image");
    this._modalTitle = this._popup.querySelector(".modal__image-title");
  }

  open(data) {
    this._image.src = data._link;
    this._image.alt = data._name;
    this._modalTitle.textContent = data._name;
    super.open();
  }
}

export { PopupWithImage };
