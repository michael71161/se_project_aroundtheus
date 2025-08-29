class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}

export { UserInfo };
