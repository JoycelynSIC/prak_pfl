import axios from 'axios';

const API_URL = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1/products";
const API_KEY = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

export const productsAPI = {
    async fetchProducts() {
        const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
        return response.data;
    },

    async createProduct(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data[0];
    },

    async updateProduct(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
        return response.data[0];
    },

    async deleteProduct(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    }
};
