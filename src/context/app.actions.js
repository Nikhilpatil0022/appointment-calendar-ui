import { TYPES } from "./app.reducer";

function setUserData(data) {
  return {
    type: TYPES.USER_DATA,
    data,
  };
}

export { setUserData };
