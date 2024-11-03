export const questionOne = (arr) => {
  // Implement question 1 here
  function isPrime(num) {
    if (num < 2) {
      return false;
    }
    if (num == 2) {
      return true;
    }
    for (var index = 2; index < num / 2 + 1; index++) {
      if (num % index == 0) {
        return false;
      }
    }
    return true;
  }

  let primeSum = 0;
  let compositeSum = 0;

  arr.forEach((element) => {
    if (isPrime(element)) {
      primeSum += element;
    } else {
      compositeSum += element;
    }
  });
  let isOdd = (primeSum + compositeSum) % 2 == 0;

  return [primeSum, compositeSum, isOdd]; //return result
};

export const questionTwo = (index, multiplier) => {
  // Implement question 2 here
  var prev = 0;
  var next = 1;
  if (index == 0) {
    return { [index]: index * multiplier };
  }
  if (index == 1) {
    return { [index]: index * multiplier };
  }
  var fibonacci = 0;
  var x = 2;
  for (let x = 2; x <= index; x++) {
    fibonacci = prev + next;
    prev = next;
    next = fibonacci;
  }

  return { [fibonacci]: fibonacci * multiplier }; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  str = str.replace(/[^a-zA-Z\s]/g, "");
  var strArr = str.split(" ");
  let charArr = strArr.filter((c) => {
    return c != "";
  });
  return charArr.length; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let numArrCubed = arr.map((num) => {
    return num * num * num;
  });
  let mean = 0;
  numArrCubed.forEach((x) => (mean += x));
  mean = mean / arr.length;
  return Math.round(mean); //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING OR NOT CHANGED.
export const studentInfo = {
  firstName: "KEVAL",
  lastName: "SOMPURA",
  studentId: "20033127",
};
