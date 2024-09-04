// Retrieve the book ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Function to fetch books from the API
async function fetchBook() {
  try {
    const response = await fetch(`http://localhost:5010/api/book/${bookId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
}

// Fetch the book data from the API
fetchBook().then((data) => {
  if (data) {
    const body = document.body;
    body.innerHTML = `
      <a class="back" href="./">Back</a>
      <div class="bookCard" >
        <img src="${
          data.imageURL ||
          "https://placehold.co/400x600?text=No+Photo&font=roboto"
        }" alt="Book Cover">
        <div class="bookInfo">
          <div class="bookTitle">
            <h2>${data.title}</h2>
            <h2>(${data.releaseDate})</h2>
          </div>
          <div>
            <p>Author: ${data.author}</p>
            <p>Genre: ${data.genre}</p>
            <p>ISBN: ${data.isbn}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    const body = document.body;
    body.innerHTML = `
      <a class="back" href="./">Back</a>
      <p>Book not found</p>
    `;
  }
});
