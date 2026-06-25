import { createContext, useContext, useEffect, useState } from "react";
import { usersAPI } from "../services/usersAPI";
import { profilesAPI } from "../services/profilesAPI";

const AuthContext = createContext(null);
const SESSION_KEY = "sedap_session";

export function AuthProvider({ children }) {
    const [user, setUser]       = useState(null);   // row dari tabel users
    const [profile, setProfile] = useState(null);   // row dari tabel profiles
    const [loading, setLoading] = useState(true);

    // Restore session dari localStorage saat app dimuat
    useEffect(() => {
        const saved = localStorage.getItem(SESSION_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed.user ?? null);
                setProfile(parsed.profile ?? null);
            } catch {
                localStorage.removeItem(SESSION_KEY);
            }
        }
        setLoading(false);
    }, []);

    // ── Sign In ──
    // Cek kredensial ke tabel users, lalu cari profil yang cocok di tabel profiles
    const signIn = async (email, password) => {
        const userData = await usersAPI.checkLogin(email.trim(), password);

        if (!userData) {
            throw new Error("Email atau password salah.");
        }
        if (!userData.is_active) {
            throw new Error("Akun tidak aktif. Hubungi administrator.");
        }

        // Ambil profil yang cocok — match by full_name karena tidak ada foreign key langsung
        let profileData = null;
        try {
            const allProfiles = await profilesAPI.fetchProfiles();
            profileData = allProfiles.find(
                (p) => p.full_name === userData.full_name
            ) ?? null;
        } catch (err) {
            console.warn("Gagal fetch profil:", err.message);
        }

        // Simpan ke state & localStorage
        setUser(userData);
        setProfile(profileData);
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            user: userData,
            profile: profileData,
        }));

        return userData;
    };

    // ── Sign Up ──
    // Insert ke tabel users, lalu insert ke tabel profiles dengan UUID baru
    const signUp = async (email, password, fullName) => {
        const trimmedEmail = email.trim();
        const username = trimmedEmail.split("@")[0];

        // Generate UUID untuk profiles.id
        const profileId = crypto.randomUUID();

        // 1. Insert ke tabel users kustom
        await usersAPI.registerUser({
            username,
            email:         trimmedEmail,
            password_hash: password,
            full_name:     fullName,
            is_active:     true,
        });

        // 2. Insert ke tabel profiles dengan UUID baru
        await profilesAPI.createProfile({
            id:           profileId,
            full_name:    fullName,
            role:         "member",
            current_tier: "bronze",
            total_points: 0,
        });
    };

    // ── Sign Out ──
    const signOut = () => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
        setProfile(null);
    };

    // ── Refresh profil ── (panggil setelah ada perubahan data)
    const refreshProfile = async () => {
        if (!profile?.id) return;
        try {
            const updated = await profilesAPI.fetchProfile(profile.id);
            if (updated) {
                setProfile(updated);
                const saved = localStorage.getItem(SESSION_KEY);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    localStorage.setItem(SESSION_KEY, JSON.stringify({
                        ...parsed,
                        profile: updated,
                    }));
                }
            }
        } catch (err) {
            console.error("Gagal refresh profil:", err.message);
        }
    };

    const value = { user, profile, loading, signIn, signUp, signOut, refreshProfile };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }
    return context;
}
