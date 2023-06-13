import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
let user = {};

const checkInputValues = () => {
  if (localStorage.getItem('feedback-form-state')) {
    user = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (user.email) {
      feedbackFormEl.firstElementChild.firstElementChild.value = user.email;
    }

    if (user.message) {
      feedbackFormEl.firstElementChild.nextElementSibling.firstElementChild.value =
        user.message;
    }

    localStorage.getItem('feedback-form-state');
  }
};

document.addEventListener(
  'input',
  throttle(event => {
    event.target.name === 'email'
      ? (user.email = event.target.value)
      : (user.message = event.target.value);

    if (!user.email) {
      delete user.email;
    }

    if (!user.message) {
      delete user.message;
    }

    user.email || user.message
      ? localStorage.setItem('feedback-form-state', JSON.stringify(user))
      : localStorage.removeItem('feedback-form-state');
  }, 500)
);

document.addEventListener('submit', e => {
  e.preventDefault();
  user = JSON.parse(localStorage.getItem('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  feedbackFormEl.reset();
  console.log(user);
  user = {};
});

checkInputValues();
