const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/booksdb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Schema & Model
const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
});
const Book = mongoose.model("Book", bookSchema);

// Routes
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/books", async (req, res) => {
  const { bookName, author } = req.body;
  const newBook = new Book({ bookName, author });
  await newBook.save();
  res.json(newBook);
});

app.listen(5000, () => console.log("Server running on port 5000"));
