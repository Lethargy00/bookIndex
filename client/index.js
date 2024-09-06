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
    <div class="bookCard">
      <img src="${book.imageURL || 'https://placehold.co/400x600?text=No+Photo&font=roboto'}" alt="Book Cover">
      <div class="bookInfo">
        <div class="bookTitle" onclick="window.location.href = 'book.html?id=${book.id}'">
          <h2>${book.title}</h2>
          <h2>(${book.releaseDate})</h2>
        </div>
        <div>
          <p>Author: ${book.author}</p>
          <p>Genre: ${book.genre}</p>
          <p>ISBN: ${book.isbn}</p>
        </div>
      </div>
        <div class="bookActions">
          <button onclick="populateForm(${book.id}, '${book.title}', '${book.releaseDate}', '${book.author}', '${book.genre}', '${book.isbn}', '${book.imageURL}')">Update</button>
          <button onclick="deleteBook(${book.id})">Delete</button>
        </div>
    </div>
  `).join("");
}

// Function to update the book list
async function updateBookList() {
  const data = await fetchBooks();
  DisplayBooks(data);
}

// Function to populate the form with book information
function populateForm(id, title, releaseDate, author, genre, isbn, imageURL) {
  console.log(id);
  // Set the form fields with the book's information
  document.getElementById("title").value = title;
  document.getElementById("releaseDate").value = releaseDate;
  document.getElementById("author").value = author;
  document.getElementById("genre").value = genre;
  document.getElementById("isbn").value = isbn;
  document.getElementById("imageURL").value = imageURL;

  // Store the book ID in a hidden input field (optional, for later use)
  const hiddenIdField = document.getElementById("bookId");
  if (hiddenIdField) {
    hiddenIdField.value = id; // Assuming you have a hidden input for the book ID
  }

  // Show the form
  showForm();
}

// Function to update a book
async function updateBook(id, bookData) {
  console.log(bookData);
  try {
    const response = await fetch(
      `http://localhost:5010/api/book/${bookData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Book updated successfully:", data);
      updateBookList(); // Refresh the book list after updating
    } else {
      console.error("Failed to update book:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

// Function to add a single book
async function addBook(bookData) {
  try {
    const response = await fetch("http://localhost:5010/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating book:", error);
  }
}

// Function to add books from JSON file to database
async function addBooksFromJson() {
  try {
    const response = await fetch("./static/books.json");
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

// Function to delete a book
async function deleteBook(id) {
  try {
    const response = await fetch(`http://localhost:5010/api/book/${id}`, {
      method: "DELETE",
    });

    // Check if the response is successful
    if (response.ok) {
      // Optionally, you can check if the response has a body
      if (response.status !== 204) {
        const data = await response.json(); // Only parse if there's a body
        console.log(data);
      } else {
        console.log(`Book with ID ${id} deleted successfully.`);
      }
      // Update the book list after deletion
      updateBookList();
    } else {
      console.error("Failed to delete book:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

// Add event listener to the form submit event.
document
  .querySelector("#addBookForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const id = parseInt(document.getElementById("bookId").value);
    const title = document.getElementById("title").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const isbn = document.getElementById("isbn").value;
    const imageURL = document.getElementById("imageURL").value;

    if (id) {
      // Create book data object
      const bookData = {
        id,
        title,
        releaseDate,
        author,
        genre,
        isbn,
        imageURL:
          imageURL || "https://placehold.co/400x600?text=No+Photo&font=roboto",
      };
      // If bookId exists, update the book
      await updateBook(bookId, bookData);
    } else {
      // Create book data object
      const bookData = {
        title,
        releaseDate,
        author,
        genre,
        isbn,
        imageURL:
          imageURL || "https://placehold.co/400x600?text=No+Photo&font=roboto",
      };
      // If bookId does not exist, add a new book
      await addBook(bookData);
    }

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

  form.reset();

  // Clear the hidden book ID field
  const hiddenIdField = document.getElementById("bookId");
  if (hiddenIdField) {
    hiddenIdField.value = ""; // Clear the hidden input
  }

  bookList.style.filter = "none";
  body.style.pointerEvents = "auto";
  form.style.display = "none";
}
