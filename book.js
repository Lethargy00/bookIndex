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

  if (book) {
    // Populate the book details on the page
    document.getElementById("bookImage").src = book.image;
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById(
      "bookAuthor"
    ).textContent = `Author: ${book.author}`;
    document.getElementById("bookGenre").textContent = `Genre: ${book.genre}`;
    document.getElementById("bookYear").textContent = `Year: ${book.year}`;
    document.getElementById("bookISBN").textContent = `ISBN: ${book.isbn}`;
  } else {
    // Handle the case when the book ID is not found
    console.error("Book not found");
  }
} else {
  // Handle the case when the books data is not available in localStorage
  console.error("Books data not found in localStorage");
}
