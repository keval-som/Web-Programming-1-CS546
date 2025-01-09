/*
UUsing JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element (this will be the Fibonacci index) 
Calculate the Fibonacci value for the given index
Determine whether or not the number is a prime number
Add a list item to the #fibonacciResults list of numbers you have checked. This list item should have a class of is-prime if it is a prime number, or not-prime it is not.
If the user does not have a value for the input when they submit, you should not continue checking and instead should inform them of an error somehow.


*/

let myForm = document.getElementById("fibonacciForm");
let myInput = document.getElementById("fibonacci_index_input");
let myUl = document.getElementById("fibonacciResults");
let error = document.getElementById("error");

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    error.hidden = true;
    if (!strCheck(myInput.value) || !numCheck(myInput.value)) {
      error.innerHTML = "Please enter a valid number";
      error.hidden = false;
      console.error("Please enter a valid number");
      myForm.reset();
      return;
    }
    let input = myInput.value;
    let inputNumber = parseInt(input, 10);
    let fibo = fibonacci(inputNumber);
    let prime = isPrime(fibo);
    let li = document.createElement("li");
    li.className = prime ? "is-prime" : "not-prime";
    li.innerHTML = "The Fibonacci of " + input + " is " + fibo + ".";
    myUl.appendChild(li);
    myForm.reset();
  });
}

const fibonacci = (num) => {
  let a = 0,
    b = 1,
    temp;
  while (num > 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }
  return a;
};

const isPrime = (num) => {
  if (num <= 1) {
    return false;
  }
  if (num == 2) {
    return true;
  }
  for (let i = 2; i < num / 2 + 1; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};

const strCheck = (str) => {
  if (!str) {
    return false;
  }
  if (typeof str != "string") {
    return false;
  }
  if (str.length == 0) {
    return false;
  }
  if (str.trim().length == 0) {
    return false;
  }
  return true;
};

const numCheck = (num) => {
  let number = Number(num, 10);
  if (isNaN(number) || !Number.isInteger(number)) {
    return false;
  }
  return true;
};
