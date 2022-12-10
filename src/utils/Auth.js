class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Првоеряем всё ли хорошо с пришедшим запросом
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Регестрируем нового пользователя
  setRegisterUser(email, password) {
    return fetch(this.baseUrl + "/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        return data;
      });
  }

  // Отправляем данные пользователя на авторизацию 
  setAuthorizeUser(email, password) {
    return fetch(this.baseUrl + "/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      });
  }

  // Проверяем JWT пользователя 
  getAuthenticationUser(jwt) {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

// Делаем запрос по api для получения информации
const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
