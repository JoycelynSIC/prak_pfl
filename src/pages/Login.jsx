import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // Icon tanda seru merah
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // --- LOGIKA VALIDASI INPUT KOSONG ---
        if (!dataForm.email || !dataForm.password) {
            setError("Username and password required");
            return; // Berhenti di sini, jangan lanjut ke Axios
        }

        setLoading(true);
        setError(""); 

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email, 
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // --- ALERT ERROR SESUAI GAMBAR ---
    const errorInfo = error ? (
        <div className="bg-[#FFD1D1] mb-6 p-4 rounded-lg flex items-center border border-red-200">
            <div className="bg-red-600 rounded-full p-1 me-3">
                <BsFillExclamationDiamondFill className="text-white text-xs" />
            </div>
            <span className="text-[#5B5B7E] text-sm font-medium">
                {error}
            </span>
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-[#FFF8EC] mb-5 p-4 text-xs rounded-2xl flex items-center border border-[#DCCCAC]/30 text-[#546B41] font-black">
            <ImSpinner2 className="me-2 animate-spin text-[#99AD7A]" />
            MOHON TUNGGU...
        </div>
    ) : null;

    return (
        <div className="text-center">
            {/* Logo Sedap sesuai gambar */}
            <h1 className="text-4xl font-black text-gray-900 mb-2">
                Sedap<span className="text-green-500">.</span>
            </h1>
            <h2 className="text-2xl font-bold text-[#344054] mb-8">
                Welcome Back 👋
            </h2>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit} className="text-left">
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="text"
                        name="email" 
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#546B41] focus:border-transparent outline-none transition-all text-gray-900"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-8">
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
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
                        loading 
                        ? 'bg-gray-400' 
                        : 'bg-[#546B41] hover:bg-[#435634]'
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}