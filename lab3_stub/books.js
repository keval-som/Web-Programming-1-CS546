//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import { callApi } from "./helpers.js";
import { callAuthorApi } from "./authors.js";

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

export const getBookById = async (id) => {
  strCheck(id, "getBookById: Input");
  id = id.trim();
  var bookResponse = await callBooksApi();
  var book = bookResponse.find((element) => element.id === id);
  if (!book) {
    throw `Error: getBookById: book by Id: ${id} not found`;
  }
  return book;
};

export const booksByFormat = async () => {
  var bookResponse = await callBooksApi();
  let formatMap = new Map();

  function addValue(value) {
    if (formatMap.has(value)) {
      formatMap.set(value, formatMap.get(value) + 1);
    } else {
      formatMap.set(value, 1);
    }
  }

  bookResponse.forEach((element) => {
    let format = element.format;
    if (format && Array.isArray(format)) {
      format.forEach((ele) => {
        addValue(ele);
      });
    }
  });
  return Object.fromEntries(formatMap);
};

export const mostPopularGenre = async () => {
  var bookResponse = await callBooksApi();
  let genreMap = new Map();

  function addValue(value) {
    if (genreMap.has(value)) {
      genreMap.set(value, genreMap.get(value) + 1);
    } else {
      genreMap.set(value, 1);
    }
  }

  bookResponse.forEach((element) => {
    let genre = element.genres;
    if (genre && Array.isArray(genre)) {
      genre.forEach((ele) => {
        addValue(ele);
      });
    }
  });
  let max = -999;
  let ans;
  let ansArr = [];
  for (const [keys, values] of genreMap) {
    if (values > max) {
      ans = keys;
      ansArr = [ans];
      max = values;
    } else if (values === max) {
      ansArr.push(keys);
    }
  }
  if (ansArr.length > 1) {
    return ansArr;
  } else {
    return ans;
  }
};

export const booksByPublisher = async (publisher) => {
  strCheck(publisher);
  publisher = publisher.trim();
  var bookResponse = await callBooksApi();
  let books = bookResponse.filter(
    (book) => book.publisher.toLowerCase() === publisher.toLowerCase()
  );
  if (!books || !Array.isArray(books) || books.length === 0) {
    throw `Error: Publisher does not exist`;
  }
  return books;
};

export const averagePriceByGenre = async (genre) => {
  strCheck(genre);
  genre = genre.trim();
  var bookResponse = await callBooksApi();
  let prices = [];
  bookResponse.forEach((book) => {
    if (book.genres && Array.isArray(book.genres)) {
      book.genres.forEach((ele) => {
        if (ele.toLowerCase() === genre.toLowerCase()) {
          prices.push(book.price);
        }
      });
    }
  });
  if (prices.length === 0) {
    throw `Error: Genre not found`;
  }
  let sum = 0;
  prices.forEach((element) => {
    sum += element;
  });
  sum = sum / prices.length;
  let avg = Math.round(sum * 100) / 100;
  return avg;
};
