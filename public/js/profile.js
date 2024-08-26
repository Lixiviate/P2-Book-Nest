const updateUserHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-update').value.trim();

  if (username) {
    const response = await fetch('/api/profile/username-update', {
      method: 'PUT',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Username changed!');
      document.location.replace('/profile');
    } else {
      alert('This username is not available.');
    }
  }
};

const updateEmailHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-update').value.trim();

  if (email) {
    const response = await fetch('/api/profile/email-update', {
      method: 'PUT',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Email changed!');
      document.location.replace('/profile');
    } else {
      alert('This email is not available.');
    }
  }
};

const updatePasswordHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password-update').value.trim();

  if (password) {
    const response = await fetch('/api/profile/password-update', {
      method: 'PUT',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Password changed!');
      document.location.replace('/profile');
    } else {
      alert('This password is already in use by horizonbound0');
    }
  }
};

const bookStatusHandler = async (event) => {
  event.preventDefault();

  const target = event.currentTarget;

  // grab elements
  const bookISBN = target.dataset.isbn;

  console.log(bookISBN);
};

document
  .querySelector('.username-form')
  .addEventListener('submit', updateUserHandler);

document
  .querySelector('.email-form')
  .addEventListener('submit', updateEmailHandler);

document
  .querySelector('.pass-form')
  .addEventListener('submit', updatePasswordHandler);

document
  .querySelector('.book-form')
  .addEventListener('submit', bookStatusHandler);
