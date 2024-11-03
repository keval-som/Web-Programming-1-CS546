//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import express from "express";
import { getBooks, getBookById } from "../data/data.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const books = await getBooks();
    if (!books) {
      res.status(404).json({ message: "Books not found!" });
      return;
    }
    res.json(books);
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).json({
      message: "An unexpected error occurred while retrieving books.",
    });
  }
});
// Implement GET Request Method and send a JSON response  See lecture code!

router.route("/:id").get(async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Book Not Found!" });
      return;
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book: ", error);
    res.status(500).json({
      error: "An unexpected error occurred while retrieving the book.",
    });
  }
});
// Implement GET Request Method and send a JSON response See lecture code!

export default router;
