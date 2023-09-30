const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

const users = [];

const isValid = (username) => {
  // Write code to check if the username is valid (e.g., length, format, etc.)
  // Return true if valid, false otherwise
  return true; // Replace with your validation logic
};

const authenticatedUser = (username, password) => {
  // Write code to check if the username and password match the records
  // Return true if authenticated, false otherwise
  return true; // Replace with your authentication logic
};

// User Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username is valid
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  // Check if the user is authenticated
  if (authenticatedUser(username, password)) {
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key' with your secret key

    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
});

// Add a Book Review (Authenticated)
regd_users.put("/auth/review/:isbn", jwtMiddleware, (req, res) => {
  const isbn = req.params.isbn;
  const reviewData = req.body;

  // Find the book by ISBN
  const book = books[isbn];

  if (book) {
    // Add the review to the book
    book.review = reviewData;
    return res.status(200).json({ message: "Review added successfully" });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


regd_users.delete("/auth/review/:isbn", jwtMiddleware, (req, res) => {
  const isbn = req.params.isbn;
  const user = req.user.username; // Get the username from the JWT payload

  // Find the book by ISBN
  const book = books[isbn];

  if (book) {
    // Check if the book has a review
    if (book.reviews) {
      const userReview = book.reviews.find((review) => review.author === user);

      if (userReview) {
        // Delete the user's review
        const reviewIndex = book.reviews.indexOf(userReview);
        book.reviews.splice(reviewIndex, 1);

        return res.status(200).json({ message: "Review deleted successfully" });
      } else {
        return res.status(403).json({ message: "Access denied. You are not the author of this review" });
      }
    } else {
      return res.status(404).json({ message: "Review not found for the book" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

