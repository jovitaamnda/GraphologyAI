import client from "./client";

export const authApi = {
    login: async (email, password) => {
        // client.post return response.data directly because of interceptor
        return client.post("/api/auth/login", { email, password });
    },

    register: async (userData) => {
        return client.post("/api/auth/register", userData);
    },

    getProfile: async () => {
        return client.get("/api/auth/me");
    },

    updateProfile: async (data) => {
        return client.put("/api/auth/profile", data);
    },

    changePassword: async (currentPassword, newPassword) => {
        return client.post("/api/auth/change-password", { currentPassword, newPassword });
    },
};
