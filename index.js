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
    bookImage.src =
      book.image || "https://placehold.co/400x600?text=No+Photo&font=roboto";
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

// Add event listener tot he form submit event.
document
  .querySelector("#addBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const isbn = document.getElementById("isbn").value;
    const image = document.getElementById("image").value;

    // Add book to the list in localStorage as a JSON string.
    const booksData = JSON.parse(localStorage.getItem("booksData")) || {
      array: [],
    };
    booksData.array.push({
      id: Date.now(),
      title,
      year,
      author,
      genre,
      isbn,
      image: image || "https://placehold.co/400x600?text=No+Photo&font=roboto",
    });
    localStorage.setItem("booksData", JSON.stringify(booksData));

    // Clear form fields
    const form = document.getElementById("addBookForm");
    form.reset();

    // Hide the form
    hideForm();
  });

// Add event listener to the cancel button click event.
document
  .querySelector("#cancelButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent button click from submitting the form

    // Clear form fields
    const form = document.getElementById("addBookForm");
    form.reset();

    // Hide the form
    hideForm();
  });

function showForm() {
  const form = document.getElementById("addBookForm");
  const bookList = document.getElementById("bookList");
  const body = document.body;
  bookList.style.filter = "blur(5px)";
  body.style.pointerEvents = "none";
  form.style.display = "flex";
}

function hideForm() {
  const form = document.getElementById("addBookForm");
  const bookList = document.getElementById("bookList");
  const body = document.body;
  bookList.style.filter = "none";
  body.style.pointerEvents = "auto";
  form.style.display = "none";
}
