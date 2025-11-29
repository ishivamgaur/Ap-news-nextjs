import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000/api", // local backend server URL
  baseURL: "https://ap-news-b.onrender.com/api", // Your backend server URL
});

export default apiClient;
