// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let signupForm = document.getElementById("signup-form");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let userId = document.getElementById("userId");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let favoriteQuote = document.getElementById("favoriteQuote");
let backgroundColor = document.getElementById("backgroundColor");
let hiddenBackgroundColor = document.getElementById("hiddenBackgroundColor");
let fontColor = document.getElementById("fontColor");
let hiddenFontColor = document.getElementById("hiddenFontColor");
let errorMessage = document.getElementById("error-message");
let signinForm = document.getElementById("signin-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!strCheck(firstname.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "First name is required";
      return;
    }
    firstname.value = firstname.value.trim();
    if (/\d/.test(firstname.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "First name should not contain numbers";
      return;
    }
    if (firstname.value.length < 2 || firstname.value.length > 25) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "First name must be between 2 and 25 characters long";
      return;
    }
    if (!strCheck(lastname.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Last name is required";
      return;
    }
    lastname.value = lastname.value.trim();
    if (/\d/.test(lastname.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Last name should not contain numbers";
      return;
    }
    if (lastname.value.length < 2 || lastname.value.length > 25) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Last name must be between 2 and 25 characters long";
      return;
    }
    if (!strCheck(userId.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID is required";
      return;
    }
    userId.value = userId.value.trim();
    if (/\d/.test(userId.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID should not contain numbers";
      return;
    }
    if (userId.value.length < 5 || userId.value.length > 10) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID must be between 5 and 10 characters long";
      return;
    }
    if (!strCheck(password.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Password is required";
      return;
    }
    password.value = password.value.trim();
    try {
      validatePassword(password.value);
    } catch (error) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = error.message;
      return;
    }
    if (!strCheck(confirmPassword.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Confirm password is required";
      return;
    }
    if (!strCheck(favoriteQuote.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Favorite quote is required";
      return;
    }
    favoriteQuote.value = favoriteQuote.value.trim();
    if (favoriteQuote.value.length < 20 || favoriteQuote.value.length > 255) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Favorite quote must be between 20 and 255 characters long";
      return;
    }
    if (!backgroundColor.value) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Background color is required";
      return;
    }
    hiddenBackgroundColor.value = backgroundColor.value;
    if (!fontColor.value) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Font color is required";
      return;
    }
    hiddenFontColor.value = fontColor.value;
    const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

    if (!hexColorRegex.test(backgroundColor.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Background color must be a valid hex color code";
      return;
    }

    if (!hexColorRegex.test(fontColor.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Font color must be a valid hex color code";
      return;
    }

    if (backgroundColor.value.toLowerCase() === fontColor.value.toLowerCase()) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Background color and font color cannot be the same";
      return;
    }

    if (!strCheck(role.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Role is required";
      return;
    }
    role.value = role.value.trim();
    if (role.value !== "admin" && role.value !== "user") {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Role must be either admin or user";
      return;
    }
    if (password.value !== confirmPassword.value) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Passwords do not match";
      return;
    }
    errorMessage.hidden = true;

    event.target.submit();
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!userId.value) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID is required";
      return;
    }
    userId.value = userId.value.trim();
    if (/\d/.test(userId.value)) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID should not contain numbers";
      return;
    }
    if (userId.value.length < 5 || userId.value.length > 10) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "User ID must be between 5 and 10 characters long";
      return;
    }
    if (!password.value) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = "Password is required";
      return;
    }
    password.value = password.value.trim();
    try {
      validatePassword(password.value);
    } catch (error) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = error.message;
      return;
    }
    errorMessage.hidden = true;

    event.target.submit();
  });
}

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

function validatePassword(password) {
  if (/\s/.test(password)) {
    throw new Error("password cannot contain spaces");
  }
  if (password.length < 8) {
    throw new Error("password must be at least 8 characters long");
  }
  if (/^\s*$/.test(password)) {
    throw new Error("password cannot be just spaces");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("password must contain at least one uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    throw new Error("password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new Error("password must contain at least one special character");
  }
};