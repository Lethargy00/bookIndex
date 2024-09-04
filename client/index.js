// Function to fetch books from the API
async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:5010/api/book");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
}

// prettier-ignore
// Function to display books
function DisplayBooks(data) {
  const bookList = document.getElementById("bookList");

  // Clear the book list
  bookList.innerHTML = "";

  bookList.innerHTML = data.map((book) => `
    <div class="bookCard" onclick="window.location.href = 'book.html?id=${book.id}'" >
      <img src="${book.imageURL || 'https://placehold.co/400x600?text=No+Photo&font=roboto'}" alt="Book Cover">
      <div class="bookInfo">
        <div class="bookTitle">
          <h2>${book.title}</h2>
          <h2>(${book.releaseDate})</h2>
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
async function updateBookList() {
  const data = await fetchBooks();
  DisplayBooks(data);
}

// Function to add books from JSON file to database
async function addBooksFromJson() {
  try {
    const response = await fetch("books.json");
    const data = await response.json();
    data.array.forEach(async (book) => {
      try {
        const response = await fetch("http://localhost:5010/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error adding book:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

// Add event listener to the form submit event.
document
  .querySelector("#addBookForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const title = document.getElementById("title").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const isbn = document.getElementById("isbn").value;
    const imageURL = document.getElementById("imageURL").value;

    // Send a POST request to the API to create a new book
    try {
      const response = await fetch("http://localhost:5010/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          releaseDate,
          author,
          genre,
          isbn,
          imageURL:
            imageURL ||
            "https://placehold.co/400x600?text=No+Photo&font=roboto",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating book:", error);
    }

    // Clear form fields
    const form = document.getElementById("addBookForm");
    form.reset();

    // Hide the form
    hideForm();

    // Update the book list
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

// Fetch books on page load
fetchBooks().then(async (data) => {
  if (data.length === 0) {
    await addBooksFromJson();
    updateBookList();
  } else {
    DisplayBooks(data);
  }
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
