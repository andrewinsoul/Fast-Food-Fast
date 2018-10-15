const loginButton = document.querySelector('input[value="LOG IN"][type="submit"]');
const signupButton = document.querySelector('input[value="SIGN UP"][type="submit"]');
const errorHolder = document.querySelector('.error-span');
const emailErrorHolder = document.querySelector('#email-error');
const usernameErrorHolder = document.querySelector('#username-error');
const emailNode = document.querySelector('#email');
const usernameNode = document.querySelector('#username');
const loader = document.querySelector('.loader');
const formElement = document.querySelector('form.col-form');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // this regex was obtained from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// js docs

/**
 * @description - class that contains methods which consumes login and signup endpoints
 */
class UserAuth {
  /**
   * @param {string} endpoint - endpoint to consume
   * @param {object} payload - request payload
   * @returns {Function} fetch
   */
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

  /**
   * @method
   * @returns {undefined}
   */
  userAuthLogin() {
    const userEmail = document.querySelector('#email').value;
    const userPassword = document.querySelector('#password').value;
    const endpoint = 'auth/login';
    const payload = {
      email: userEmail,
      password: userPassword
    };
    loader.style.display = 'flex';
    this.userAuthPost(endpoint, payload)
      .then((res) => {
        if (res.error) {
          errorHolder.textContent = 'invalid email/password';
          loader.style.display = 'none';
        } else {
          const token = res.token;
          errorHolder.textContent = "";
          localStorage.setItem('x-access-token', token);
          const decode = jwt_decode(token);
          if (decode.userAdmin) {
            loader.style.display = 'none';
            location.href = "/client/admin/menu.html";
          } else {
            // loader.style.display = 'flex'; // check dis line
            location.href = '/client/place-order.html';
          }
        }
      });
  }

  /**
   * @method
   * @returns {undefined}
   */
  userAuthSignUp() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
    const endpoint = 'auth/signup';
    const confirmPassword = document.querySelector('#repeat-password').value;
    const payload = {
      name,
      email,
      username,
      phone,
      password,
      confirmPassword,
      address
    };
    loader.style.display = 'flex';
    this.userAuthPost(endpoint, payload)
      .then((res) => {
        if (res.error) {
          loader.style.display = 'none';
          const error = res.error;
          if (error.includes('email')) {
            emailNode.style.borderColor = 'red';
            emailErrorHolder.textContent = res.error;
            usernameNode.style.borderColor = '';
            usernameErrorHolder.textContent = '';
          } else if (error.includes('username')) {
            usernameNode.style.borderColor = 'red';
            usernameErrorHolder.textContent = res.error;
            emailNode.style.borderColor = '';
            emailErrorHolder.textContent = '';
          }
        } else {
          const token = res.token;
          localStorage.setItem('x-access-token', token);
          location.href = "/client/place-order.html";
        }
      }).catch((error) => {
        console.log(res.error);
      });
  }
}
const user = new UserAuth();
if (loginButton) {
  formElement.onsubmit = (event) => {
    user.userAuthLogin();
    event.preventDefault();
  };
} else if (signupButton) {
  formElement.onsubmit = (event) => {
    user.userAuthSignUp();
    event.preventDefault();
  };
}

const phoneNode = document.querySelector('#phone');
phoneNode.onchange = (event) => {
  const phoneErrorHolder = document.querySelector('#phone-error');
  const phoneNumber = event.target.value;
  if ((isNaN(Number(phoneNumber))) || (phoneNumber.length !== 11)) {
    phoneErrorHolder.textContent = 'Invalid phone number';
    phoneNode.style.borderColor = 'red';
    signupButton.style.pointerEvents = 'none';
  } else {
    phoneErrorHolder.textContent = '';
    phoneNode.style.borderColor = '';
    signupButton.style.pointerEvents = 'auto';
  }
};
emailNode.onchange = (event) => {
  const emailValue = event.target.value;
  if (!re.test(emailValue.toLowerCase())) {
    emailErrorHolder.textContent = 'invalid email';
    emailNode.style.borderColor = 'red';
    signupButton.style.pointerEvents = 'none';
  } else if (re.test(emailValue.toLowerCase())) {
    emailNode.style.borderColor = '';
    emailErrorHolder.textContent = '';
    signupButton.style.pointerEvents = 'auto';
  }
};
let passwordValue = '';
const passwordNode = document.querySelector('#password');
passwordNode.onchange = (event) => {
  passwordValue = event.target.value;
  const passwordErrorHolder = document.querySelector('#password-error');
  if (passwordValue.length < 8) {
    passwordErrorHolder.textContent = 'password should have at least 8 characters';
    passwordNode.style.borderColor = 'red';
    signupButton.style.pointerEvents = 'none';
  } else if (passwordValue.length >= 8) {
    passwordErrorHolder.textContent = '';
    passwordNode.style.borderColor = '';
    signupButton.style.pointerEvents = 'auto';
  }
};

const confirmPasswordNode = document.querySelector('#repeat-password');
confirmPasswordNode.onchange = (event) => {
  const confirmPasswordValue = event.target.value;
  const passwordErrorHolder = document.querySelector('#repeat-password-error');
  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordNode.style.borderColor = 'red';
    passwordErrorHolder.textContent = 'password do not match';
    signupButton.style.pointerEvents = 'none';
  } else if (passwordValue === confirmPasswordValue) {
    confirmPasswordNode.style.borderColor = '';
    passwordErrorHolder.textContent = '';
    signupButton.style.pointerEvents = 'auto';
  }
};

const addressNode = document.querySelector('#address');
addressNode.onchange = (event) => {
  const addressErrorHolder = document.querySelector('#address-error');
  const addressValue = event.target.value;
  if (!isNaN(addressValue)) {
    addressErrorHolder.textContent = 'address cannot contain only numbers';
    addressNode.style.borderColor = 'red';
    signupButton.style.pointerEvents = 'none';
  }
  if (addressValue.length < 70) {
    addressErrorHolder.textContent = '';
    signupButton.style.pointerEvents = 'auto'
  }
};

addressNode.onkeypress = (event) => {
  const addressErrorHolder = document.querySelector('#address-error');
  const addressValue = event.target.value;
  if (addressValue.length >= 70) {
    addressErrorHolder.textContent = 'maximum length reached';
    signupButton.style.pointerEvents = 'none';
  }
};
