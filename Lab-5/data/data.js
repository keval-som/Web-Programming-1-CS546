/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import { callApi } from "../helpers.js";

const authorUrl =
  "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json";

const bookUrl =
  "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json";

let strCheck = (str, parameter) => {
  if (typeof str !== "string") {
    throw `Error: ${parameter || "Input"} type is not a string`;
  }
  if (!str) {
    throw `Error: ${parameter || "Input"} string is null`;
  }
  if (str.trim().length === 0) {
    throw `Error: ${parameter || "Input"} string contains only empty spaces`;
  }
};

export let callAuthorApi = async () => {
  var response = await callApi(authorUrl);
  var data = response.data;
  if (!Array.isArray(data)) {
    throw new Error(
      "Error: Expected an array in the API response but received a different format"
    );
  }
  return data;
};

export let callBooksApi = async () => {
  var response = await callApi(bookUrl);
  var data = response.data;
  if (!Array.isArray(data)) {
    throw new Error(
      "Error: Expected an array in the API response but received a different format"
    );
  }
  return data;
};

export const getAuthors = async () => {
  try {
    const authors = await callAuthorApi();
    return authors;
  } catch (error) {
    throw `Error: getAuthors: ${error.message}`;
  }
};

export const getBooks = async () => {
  try {
    const books = await callBooksApi();
    return books;
  } catch (error) {
    throw `Error: getBooks: ${error.message}`;
  }
};

export const getAuthorById = async (id) => {
  strCheck(id, "getAuthorById: Input");
  id = id.trim();
  var authorResponse = await callAuthorApi();
  var author = authorResponse.find((element) => element.id === id);
  return author;
};

export const getBookById = async (id) => {
  strCheck(id, "getBookById: Input");
  id = id.trim();
  var bookResponse = await callBooksApi();
  var book = bookResponse.find((element) => element.id === id);
  return book;
};
