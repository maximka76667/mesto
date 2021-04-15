export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.profileName,
        about: data.profilePosition,
      }),
    }).then(this._checkResponse);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  like(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  dislike(card) {
    return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}
