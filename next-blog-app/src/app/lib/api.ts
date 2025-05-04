import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// // Request interceptor to log outgoing requests
// api.interceptors.request.use(
//   (config) => {
//     console.log("Request:", config);
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to log incoming responses
// api.interceptors.response.use(
//   (response) => {
//     console.log("Response:", response);
//     return response;
//   },
//   (error) => {
//     console.error("Response Error:", error);
//     return Promise.reject(error);
//   }
// );
