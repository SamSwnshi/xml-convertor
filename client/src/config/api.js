import axios from "axios";

const api = axios.create({
  baseURL: "https://xml-convertor.onrender.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
