const initialState = {
  status: false, //co loading hay ko
};

const globalLoading = (state = initialState, action) => {
  switch (action.type) {
    case "CONTROL_LOADING":
      state = {
        status: action.status,
      };
      return state;
    default:
      return state;
  }
};

export default globalLoading;
