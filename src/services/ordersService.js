import { ordersAPI } from "./ordersAPI";

export const ordersService = {
    // Admin: semua order
    getAll: () => ordersAPI.fetchOrders(),

    // Member: order milik sendiri — filter langsung di query Supabase REST
    getMyOrders: (memberId) => ordersAPI.fetchMyOrders(memberId),

    // Buat order + items
    createOrder: (orderPayload, items) => ordersAPI.createOrder(orderPayload, items[0]),

    // Update status (admin)
    updateStatus: (id, status) => ordersAPI.updateOrderStatus(id, status),
};
