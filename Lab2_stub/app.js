/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import * as arrayUtil from "./arrayUtils.js";
import * as stringUtil from "./stringUtils.js";
import * as objectUtil from "./objectUtils.js";

try {
  console.log(
    arrayUtil.arrayAnalysis([
      92, 55, 15.5, -5, -15, 7, 110, 5, 11, 40, 4, 1, -20,
    ])
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(arrayUtil.arrayAnalysis([64, 9, 11, 15, "55"]));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    arrayUtil.mergeKeyValuePairs(
      ["a", "World"],
      ["b", 200],
      ["c", 100],
      ["c", 300],
      ["c", 100],
      ["a", 100],
      ["x", 500],
      ["c", "Hello"]
    )
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(
    arrayUtil.mergeKeyValuePairs(["k1", "hello"], ["k3"], ["k2", "world"])
  );
} catch (error) {
  console.log(error);
}

const arr1 = [9, [8, { b: [12], c: 11 }], 4, [6]];
const arr2 = [9, [8, { b: [12], c: 11 }], 4, [6]];

try {
  console.log(arrayUtil.deepArrayEquality(arr1, arr2));
} catch (error) {
  console.log(error);
}

try {
  console.log(arrayUtil.deepArrayEquality([], [{ 0: undefined }]));
} catch (error) {
  console.log(error);
}

try {
  console.log(stringUtil.replaceCharsAtIndexes(" da d d y ", [2]));
} catch (error) {
  console.log(error);
}

try {
  console.log(stringUtil.replaceCharsAtIndexes("encyclopedia   ", [0, 7]));
} catch (error) {
  console.log(error);
}

try {
  console.log(
    stringUtil.anagrams("They acted to trade the rated goods fairly", "trade")
  );
} catch (error) {
  console.log(error);
}
try {
  console.log(
    stringUtil.anagrams("They used a spare rope to prepare the tent.", [
      "spare",
    ])
  );
} catch (error) {
  console.log(error);
}

try {
  console.log(stringUtil.charSwap("Successful", "failure"));
} catch (error) {
  console.log(error);
}

try {
  console.log(stringUtil.charSwap(false, "howYouDoing?"));
} catch (error) {
  console.log(error);
}

const first = { x: 8, x: 6 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 1, y: 9, q: 10 };
const fifth = { k: 1, b: 2, c: "4" };

try {
  console.log(objectUtil.processObjects([first, second], (x) => x / 2));
} catch (error) {
  console.log(error);
}

try {
  console.log(objectUtil.processObjects([third, fifth], (x) => x));
} catch (error) {
  console.log(error);
}

const obj3 = { x1: { x: 1, y: 2 }, b: "cd" };
const obj4 = { x1: { x: "1", y: 2 }, b: "3" };
const obj5 = [];
const obj6 = { a: 2, b: { x: [{ k: 1 }] } };

try {
  console.log(objectUtil.similarKeysValues(obj3, obj4));
} catch (error) {
  console.log(error);
}

try {
  console.log(objectUtil.similarKeysValues(obj5, obj6));
} catch (error) {
  console.log(error);
}

const example2 = { a: 1, b: [5, 5], x: { y: [2] } };
const example3 = { a: "test", b: ["apple", "banana"], d: { y: 5, z: "ok" } };
try {
  console.log(objectUtil.flipKeysForStringsAndNumbers(example3));
} catch (error) {
  console.log(error);
}
try {
  console.log(
    objectUtil.flipKeysForStringsAndNumbers({
      key1: "Challenging",
      key2: [3, 4, 5],
      a: 102,
      b: { x: 45, y: ["value1"] },
      d: { e: 85, f: "text", g: { h: 100 } },
      extraKey: "true",
    })
  );
} catch (error) {
  console.log(error);
}
