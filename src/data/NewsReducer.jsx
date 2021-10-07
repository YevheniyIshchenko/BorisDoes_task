export const newsReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return {
        post: action.payload,
      };
    case "SORT_TITLE":
      return {
        post: action.payload.sort((a, b) => (a.title > b.title ? 1 : -1)),
      };
    case "SORT_DOMAIN":
      return {
        post: action.payload.sort((a, b) => (a.domain > b.domain ? 1 : -1)),
      };
    case "SORT_DATE":
      return {
        post: action.payload.sort((a, b) => a.time - b.time),
      };
    default:
      return state;
  }
};
