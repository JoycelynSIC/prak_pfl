import axios from 'axios';

const API_URL = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1/profiles";
const API_KEY = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

export const profilesAPI = {
    async fetchProfiles() {
        const response = await axios.get(`${API_URL}?order=total_points.desc`, { headers });
        return response.data;
    },

    async fetchProfile(id) {
        const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
        return response.data[0];
    },

    async createProfile(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data[0];
    },

    async updateProfile(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data[0];
    }
};
