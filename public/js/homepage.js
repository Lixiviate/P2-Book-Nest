document.addEventListener('DOMContentLoaded', function () {
    if(justLoggedIn) {
    const safetyModal = document.getElementById('safety-modal');
    safetyModal.style.display = 'block';

    const closeButton = document.getElementById('close-modal');
    closeButton.addEventListener('click', function () {
      safetyModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
      if (event.target === safetyModal) {
        safetyModal.style.display = 'none';
      }
    });
  }
});
