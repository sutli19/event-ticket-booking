import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
baseURL:
  import.meta.env.VITE_API_URL || "http://localhost:5000/api",  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "Unable to connect to server";
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosClient;
