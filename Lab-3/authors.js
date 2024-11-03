//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import { callApi } from "./helpers.js";
import { callBooksApi } from "./books.js";

const authorUrl =
  "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json";

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

export const getAuthorById = async (id) => {
  strCheck(id, "getAuthorById: Input");
  id = id.trim();
  var authorResponse = await callAuthorApi();
  var author = authorResponse.find((element) => element.id === id);
  if (!author) {
    throw `Error: getAuthorById: Author by Id: ${id} not found`;
  }
  return author;
};

export const authorsMultipleGenres = async () => {
  var authorResponse = await callAuthorApi();
  var bookResponse = await callBooksApi();
  const bookMap = new Map(bookResponse.map((book) => [book.id, book]));
  var authorList = [];
  authorList = authorResponse.filter((author) => {
    let booksArr = author.books;
    let authorGenre = new Set();
    if (Array.isArray(booksArr) && booksArr.length !== 0) {
      booksArr.forEach((element) => {
        const book = bookMap.get(element);
        if (book && Array.isArray(book.genres)) {
          const genre = book.genres;
          genre.forEach((gen) => authorGenre.add(gen));
        }
      });
    }
    return authorGenre.size > 1;
  });
  authorList = authorList.sort((a, b) => {
    const nameA = a.last_name.toLowerCase().replace(/'/g, "");
    const nameB = b.last_name.toLowerCase().replace(/'/g, "");

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const authors = [];
  authorList.forEach((element) => {
    authors.push(element.first_name + " " + element.last_name);
  });
  return authors;
};

export const averagePageCount = async (firstName, lastName) => {
  strCheck(firstName, "averagePageCount: Input firstName");
  strCheck(lastName, "averagePageCount: Input lastName");
  firstName = firstName.trim();
  lastName = lastName.trim();
  var authorResponse = await callAuthorApi();
  var bookResponse = await callBooksApi();
  const bookMap = new Map(bookResponse.map((book) => [book.id, book]));
  var author = authorResponse.find(
    (ele) =>
      ele.first_name.toLowerCase() === firstName.toLowerCase() &&
      ele.last_name.toLowerCase() === lastName.toLowerCase()
  );
  if (!author) {
    throw `Error: averagePageCount: ${firstName} ${lastName} does not exist`;
  }
  const books = author.books;
  if (!books || books.length === 0) {
    return 0;
  }
  const pages = [];
  books.forEach((element) => {
    let book = bookMap.get(element);
    if (book) {
      pages.push(book.pageCount);
    }
  });
  let avg = 0;
  pages.forEach((element) => {
    avg += element;
  });
  avg /= pages.length;
  avg = Math.round(avg * 100) / 100;
  return avg;
};

export const getAuthorsByAgeRange = async (minAge, maxAge) => {
  if (typeof minAge !== "number" || minAge < 1) {
    throw `Error: Input minAge is invalid`;
  }
  if (typeof maxAge !== "number") {
    throw `Error: Input maxAge is not a number`;
  }
  if (maxAge < minAge) {
    throw `Error: maxAge is less than minAge`;
  }
  if (!Number.isInteger(minAge) || !Number.isInteger(maxAge)) {
    throw `Error: please input integers only`;
  }
  let authorResponse = await callAuthorApi();
  let authorList = [];
  authorList = authorResponse.filter((author) => {
    let age = getAge(author.date_of_birth);
    return age >= minAge && age <= maxAge;
  });
  return authorList;
};

function getAge(birthDate) {
  const dateOfBirth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDifference = today.getMonth() - dateOfBirth.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
}

export const authorsByGenre = async (genre) => {
  strCheck(genre, "authorsByGenre: Input");
  genre = genre.trim();
  var authorResponse = await callAuthorApi();
  var bookResponse = await callBooksApi();
  const bookMap = new Map(bookResponse.map((book) => [book.id, book]));
  var authorList = [];
  authorList = authorResponse.filter((author) => {
    let booksArr = author.books;
    let authorGenre = new Set();
    if (Array.isArray(booksArr) && booksArr.length !== 0) {
      booksArr.forEach((element) => {
        const book = bookMap.get(element);
        if (book && Array.isArray(book.genres)) {
          const genre = book.genres;
          genre.forEach((gen) => authorGenre.add(gen.toLowerCase()));
        }
      });
    }
    return authorGenre.has(genre.toLowerCase());
  });
  if (authorList.length === 0) {
    throw `Error: genre not found`;
  }
  authorList = authorList.sort((a, b) => {
    const nameA = a.last_name.toLowerCase().replace(/'/g, "");
    const nameB = b.last_name.toLowerCase().replace(/'/g, "");

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const authors = [];
  authorList.forEach((element) => {
    authors.push(element.first_name + " " + element.last_name);
  });
  return authors;
};
