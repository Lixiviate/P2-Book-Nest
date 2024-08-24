const updateUserHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-update').value.trim();

  if (username) {
    const response = await fetch('/api/profile/username-update', {
      method: 'PUT',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('test');

        if (response.ok) {
            console.log('Groovy, baby!');
            document.location.replace('/profile');
        } else {
            alert('Failed to update username');
        }
    };

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
      document.location.replace('/profile');
    } else {
      alert('Failed to update');
    }
  }
};

const updatePassHandler = async (event) => {
    event.preventDefault();
    
    const pass = document.querySelector('#password-update').value.trim();

    if(pass) {
        const response = await fetch('/api/profile/pass-update', {
            method: 'PUT',
            body: JSON.stringify({ pass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update');
        }
    };
};

document
    .querySelector('.username-form')
    .addEventListener('submit', updateUserHandler);