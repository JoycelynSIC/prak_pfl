import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = dataForm;

        if (!fullName || !email || !password || !confirmPassword) {
            setError("Semua field wajib diisi.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }
        if (password.length < 6) {
            setError("Password minimal 6 karakter.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await signUp(email, password, fullName);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Registrasi gagal. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-black text-[#546B41] mb-2 text-center tracking-tight">
                Create Account ✨
            </h2>
            <p className="text-[#99AD7A] text-center text-[10px] font-black mb-8 uppercase tracking-[0.2em]">
                Bergabung sebagai Member Sedap
            </p>

            {error && (
                <div className="bg-[#FFD1D1] mb-6 p-4 rounded-2xl flex items-center border border-red-200">
                    <div className="bg-red-600 rounded-full p-1 me-3 shrink-0">
                        <BsFillExclamationDiamondFill className="text-white text-xs" />
                    </div>
                    <span className="text-[#5B5B7E] text-sm font-medium">{error}</span>
                </div>
            )}

            {loading && (
                <div className="bg-[#FFF8EC] mb-5 p-4 text-xs rounded-2xl flex items-center border border-[#DCCCAC]/30 text-[#546B41] font-black">
                    <ImSpinner2 className="me-2 animate-spin text-[#99AD7A]" />
                    MENDAFTARKAN AKUN...
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-5">
                    <label
                        htmlFor="fullName"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="Nama Lengkap"
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="you@example.com"
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="Min. 6 karakter"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-8">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="Ulangi password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 shadow-lg active:scale-95 ${
                        loading
                            ? "bg-gray-400 text-white"
                            : "bg-[#546B41] hover:bg-[#435634] text-[#FFF8EC] shadow-[#546B41]/20"
                    }`}
                >
                    {loading ? "Mendaftar..." : "Register Now"}
                </button>

                <p className="text-center text-sm text-[#99AD7A] font-bold mt-6">
                    Sudah punya akun?{" "}
                    <Link to="/login" className="text-[#546B41] hover:underline font-black">
                        Login di sini
                    </Link>
                </p>
            </form>
        </div>
    );
}
