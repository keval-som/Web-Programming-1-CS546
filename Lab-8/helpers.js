import axios from "axios";

let responseCheck = (response) => {
  if (response.status != 200) {
    if (!response.data) {
      throw new Error("Error: CallApi: API response is empty or invalid");
    }
  }
};

export const callApi = async (url, method, data) => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    responseCheck(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error while calling API: ${error.message}`);
  }
};

export const strCheck = (str, name) => {
  if (!str) {
    throw new Error(`${name} must be provided`);
  }
  if (typeof str !== "string") {
    throw new Error(`${name} must be a string`);
  }
  if (str.trim() === "") {
    throw new Error(`${name} cannot be empty`);
  }
};
