const TYPES = {
  USER_DATA: "USER_DATA",
};
const appStateReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const userStateReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER_DATA:
      return {
        ...state,
        userData: action.data || null,
      };
    default:
      return state;
  }
};

const appReducer = ({ appState, userState }, action) => ({
  appState: appStateReducer(appState, action),
  userState: userStateReducer(userState, action),
});

export { TYPES, appReducer };
