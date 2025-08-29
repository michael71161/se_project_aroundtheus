class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getCurrentUser() {
    return this._request(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateCurrentUser(obj) {
    return this._request(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    });
  }

  updateCurrentAvatar(obj) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.link,
      }),
    });
  }

  getAllCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  postCard(obj) {
    return this._request(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  putLike(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getCurrentUser(), this.getAllCards()]);
  }
}

export { Api };
