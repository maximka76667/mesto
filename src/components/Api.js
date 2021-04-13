export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._token = headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    });
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
    });
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка');
      })
      .catch((err) => {
        console.log(err);
      });
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
    });
  }
  // addMessage(data) {
  //   return fetch(`${this._address}/messages`, {
  //       method: 'POST',
  //       headers: {
  //           authorization: this._token,
  //           'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //           user: data.user,
  //           message: data.message
  //       })
  //   })
  //       .then(response => response.ok
  //           ? response.json()
  //           : Promise.reject(`Ошибка ${response.status}`))
  // }

  // removeMessage(id) {
  //   return fetch(`${this._address}/messages/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //           authorization: this._token
  //       }
  //   })
  //       .then(response => response.ok
  //           ? Promise.resolve('success')
  //           : Promise.reject(`Ошибка ${response.status}`))
  // }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    });
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
    });
  }
}
