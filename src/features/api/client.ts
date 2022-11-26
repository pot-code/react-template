import { Axios } from "axios";

const client = new Axios({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

export default client;
