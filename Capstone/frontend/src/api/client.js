import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
console.log("API BASE URL:", apiUrl); // DEBUG

const client = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan token ke setiap request
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handling error global (opsional)
client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || "Terjadi kesalahan";
        // Bisa tambahkan logic logout otomatis jika 401 Unauthorized
        // if (error.response?.status === 401) { ... }
        return Promise.reject(new Error(message));
    }
);

export default client;
