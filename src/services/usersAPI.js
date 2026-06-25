import axios from 'axios';

const API_URL = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

export const usersAPI = {
    async registerUser(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data[0];
    },

    async checkLogin(email, password) {
        const response = await axios.get(`${API_URL}?email=eq.${email}&password_hash=eq.${password}`, { headers });
        return response.data[0]; // Returns undefined if not found, or user object
    }
};
