import axios from "axios";

const token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옵니다.

export const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // 동적으로 API URL 설정
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

// 요청을 보낼 때마다 토큰을 포함시킵니다.
client.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
