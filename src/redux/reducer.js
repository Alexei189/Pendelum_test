const initialState = { range: {} };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RANGE":
      return { ...state, range: action.payload };
    default:
      return state;
  }
};

export default reducer;
