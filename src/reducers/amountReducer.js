const reducer = (state, action) => {
  switch (action.type) {
    case "IN":
      return { data: action.data };
    case "OUT":
      return { data: "" };
    default:
      return state;
  }
};
export default reducer;
