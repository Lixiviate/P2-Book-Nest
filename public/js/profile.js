const updateInfoHandler = async (event) => {
    event.preventDefault(); 

    const username = document.querySelector('#username-login').value.trim();
    const email = document.querySelector('#password-login').value.trim();
    const pass = document.querySelector('#username-login').value.trim();

    if(username) {
        const response = await fetch('/api/profile/update', {
            method: 'PUT',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update');
        }
    };

    if(email) {
        const response = await fetch('/api/profile/update', {
            method: 'PUT',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update');
        }
    };
};