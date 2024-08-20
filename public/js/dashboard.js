document
  .getElementById('book-search-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('search-query').value.trim();

    if (query) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
      );

      if (response.ok) {
        const data = await response.json();
        displayResults(data.docs);
      } else {
        alert('Failed to fetch books');
      }
    }
  });

function displayResults(books) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (books.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  books.forEach((book) => {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        <p>First Published: ${book.first_publish_year || 'Unknown'}</p>
      `;
    resultsContainer.appendChild(bookElement);
  });
}
