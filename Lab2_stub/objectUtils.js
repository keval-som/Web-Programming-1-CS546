/* Todo: Implement the functions below and then export them
      using the ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let f1objChecker = (objArr, parameter) => {
  if (objArr === undefined) {
    throw `Error: ${parameter || "Object"} provided is undefined`;
  }
  if (!Array.isArray(objArr)) {
    throw `Error: ${parameter || "Object"} provided is not an Array`;
  }
  if (objArr.length === 0) {
    throw `Error: ${parameter || "Array"} provided is empty`;
  }
  objArr.forEach((element, index) => {
    if (
      typeof element !== "object" ||
      element === null ||
      Array.isArray(element)
    ) {
      throw `Error: ${
        parameter || "Input"
      } provided does not contain object at index : ${index}`;
    }
    if (Object.keys(element).length === 0) {
      throw `Error: ${parameter || "Input"} provided contains an empty object`;
    }
    for (let ele in element) {
      if (typeof element[ele] !== "number") {
        throw `Error: ${
          parameter || "Input"
        } provided contains invalid value at object key ${ele}`;
      }
    }
  });
};

export let processObjects = (objArr, func) => {
  f1objChecker(objArr, "processObjects: Input");
  if (typeof func !== "function") {
    throw "Error: processObjects: Second parameter is not a function";
  }
  let primary = {};
  objArr.forEach((element) => {
    for (let ele in element) {
      if (ele in primary) {
        primary[ele] = primary[ele] * func(element[ele]);
      } else {
        primary[ele] = func(element[ele]);
      }
    }
  });
  return primary;
};

let f2ObjCheck = (obj, parameter) => {
  if (typeof obj !== "object" || obj == null || Array.isArray(obj)) {
    throw `Error: ${parameter || "Input"} provided is not an object`;
  }
};
export let similarKeysValues = (obj1, obj2) => {
  f2ObjCheck(obj1, "similarKeysValues: input");
  f2ObjCheck(obj2, "similarKeysValues: input");
  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    return {};
  }

  function checkSimilarKeys(obj1, obj2) {
    let ansObj = {};
    for (let key in obj1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (
        typeof val1 === "object" &&
        typeof val2 === "object" &&
        val1 != null &&
        val2 != null
      ) {
        ansObj[key] = checkSimilarKeys(val1, val2);
      } else if (val1 == val2) {
        ansObj[key] = val1;
      }
    }
    return ansObj;
  }

  return checkSimilarKeys(obj1, obj2);
};

export let flipKeysForStringsAndNumbers = (obj) => {
  f2ObjCheck(obj, "flipKeysForStringsAndNumbers: input");
  if (Object.keys(obj).length === 0) {
    throw `Error: flipKeysForStringsAndNumbers: Object provided is empty`;
  }
  function flipKeys(obj) {
    let ansObj = {};

    for (let key in obj) {
      let value = obj[key];
      if (Array.isArray(obj[key])) {
        let arr = obj[key];
        arr.forEach((element, index) => {
          if (typeof element !== "number" && typeof element !== "string") {
            throw `Error: flipKeysForStringsAndNumbers: Array provided in object contains an invalid datatype`;
          }
          ansObj[element] = `${key}_${index}`;
        });
      } else if (typeof obj[key] === "object" && value !== null) {
        let recur = obj[key];
        for (let i in recur) {
          if (typeof recur[i] !== "number" && typeof recur[i] !== "string") {
            throw `Error: flipKeysForStringsAndNumbers: Nested object contains an invalid datatype`;
          }
        }
        ansObj[key] = flipKeys(obj[key]);
      } else if (typeof value === "string" || typeof value === "number") {
        if (typeof value === "string" && value.trim() === "") {
          throw `Error: flipKeysForStringsAndNumbers: String value cannot be empty or just spaces`;
        }
        ansObj[value] = key;
      } else {
        throw `Error: flipKeysForStringsAndNumbers: Invalid value type in object`;
      }
    }
    return ansObj;
  }

  return flipKeys(obj);
};
