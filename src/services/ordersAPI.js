import axios from 'axios';

const ORDERS_URL = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1/orders";
const ITEMS_URL  = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1/order_items";
const API_KEY    = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation",
};

export const ordersAPI = {
    // Admin: semua order (tanpa nested join)
    async fetchOrders() {
        const response = await axios.get(`${ORDERS_URL}?order=created_at.desc`, { headers });
        return response.data;
    },

    // Member: order milik sendiri — filter langsung di query
    async fetchMyOrders(memberId) {
        const response = await axios.get(
            `${ORDERS_URL}?member_id=eq.${memberId}&order=created_at.desc`,
            { headers }
        );
        return response.data;
    },

    // Insert order baru
    async createOrder(orderData, itemData) {
        const orderResponse = await axios.post(ORDERS_URL, orderData, { headers });
        const newOrder = orderResponse.data[0];

        await axios.post(ITEMS_URL, { ...itemData, order_id: newOrder.id }, { headers });

        return newOrder;
    },

    // Update status order
    async updateOrderStatus(id, status) {
        const response = await axios.patch(
            `${ORDERS_URL}?id=eq.${id}`,
            { status },
            { headers }
        );
        return response.data[0];
    },
};
