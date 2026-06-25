import { profilesAPI } from "./profilesAPI";

export const customersService = {
    // Admin: semua profiles dengan role 'member'
    getMembers: async () => {
        const all = await profilesAPI.fetchProfiles();
        return all.filter((p) => p.role === "member");
    },
};
