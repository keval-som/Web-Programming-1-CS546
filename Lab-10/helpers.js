//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export function strCheck(strVal, varName) {
  if (!strVal) throw new Error(`Error: You must supply a ${varName}!`);
  if (typeof strVal !== "string")
    throw new Error(`Error: ${varName} must be a string!`);
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw new Error(
      `Error: ${varName} cannot be an empty string or string with just spaces`
    );
  return strVal;
}

export const validatePassword = (password) => {
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
