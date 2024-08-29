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
      alert('Unable to update password.');
    }
  }
};

const bookStatusHandler = async (event) => {
  event.preventDefault();

  if (event.target.matches('.change-status')) {
    const button = event.target;
    const id = button.getAttribute('data-id');
    const currentStatus = button.getAttribute('data-status');
    const newStatus =
      currentStatus === 'Available' ? 'Not Available' : 'Available';

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        button.textContent = `Change status (${newStatus})`;
        button.setAttribute('data-status', newStatus);

        const statusElement = button
          .closest('.book-card')
          .querySelector('.book-status');
        if (statusElement) {
          statusElement.textContent = `Status: ${newStatus}`;
        }
      } else {
        alert('Failed to update book status');
      }
    } catch (error) {
      alert('Error updating book status');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.change-status').forEach((button) => {
    button.addEventListener('click', bookStatusHandler);
  });

  if (document.querySelector('.book-form')) {
    document
      .querySelector('.book-form')
      .addEventListener('submit', bookStatusHandler);
  }
});
document
  .querySelector('.username-form')
  .addEventListener('submit', updateUserHandler);

document
  .querySelector('.email-form')
  .addEventListener('submit', updateEmailHandler);

document
  .querySelector('.pass-form')
  .addEventListener('submit', updatePasswordHandler);

document.querySelectorAll('.remove-from-library').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const bookElement = event.target.closest('.book-form');
    const bookId = bookElement.dataset.bookId;

    try {
      const response = await fetch(`/api/profile/library/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Book removed from your library!');
        document.location.reload();
      } else {
        alert('Failed to remove book from library');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while removing the book from your library');
    }
  });
});

document.querySelectorAll('.remove-from-wishlist').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const bookElement = event.target.closest('.wishlist-form');
    const bookData = {
      isbn: bookElement.dataset.isbn,
    };

    try {
      const response = await fetch('/api/wishlist/remove', {
        method: 'DELETE',
        body: JSON.stringify(bookData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Book removed from your wishlist!');
        document.location.reload();
      } else {
        alert('Failed to remove book from wishlist');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while removing the book from your wishlist');
    }
  });
});
