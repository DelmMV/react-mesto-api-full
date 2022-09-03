class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getToken() {
    return { Authorization: `Bearer ${localStorage.getItem('token')}` };
  }

  getUserInfo() {
    return fetch(this._url + "users/me", {
      headers: {...this._headers, ...this._getToken() },
    }).then(this._checkResponse);
  }

  getCardInfo() {
    return fetch(this._url + "cards", {
      headers: {...this._headers, ...this._getToken() },
    }).then(this._checkResponse);
  }

  setUserInfo(name, about) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: {...this._headers, ...this._getToken() },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  setCardInfo(name, link) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: {...this._headers, ...this._getToken() },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + "cards" + `/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {...this._headers, ...this._getToken() },
    }).then(this._checkResponse);
  }

  changeCardStatus(id) {
    return fetch(this._url + "cards" + `/${id}`, {
      method: "DELETE",
      headers: {...this._headers, ...this._getToken() },
    }).then(this._checkResponse);
  }

  setUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {...this._headers, ...this._getToken() },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject("Произошла ошибка");
  }
}

export const api = new Api({
  url: "https://api.delm.nomoredomains.sbs/",
  headers: {
    "content-type": "application/json",
  },
});
