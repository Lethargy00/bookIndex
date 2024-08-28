// Check if the books data is already in localStorage
const booksData = localStorage.getItem("booksData");

if (booksData) {
  // Parse the books data from localStorage
  const data = JSON.parse(booksData);

  // Process the books data
  DisplayBooks(data);
} else {
  // Fetch the books data from the network
  fetch("books.json")
    .then((response) => response.json())
    .then((data) => {
      // Save the books data to localStorage
      localStorage.setItem("booksData", JSON.stringify(data));

      // Process the books data
      DisplayBooks(data);
    })
    .catch((error) => {
      console.error("Error fetching book data:", error);
    });
}

function DisplayBooks(data) {
  const bookList = document.getElementById("bookList");

  data.array.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    // Add an event listener to the book card
    bookCard.addEventListener("click", () => {
      // Navigate to the book's page using the book's ID
      window.location.href = `book.html?id=${book.id}`;
    });

    const bookImage = document.createElement("img");
    bookImage.src = book.image;
    bookCard.appendChild(bookImage);

    const bookTitleYearDiv = document.createElement("div");
    bookTitleYearDiv.classList.add("bookTitle");
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;
    bookTitleYearDiv.appendChild(bookTitle);

    const bookYear = document.createElement("h2");
    bookYear.textContent = `(${book.year})`;
    bookTitleYearDiv.appendChild(bookYear);
    bookCard.appendChild(bookTitleYearDiv);

    const bookAuthorGenreISBNDiv = document.createElement("div");
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookAuthorGenreISBNDiv.appendChild(bookAuthor);

    const bookGenre = document.createElement("p");
    bookGenre.textContent = `Genre: ${book.genre}`;
    bookAuthorGenreISBNDiv.appendChild(bookGenre);

    const bookISBN = document.createElement("p");
    bookISBN.textContent = `ISBN: ${book.isbn}`;
    bookAuthorGenreISBNDiv.appendChild(bookISBN);
    bookCard.appendChild(bookAuthorGenreISBNDiv);

    // Append the book card to the book list
    bookList.appendChild(bookCard);
  });
}
