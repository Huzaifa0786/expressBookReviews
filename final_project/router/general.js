const express = require('express');
const public_users = express.Router();
const books = require('./booksdb.js'); // Assuming you import your books data correctly

// Function to simulate asynchronous book retrieval (replace with actual async operation)
async function getBooksAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 1000); // Simulate a delay of 1 second
  });
}

// Route to get the list of all books available in the shop
public_users.get('/', async (req, res) => {
  try {
    const booksList = await getBooksAsync();
    return res.status(200).json({ books: booksList });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const booksList = await getBooksAsync();
    const foundBook = booksList[isbn];
    if (foundBook) {
      return res.status(200).json({ book: foundBook });
    } else {
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const booksList = await getBooksAsync();
    const authorBooks = booksList.filter((book) => book.author === author);
    if (authorBooks.length > 0) {
      return res.status(200).json({ books: authorBooks });
    } else {
      return res.status(404).json({ message: 'Books by author not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route to get all books based on title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const booksList = await getBooksAsync();
    const titleBooks = booksList.filter((book) => book.title.includes(title));
    if (titleBooks.length > 0) {
      return res.status(200).json({ books: titleBooks });
    } else {
      return res.status(404).json({ message: 'Books by title not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports.general = public_users;
