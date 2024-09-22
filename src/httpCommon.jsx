import axios from "axios";

export const baseURL= "http://localhost:9000/"
export default axios.create({
  baseURL:baseURL+"api",
  headers: {
    'Content-Type': 'application/json'
  },
});
