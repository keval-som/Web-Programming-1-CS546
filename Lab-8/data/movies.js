//import axios, md5
import { callApi, strCheck } from "../helpers.js";

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey={YourApiKey}&s={title}
  */
  strCheck(title, "title");
  title = title.trim();
  const url = `http://www.omdbapi.com/?apikey={YourApiKey}&s=${title}`;
  const method = "GET";
  const data = {};
  let response = await callApi(url, method, data);
  if (response.Response == "False") {
    return response;
  }
  if (response.totalResults > 10) {
    let page = 2;
    let movieCount = 10;
    while (movieCount < 50 && movieCount < response.totalResults) {
      const url = `http://www.omdbapi.com/?apikey={YourApiKey}&s=${title}&page=${page}`;
      const response2 = await callApi(url, method, data);
      if (response2.Response) {
        response.Search.push(...response2.Search);
        movieCount += 10;
        page++;
      } else {
        break;
      }
    }
  }
  response.Search = response.Search.map((movie) => {
    if (movie.Poster === "N/A") {
      movie.Poster =
        "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
    }
    return movie;
  });
  return response;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey={YourApiKey}&i={id}
  */
  strCheck(id, "id");
  id = id.trim();
  const url = `http://www.omdbapi.com/?apikey={YourApiKey}&i=${id}`;
  const method = "GET";
  const data = {};
  let response = await callApi(url, method, data);
  return response;
};
