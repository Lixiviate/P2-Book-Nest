document
  .getElementById('book-search-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('search-query').value.trim();
    const searchType = document.getElementById('search-type').value;
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    if (!query) return;

    try {
      const apiUrl =
        searchType === 'isbn'
          ? `https://openlibrary.org/isbn/${encodeURIComponent(query)}.json`
          : `https://openlibrary.org/search.json?q="${encodeURIComponent(query)}"&mode=everything&language=eng&sort=editions`;

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch book details');

      const data = await response.json();
      searchType === 'isbn'
        ? displayISBNResult(data)
        : displayResults(data.docs.slice(0, 10));
    } catch (error) {
      resultsContainer.innerHTML = `<p>${error.message}</p>`;
      console.error(error);
    }
  });

function displayResults(books) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = books.length ? '' : '<p>No results found</p>';

  books.forEach((book) => {

    resultsContainer.innerHTML += `
      <div class="book-item" style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150'}" alt="${book.title} cover" style="width: 100px; margin-right: 15px;">
        <div>
          <h2 class="book-title"><a href="https://openlibrary.org${book.key}" target="_blank">${book.title}</a></h2>
          <p class="book-author">Author: ${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
          <p>First Published: ${book.first_publish_year || 'Unknown'}</p>
          <p>ISBN: ${book.isbn && book.isbn.length ? book.isbn[0] : 'N/A'}</p>
          <button class="add-to-library" data-isbn="${book.isbn && book.isbn.length ? book.isbn[0] : ''}">Add to Library</button>
          <button class="add-to-wishlist" data-isbn="${book.isbn && book.isbn.length ? book.isbn[0] : ''}">Add to Wishlist</button>
        </div>
      </div>
    `;
  });

  document.querySelectorAll('.add-to-library').forEach((button) => {
    button.addEventListener('click', addToLibrary);
  });

  document.querySelectorAll('.add-to-wishlist').forEach((button) => {
    button.addEventListener('click', addToWishlist);
  });
}

async function addToLibrary(event) {
  const bookElement = event.target.closest('.book-item');
  const bookData = {
    title: bookElement.querySelector('.book-title').textContent,
    author: bookElement
      .querySelector('.book-author')
      .textContent.replace('Author: ', ''),
    cover_img: bookElement.querySelector('img').src,
    status: 'Available',
    isbn: event.target.dataset.isbn,
  };

  try {
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Book added to your library!');
    } else {
      alert('Failed to add book to library');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the book');
  }
}

async function addToWishlist(event) {
  const bookElement = event.target.closest('.book-item');
  const bookData = {
    title: bookElement.querySelector('.book-title').textContent,
    author: bookElement
      .querySelector('.book-author')
      .textContent.replace('Author: ', ''),
    isbn: event.target.dataset.isbn,
  };

  try {
    const response = await fetch('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Book added to your wishlist!');
    } else {
      alert('Failed to add book to wishlist');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the book to your wishlist');
  }
}

async function displayISBNResult(book) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (!book || !book.title) {
    resultsContainer.innerHTML = '<p>No book found for this ISBN</p>';
    return;
  }

  const authorData = book.authors?.[0]
    ? await fetchAuthor(book.authors[0].key)
    : { name: 'Unknown', link: '#' };

  resultsContainer.innerHTML = `
    <div style="display: flex; align-items: center;">
      <img src="${book.covers?.[0] ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg` : 'https://via.placeholder.com/150'}" alt="${book.title} cover" style="width: 100px; margin-right: 15px;">
      <div>
        <h2><a href="https://openlibrary.org${book.key}" target="_blank">${book.title}</a></h2>
        <p>Author: <a href="${authorData.link}" target="_blank">${authorData.name}</a></p>
        <p>Publish Date: ${book.publish_date || 'Unknown'}</p>
        <p>ISBN-13: ${book.isbn_13?.join(', ') || 'N/A'}</p>
        <p>ISBN-10: ${book.isbn_10?.join(', ') || 'N/A'}</p>
        <p>Pages: ${book.number_of_pages || 'Unknown'}</p>
      </div>
    </div>
  `;
}

async function fetchAuthor(authorKey) {
  try {
    const response = await fetch(`https://openlibrary.org${authorKey}.json`);
    const author = await response.json();
    return {
      name: author.name || 'Unknown',
      link: `https://openlibrary.org${authorKey}`,
    };
  } catch {
    return { name: 'Unknown', link: '#' };
  }
}
