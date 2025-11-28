import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend server URL
});

export default apiClient;
