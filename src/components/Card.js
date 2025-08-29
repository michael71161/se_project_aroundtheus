class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    toggleServerLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this._newCard = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
    this._handleDeleteClick = handleDeleteClick;
    this._toggleServerLike = toggleServerLike;
  }

  renderCard() {
    this._cardImageElement = this._newCard.querySelector(".card__image");
    this._cardNameElement = this._newCard.querySelector(".card__name");
    this._cardLikeElement = this._newCard.querySelector(".card__like-button");
    this._cardTrashElement = this._newCard.querySelector(
      ".card__delete-button"
    );

    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;
    this._cardNameElement.textContent = this._name;

    this._setEventListeners();
    this.toggleLike();
    return this._newCard;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardLikeElement.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._toggleServerLike(this);
    });

    this._cardTrashElement.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._handleDeleteClick(this);
    });
  }

  toggleLike() {
    if (this.isLiked) {
      this._cardLikeElement.classList.add("card__like-button_liked");
    } else {
      this._cardLikeElement.classList.remove("card__like-button_liked");
    }
  }

  deleteCard() {
    this._newCard.remove();
  }
}

export { Card };
