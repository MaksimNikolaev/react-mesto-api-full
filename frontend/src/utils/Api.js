class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._errorHandler);
  }

  getInitialUser() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._errorHandler);
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._errorHandler);
  }

  addCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._errorHandler);
  }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  changeLikeCardStatus(id, method) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: method ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  updateAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._errorHandler);
  }
}


const api = new Api({
  url: "https://api.mesto.nikolaev.nomoredomains.sbs/",
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "content-type": "application/json",
  },
});

export default api;