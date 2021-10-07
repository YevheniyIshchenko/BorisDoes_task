import axios from "axios";

export const newsData = (url) =>
  axios.get(url);
