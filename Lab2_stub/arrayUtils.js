/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const arrCheck = (arr, parameter) => {
  if (arr === undefined) {
    throw `Error: ${parameter || "Input"} array is undefined`;
  }
  if (!Array.isArray(arr)) {
    throw `Error: ${parameter || "Input"} type is not an array`;
  }
  if (arr.length == 0) {
    throw `Error: ${parameter || "Input"} length of the array is 0`;
  }
};

export const f1ArrCheck = (arr, parameter) => {
  arrCheck(arr, parameter);
  arr.forEach((element) => {
    if (typeof element !== "number") {
      throw `Error: ${parameter || "Input"} ${
        element || "provided variable"
      } is not a number`;
    }
  });
};

export let arrayAnalysis = (arr) => {
  f1ArrCheck(arr, "arrayAnalysis: Input");
  arr.sort((a, b) => a - b);
  var sum = 0;
  var highest = arr[arr.length - 1];
  var lowest = arr[0];
  var totalCount = arr.length;
  arr.forEach((element) => {
    sum += element;
  });
  var average = sum / totalCount;
  var frequentValues;
  var freq = [];
  var prev = arr[0];
  for (let i = 1; i < totalCount; i++) {
    if (arr[i] === prev) {
      freq.push(arr[i]);
    } else {
      prev = arr[i];
    }
  }
  if (freq.length === 1) {
    frequentValues = freq[0];
  } else if (freq.length === 0) {
    frequentValues = null;
  } else {
    frequentValues = freq;
  }
  var middleValue =
    totalCount % 2 == 0
      ? (arr[totalCount / 2] + arr[totalCount / 2 - 1]) / 2
      : arr[(totalCount - 1) / 2];
  var span = highest - lowest;
  return {
    average: average,
    middleValue: middleValue,
    frequentValues: frequentValues,
    span: span,
    lowest: lowest,
    highest: highest,
    totalCount: totalCount,
    totalSum: sum,
  };
};

const f2ArrCheck = (arr, parameter) => {
  arrCheck(arr, parameter);
  arr.forEach((element) => {
    arrCheck(element, parameter);
    if (element.length !== 2) {
      throw `Error: ${parameter} Length of element ${element} is not equal to 2`;
    }
    element.forEach((e) => {
      if (typeof e !== "number" && typeof e !== "string") {
        throw `Error: ${parameter || "Input"} ${
          e || "provided variable"
        } is not a number or a string`;
      }
    });
  });
};

export let mergeKeyValuePairs = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  f2ArrCheck(arrays, "mergeKeyValuePairs: Input");
  var outObj = {};
  arrays.forEach(([key, value]) => {
    if (outObj[key]) {
      if (!Array.isArray(outObj[key])) {
        outObj[key] = [outObj[key]];
      }
      outObj[key].push(value);
    } else {
      outObj[key] = value;
    }
  });
  for (const property in outObj) {
    if (Array.isArray(outObj[property])) {
      let tempArr = outObj[property];
      let numArr = tempArr.filter((k) => typeof k === "number");
      numArr = numArr.concat(
        tempArr.filter((k) => typeof k === "string" && !isNaN(k))
      );
      numArr = numArr.map((k) => {
        return Number(k);
      });
      numArr = numArr.sort((a, b) => a - b);
      let strArr = tempArr
        .filter((k) => typeof k === "string" && isNaN(k))
        .sort();
      numArr = numArr.concat(strArr);
      numArr = numArr.map((k) => {
        return k.toString();
      });
      let set = new Set(numArr);
      let output = "";
      set.forEach((element) => {
        if (output.length === 0) {
          output = output.concat(element);
        } else {
          output = output.concat(", ", element);
        }
      });
      outObj[property] = output;
    } else {
      outObj[property] = outObj[property].toString();
    }
  }
  return outObj;
};

export let deepArrayEquality = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  let count = 0;
  arrays.forEach((element) => {
    arrCheck(element, "deepArrayEquality: Input");
    count++;
  });
  if (count < 2) {
    throw `Error: deepArrayEquality: Input size less than 2`;
  }
  for (let index = 0; index < arrays.length - 1; index++) {
    if (!arrayEquality(arrays[index], arrays[index + 1])) {
      return false;
    }
  }
  return true;
};

let arrayEquality = (arr1, arr2) => {
  if (arr1 === arr2) {
    return true;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    const hasX1 = i in arr1;
    const hasX2 = i in arr2;
    if (hasX1 !== hasX2) {
      return false;
    }
    const x1 = arr1[i];
    const x2 = arr2[i];
    if (!equalChecker(x1, x2)) {
      return false;
    }
  }
  return true;
};
// referred from https://medium.com/@pancemarko/deep-equality-in-javascript-determining-if-two-objects-are-equal-bf98cf47e934
let equalChecker = (val1, val2) => {
  if (val1 === null && val2 === null) return true;
  if (val1 === null || val2 === null) return false;
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (!arrayEquality(val1, val2)) {
      return false;
    }
  } else if (typeof val1 === "object" && typeof val2 === "object") {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let i in val1) {
      if (!equalChecker(val1[i], val2[i])) {
        return false;
      }
    }
  } else if (val1 !== val2) {
    return false;
  }
  return true;
};
