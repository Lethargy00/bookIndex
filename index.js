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

// prettier-ignore
// Function to display books
function DisplayBooks(data) {
  const bookList = document.getElementById("bookList");

  bookList.innerHTML = data.array.map((book) => `
    <div class="bookCard" onclick="window.location.href = 'book.html?id=${book.id}'" >
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
  `).join("");
}

// Function to update the book list
function updateBookList() {
  // Parse the books data from localStorage
  const data = JSON.parse(localStorage.getItem("booksData"));

  // Clear the book list
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  // Re-process the books data
  DisplayBooks(data);
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

    updateBookList();
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
