//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from "axios";

let responseCheck = (response) => {
  if (response.status != 200) {
    if (!response.data) {
      throw new Error("Error: CallApi: API response is empty or invalid");
    }
  }
};

export async function callApi(url, params) {
  if (typeof url !== "string" || !url) {
    throw "Error: callApi: url is undefined or it has invalid type";
  }
  if (!params) {
    params = "";
  }
  if (typeof params !== "string") {
    throw "Error: callApi: params has invalid type";
  }

  params = params.trim();

  url = url.trim();
  if (url.length === 0) {
    throw "Error: callApi: Url is empty";
  }

  try {
    const response = await axios.get(url + params);
    responseCheck(response);
    return response;
  } catch (error) {
    throw `Error: CallApi: Error occured while calling Api: ${url} Message: ${error.message}`;
  }
}
