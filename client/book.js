// Retrieve the book ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Check if the books data is already in localStorage
const booksData = localStorage.getItem("booksData");
if (booksData) {
  // Parse the books data from localStorage
  const data = JSON.parse(booksData);

  // Find the book in the data
  const book = data.array.find((book) => book.id === parseInt(bookId));

  // prettier-ignore
  if (book) {
    const body = document.body;
    body.innerHTML = `
    <a class="back" href="./">Back</a>
    <div class="bookCard" >
      <img src="${book.image || 'https://placehold.co/400x600?text=No+Photo&font=roboto'}" alt="Book Cover">
      <div class="bookInfo">
        <div class="bookTitle">
          <h2>${book.title}</h2>
          <h2>(${book.year})</h2>
        </div>
        <div>
          <p>Author: ${book.author}</p>
          <p>Genre: ${book.genre}</p>
          <p>ISBN: ${book.isbn}</p>
        </div>
      </div>
    </div>
  `;
  } else {
    // Handle the case when the book ID is not found
    console.error("Book not found");
  }
} else {
  // Handle the case when the books data is not available in localStorage
  console.error("Books data not found in localStorage");
}
