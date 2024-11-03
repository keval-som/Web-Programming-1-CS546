//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById function and call it in the :/id route.
import express from "express";
import { getAuthors, getAuthorById } from "../data/data.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const authors = await getAuthors();
    if (!authors) {
      res.status(404).json({ message: "Author not found" });
      return;
    }
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors: ", error);
    res.status(500).json({
      message: "An unexpected error occurred while retrieving authors.",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const author = await getAuthorById(req.params.id);
    if (!author) {
      res.status(404).json({ error: "Author Not Found!" });
      return;
    }
    res.json(author);
  } catch (error) {
    console.error("Error fetching author: ", error);
    res.status(500).json({
      error: "An unexpected error occurred while retrieving the author.",
    });
  }
});

export default router;
