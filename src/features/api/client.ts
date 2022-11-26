import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

export default client;
