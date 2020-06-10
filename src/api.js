import axios from "axios";

export default (target = "") => {
  const encodedURI = encodeURI(
    `https://jsonplaceholder.typicode.com/${target}?_page=1&_limit=7`
  );

  return axios.get(encodedURI, {
    withCredentials: false,
    headers: {
      crossorigin: true,
    },
  });
};
