/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { f1ArrCheck } from "./arrayUtils.js";
let strCheck = (str, parameter) => {
  if (typeof str !== "string") {
    throw `Error: ${parameter || "Input"} type is not a string`;
  }
  if (str === undefined || str === null) {
    throw `Error: ${parameter || "Input"} string is null`;
  }
  if (str.trim().length === 0) {
    throw `Error: ${parameter || "Input"} string contains only empty spaces`;
  }
};

let indexCheck = (idxArr, strLength, parameter) => {
  f1ArrCheck(idxArr);
  idxArr.forEach((element) => {
    if (element === 0 || element > strLength - 2) {
      throw `Error: ${parameter || "Input"} Array index element not valid`;
    }
  });
};
export let replaceCharsAtIndexes = (str, idxArr) => {
  str = str.trim();
  strCheck(str, "replaceCharsAtIndexes: input");
  if (idxArr.length === 0) {
    return str;
  }
  str = str.trim();
  indexCheck(idxArr, str.length, "replaceCharsAtIndexes: input");
  var strArr = str.split("");
  idxArr.forEach((element) => {
    let char = strArr[element];
    let prev = strArr[element - 1];
    let next = strArr[element + 1];
    let k = 0;
    for (let i = element + 1; i < str.length; i++) {
      if (strArr[i] === char) {
        if (k === 0) {
          strArr[i] = prev;
        } else {
          strArr[i] = next;
        }
        k = (k + 1) % 2;
      }
    }
  });
  str = strArr.join("");
  return str;
};

export let anagrams = (str, target) => {
  strCheck(str, "anagrams: Input");
  str = str.trim();
  strCheck(target, "anagrams: Input");
  target = target.trim();
  if (target.includes(" ")) {
    throw "Error: anagrams: Input Target contains multiple words";
  }
  if (target.length < 2) {
    throw "Error: anagrams: Input Target string length is too small";
  }
  var strArr = str.split(" ");
  strArr = strArr.filter((element) => {
    return element.length === target.length;
  });
  var ansArr = [];
  strArr.forEach((element) => {
    let temp = element.toLowerCase().split("").sort().join("");
    let targetTemp = target.toLowerCase().split("").sort().join("");
    if (temp === targetTemp) {
      ansArr.push(element);
    }
  });
  return ansArr;
};

let f3Swap = (str, parameter) => {
  strCheck(str, parameter);
  if (str.length < 2) {
    throw `Error: ${parameter} Length of ${str} is less than 2`;
  }
};

export let charSwap = (str1, str2) => {
  f3Swap(str1, "charSwap: Input");
  f3Swap(str2, "charSwap: Input");
  str1 = str1.trim();
  str2 = str2.trim();
  let min = Math.min(str1.length, str2.length);
  min = min / 2;
  min = Math.floor(min);
  let charArr1 = str1.split("");
  let charArr2 = str2.split("");
  for (let i = 0; i < min; i++) {
    let temp = charArr1[i];
    charArr1[i] = charArr2[charArr2.length - min + i];
    charArr2[charArr2.length - min + i] = temp;
  }
  charArr1 = charArr1.join("");
  charArr2 = charArr2.join("");
  let ans = charArr1 + " " + charArr2;
  return ans;
};
