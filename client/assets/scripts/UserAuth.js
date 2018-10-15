const hostUrl = 'https://fast-food-andy.herokuapp.com/api/v1/'
const loginButton = document.querySelector('input[value="LOG IN"][type="submit"]');
const signupButton = document.querySelector('input[value="SIGN UP"][type="submit"]');
const errorHolder = document.querySelector('.error-span');
const loader = document.querySelector('.loader');
const formElement = document.querySelector('form.col-form');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // this regex was obtained from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// js docs
class UserAuth {
  userAuthPost(endpoint, payload) {
    const url = `${hostUrl}${endpoint}`;
    return fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());
  }

  userAuthLogin() {
    const userEmail = document.querySelector('#email').value;
    const userPassword = document.querySelector('#password').value;
    const endpoint = 'auth/login';
    const payload = {
      email: userEmail,
      password: userPassword
    }
    loader.style.display = 'flex';
    this.userAuthPost(endpoint, payload)
      .then((res) => {
        if (res.error) {
          errorHolder.textContent = 'invalid email or password entered';
          loader.style.display = 'none';
        }
        else {
          const token = res.token;
          errorHolder.textContent = "";
          localStorage.setItem('x-access-token', token);
          const decode = jwt_decode(token);
          loader.style.display = 'none';
          if (decode.userAdmin) {
            location.href = "/client/admin/menu.html";
          }
          else {
            location.href = '/client/place-order.html';
          }
        }
      }).catch(error => console.log(error));
  }
}
const user = new UserAuth();
if (loginButton) {
  formElement.onsubmit = (event) => {
    event.preventDefault();
    user.userAuthLogin();
  }
}
