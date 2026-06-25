import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dataForm.email || !dataForm.password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await signIn(dataForm.email, dataForm.password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Login gagal. Periksa email dan password kamu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
                Sedap<span className="text-green-500">.</span>
            </h1>
            <h2 className="text-2xl font-bold text-[#344054] mb-8">
                Welcome Back 👋
            </h2>

            {error && (
                <div className="bg-[#FFD1D1] mb-6 p-4 rounded-lg flex items-center border border-red-200">
                    <div className="bg-red-600 rounded-full p-1 me-3">
                        <BsFillExclamationDiamondFill className="text-white text-xs" />
                    </div>
                    <span className="text-[#5B5B7E] text-sm font-medium">{error}</span>
                </div>
            )}

            {loading && (
                <div className="bg-[#FFF8EC] mb-5 p-4 text-xs rounded-2xl flex items-center border border-[#DCCCAC]/30 text-[#546B41] font-black">
                    <ImSpinner2 className="me-2 animate-spin text-[#99AD7A]" />
                    MOHON TUNGGU...
                </div>
            )}

            <form onSubmit={handleSubmit} className="text-left">
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#546B41] focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#546B41] focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="********"
                    />
                </div>

                <div className="flex justify-between items-center mb-8 text-sm">
                    <Link to="/register" className="text-[#546B41] font-bold hover:underline">
                        Belum punya akun? Register
                    </Link>
                    <Link to="/forgot" className="text-[#99AD7A] hover:underline">
                        Lupa password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                        loading ? "bg-gray-400" : "bg-[#546B41] hover:bg-[#435634]"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
