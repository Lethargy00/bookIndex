fetch("books.json")
  .then((response) => response.json())
  .then((data) => {
    const bookList = document.getElementById("bookList");

    data.array.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookCard.appendChild(bookImage);

      const bookTitle = document.createElement("h2");
      bookTitle.textContent = book.title;
      bookCard.appendChild(bookTitle);

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = `Author: ${book.author}`;
      bookCard.appendChild(bookAuthor);

      const bookGenre = document.createElement("p");
      bookGenre.textContent = `Genre: ${book.genre}`;
      bookCard.appendChild(bookGenre);

      const bookYear = document.createElement("p");
      bookYear.textContent = `Year: ${book.year}`;
      bookCard.appendChild(bookYear);

      const bookISBN = document.createElement("p");
      bookISBN.textContent = `ISBN: ${book.isbn}`;
      bookCard.appendChild(bookISBN);

      // Append the book card to the book list
      bookList.appendChild(bookCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching book data:", error);
  });
