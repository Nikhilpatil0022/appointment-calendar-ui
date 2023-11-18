import { createStandaloneToast } from "@chakra-ui/react";
import { MESSAGE_CODES } from "../constants/message.constant";

export const setLocalStorageItem = (key, value) => {
  let setterValue = value;
  if (typeof value === "object") {
    setterValue = JSON.stringify(value);
  }
  localStorage.setItem(key, setterValue);
};

export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};

export const getRandomId = () => {
  return Math.random().toString(36).slice(2);
};

export const checkForErrors = (formData, requiredFields) => {
  let hasErrors = false;
  let formErrors = {};
  const { errorObject = {} } = formData;

  // check existing errors
  let keys = Object.keys(errorObject);
  for (let i = 0; i < keys.length; i += 1) {
    if (errorObject[keys[i]]) {
      hasErrors = true;
      return { hasErrors, errorObject };
    }
  }

  requiredFields.forEach((field) => {
    const value = formData[field];
    if (Array.isArray(value) && value.length === 0) {
      formErrors[field] = MESSAGE_CODES.required;
    } else if (!formData[field]) {
      hasErrors = true;
      formErrors[field] = MESSAGE_CODES.required;
    }
  });

  return {
    hasErrors,
    errorObject: formErrors,
  };
};

export const showToaster = (config) => {
  const { toast } = createStandaloneToast();
  toast(config);
};

export const getAuthToken = () => {
  return getLocalStorageItem("clinicToken");
};

export const setAuthToken = (value = null) => {
  setLocalStorageItem("clinicToken", value);
};

export const getDisplayNameOfUser = (user) => {
  if (!user) {
    return "";
  }
  const { first_name, last_name, email } = user;
  if (!(first_name || last_name)) {
    return email;
  }
  let fullName = "";
  if (first_name) {
    fullName += first_name[0].toUpperCase() + first_name.slice(1);
  }
  if (last_name) {
    fullName += ` ${last_name[0].toUpperCase() + last_name.slice(1)}`;
  }
  return fullName;
};

export const debounce = (func, delay = 500) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
