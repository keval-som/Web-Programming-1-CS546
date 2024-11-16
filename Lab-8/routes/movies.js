//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from "express";
const router = express.Router();
import { searchMoviesByTitle, getMovieById } from "../data/movies.js";

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    res.render("home", { title: "Movie Search" });
  } catch (error) {
    res
      .status(500)
      .render("error", {
        error: error,
        title: "Movie Search",
        tagClass: "error",
      });
  }
});

router.route("/moviesearch").post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  try {
    const title = req.body.searchByTitle;
    if (!title || title.trim() === "") {
      return res.status(400).render("error", {
        error: "You must enter a search term!",
        tagClass: "error",
        title: "Movies Found",
      });
    }

    const response = await searchMoviesByTitle(title);
    if (response.Response == "False") {
      return res.status(404).render("error", {
        error: `We're sorry, but no results were found for ${title}.`,
        tagClass: "movie-not-found",
        title: "Movies Found",
      });
    }
    res.render("searchResults", {
      movies: response.Search,
      title: "Movies Found",
      searchQuery: title,
    });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message,
      tagClass: "error",
      title: "Movies Found",
    });
  }
});

router.route("/getmovie/:id").get(async (req, res) => {
  //code here for GET a single movie
  let id = req.params.id;
  try {
    const response = await getMovieById(id);
    if (response.Response == "False") {
      return res.status(404).render("error", {
        error: "No movie found with that id!",
        title: "Movie not found",
        tagClass: "error",
      });
    }
    if (response.Poster === "N/A") {
      response.Poster =
        "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
    }
    res.render("getMovie", { movie: response, title: response.Title });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message,
      title: "Movie not found",
      tagClass: "error",
    });
  }
});

//export router
export default router;
