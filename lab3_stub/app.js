/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 

1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/
import * as authors from "./authors.js";
import * as books from "./books.js";

try {
  const authorData = await authors.getAuthorById(
    "21d34ada-c6e8-4b30-a25e-399eacb27ef9"
  );
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const genreData = await authors.authorsMultipleGenres();
  console.log(genreData);
} catch (e) {
  console.log(e);
}

try {
  const numberPages = await authors.averagePageCount("kipp", "oxnam");
  console.log(numberPages);
} catch (e) {
  console.log(e);
}

try {
  const ageBetween = await authors.getAuthorsByAgeRange(0);
  console.log(ageBetween);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await authors.authorsByGenre("Horror");
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await books.getBookById(
    "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
  );
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await books.booksByFormat(
    "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
  );
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await books.mostPopularGenre();
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await books.booksByPublisher(" agivu ");
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const authorsInGenre = await books.averagePriceByGenre("historical fiction");
  console.log(authorsInGenre);
} catch (e) {
  console.log(e);
}

try {
  const ageBetween = await authors.getAuthorsByAgeRange(70, 60);
  console.log(ageBetween);
} catch (e) {
  console.log(e);
}
