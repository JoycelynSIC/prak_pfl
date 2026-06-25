import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { FaArrowLeft, FaBoxOpen, FaSpinner, FaShoppingCart, FaStar, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { ordersService } from "../services/ordersService";
import axios from "axios";

const API_BASE = "https://budpqbztxqdmjvstbtcy.supabase.co/rest/v1";
const API_KEY  = "sb_publishable_3_gPgc9b8Ly7Qr1KJUEqrA_2CrXA5H9";
const HEADERS  = { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` };

const TIER_DISCOUNT = { bronze: 0, silver: 0.05, gold: 0.10, platinum: 0.15 };
const TIER_CONFIG   = {
    platinum: { color: "bg-purple-600", text: "text-white",      ring: "ring-purple-300", label: "Platinum" },
    gold:     { color: "bg-yellow-400", text: "text-yellow-900", ring: "ring-yellow-300", label: "Gold" },
    silver:   { color: "bg-gray-400",   text: "text-white",      ring: "ring-gray-300",   label: "Silver" },
    bronze:   { color: "bg-[#DCCCAC]",  text: "text-[#546B41]",  ring: "ring-[#DCCCAC]",  label: "Bronze" },
};

export default function ProductDetail() {
    const { id }      = useParams();
    const navigate    = useNavigate();
    const { profile } = useAuth();
    const isAdmin     = profile?.role === "admin";
    const isMember    = profile?.role === "member";

    const [product, setProduct]       = useState(null);
    const [error, setError]           = useState(null);
    const [loading, setLoading]       = useState(true);
    const [quantity, setQuantity]     = useState(1);
    const [ordering, setOrdering]     = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderError, setOrderError] = useState("");

    const tier         = TIER_CONFIG[profile?.current_tier] ?? TIER_CONFIG.bronze;
    const discountRate = TIER_DISCOUNT[profile?.current_tier] ?? 0;

    // ── Kalkulasi harga ──
    const subtotal       = useMemo(() => (product?.price ?? 0) * quantity, [product, quantity]);
    const discountAmount = useMemo(() => subtotal * discountRate, [subtotal, discountRate]);
    const totalAmount    = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);
    const pointsEarned   = useMemo(() => Math.floor(totalAmount / 10000), [totalAmount]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE}/products?id=eq.${id}`, { headers: HEADERS });
                const data = res.data[0];
                if (!data) throw new Error("Produk tidak ditemukan");
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleOrder = async () => {
        if (!profile?.id || !product) return;
        setOrdering(true);
        setOrderError("");
        try {
            await ordersService.createOrder(
                {
                    member_id:       profile.id,
                    subtotal:        subtotal,
                    discount_amount: discountAmount,
                    total_amount:    totalAmount,
                    status:          "pending",
                },
                [{
                    product_id:        product.id,
                    quantity:          quantity,
                    price_at_purchase: product.price,
                }]
            );
            setOrderSuccess(true);
            setTimeout(() => navigate("/orders"), 2000);
        } catch (err) {
            setOrderError(err.message || "Gagal membuat order.");
        } finally {
            setOrdering(false);
        }
    };

    // ── Loading ──
    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh] text-[#99AD7A]">
            <FaSpinner className="animate-spin text-3xl mr-3" />
            <span className="font-black uppercase tracking-widest text-sm">Memuat...</span>
        </div>
    );

    // ── Error ──
    if (error || !product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <FaBoxOpen className="text-5xl text-[#DCCCAC]" />
            <p className="font-black text-[#99AD7A] uppercase tracking-widest text-sm">{error ?? "Produk tidak ditemukan"}</p>
            <Link to="/products" className="flex items-center gap-2 bg-[#546B41] text-[#FFF8EC] font-bold px-6 py-2.5 rounded-xl hover:bg-[#435634] transition-all">
                <FaArrowLeft /> Kembali
            </Link>
        </div>
    );

    const outOfStock = product.stock === 0;

    return (
        <div className="bg-[#FFF8EC] min-h-screen pb-16 px-10">
            {/* Back */}
            <div className="pt-8 mb-8">
                <Link to="/products"
                    className="inline-flex items-center gap-2 text-[#99AD7A] font-black text-xs uppercase tracking-widest hover:text-[#546B41] transition-colors group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Produk
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl">

                {/* ── Kolom kiri: gambar & info ── */}
                <div className="lg:col-span-3 space-y-5">
                    {/* Product card */}
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-[#DCCCAC]/20">
                        {/* Hero area */}
                        <div className="bg-gradient-to-br from-[#FFF8EC] via-[#DCCCAC]/10 to-[#99AD7A]/10 p-16 flex items-center justify-center relative">
                            <FaBoxOpen className="text-8xl text-[#99AD7A]/60" />
                            {outOfStock && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <span className="bg-red-500 text-white font-black text-sm uppercase tracking-widest px-6 py-2 rounded-full rotate-[-15deg]">
                                        Stok Habis
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Detail */}
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-2xl font-black text-[#546B41] leading-tight flex-1 mr-4">
                                    {product.name}
                                </h1>
                                <span className={`shrink-0 text-[9px] font-black uppercase px-3 py-1.5 rounded-full ${
                                    outOfStock ? "bg-red-100 text-red-500" :
                                    product.stock <= 5 ? "bg-yellow-100 text-yellow-700" :
                                    "bg-[#546B41]/10 text-[#546B41]"
                                }`}>
                                    {outOfStock ? "Habis" : product.stock <= 5 ? "Menipis" : "Tersedia"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-[#FFF8EC] rounded-2xl p-4">
                                    <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider mb-1">Stok</p>
                                    <p className={`text-2xl font-black ${outOfStock ? "text-red-500" : product.stock <= 5 ? "text-yellow-500" : "text-[#546B41]"}`}>
                                        {product.stock}
                                    </p>
                                    <p className="text-[10px] font-bold text-[#DCCCAC]">unit tersisa</p>
                                </div>
                                <div className="bg-[#FFF8EC] rounded-2xl p-4">
                                    <p className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider mb-1">Harga Dasar</p>
                                    <p className="text-xl font-black text-[#546B41]">
                                        Rp {Number(product.price).toLocaleString("id-ID")}
                                    </p>
                                    <p className="text-[10px] font-bold text-[#DCCCAC]">per unit</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info poin yang bisa didapat */}
                    {isMember && !outOfStock && (
                        <div className="bg-white rounded-3xl p-6 border border-[#DCCCAC]/20 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <FaStar className="text-yellow-400 text-lg" />
                                <p className="font-black text-[#546B41] text-sm uppercase tracking-wider">Estimasi Poin</p>
                            </div>
                            <p className="text-[#99AD7A] text-sm font-bold">
                                Setiap Rp 10.000 pembelian = <span className="text-[#546B41] font-black">1 poin</span>
                            </p>
                            <p className="text-[#99AD7A] text-sm font-bold mt-1">
                                Order ini estimasi mendapat{" "}
                                <span className="text-[#546B41] font-black text-lg">+{pointsEarned} poin</span>
                            </p>
                            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                                {[["Bronze","0%"],["Silver","5%"],["Gold","10%"],["Platinum","15%"]].map(([t,d]) => (
                                    <div key={t} className={`rounded-xl py-2 text-[9px] font-black uppercase ${
                                        t.toLowerCase() === profile?.current_tier
                                            ? "bg-[#546B41] text-[#FFF8EC]"
                                            : "bg-[#FFF8EC] text-[#DCCCAC]"
                                    }`}>
                                        <div>{t}</div>
                                        <div className="text-[10px]">{d}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Kolom kanan: checkout ── */}
                <div className="lg:col-span-2">
                    {/* Order success */}
                    {orderSuccess && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center mb-5">
                            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
                            <p className="font-black text-green-700 text-lg">Order Berhasil!</p>
                            <p className="text-sm text-green-600 font-bold mt-1">Mengalihkan ke halaman orders...</p>
                        </div>
                    )}

                    {/* Checkout panel */}
                    {!orderSuccess && (
                        <div className="bg-white rounded-[2.5rem] p-8 border border-[#DCCCAC]/20 shadow-sm sticky top-6">
                            <h3 className="font-black text-[#546B41] text-lg mb-6 uppercase tracking-tight">
                                {isAdmin ? "Detail Produk" : "Checkout"}
                            </h3>

                            {isMember && (
                                <>
                                    {/* Tier badge */}
                                    <div className={`flex items-center gap-3 ${tier.color} rounded-2xl px-4 py-3 mb-6`}>
                                        <FaStar className={`${tier.text} text-sm`} />
                                        <div>
                                            <p className={`text-[9px] font-black uppercase tracking-wider ${tier.text} opacity-75`}>Tier Aktif</p>
                                            <p className={`text-sm font-black ${tier.text}`}>{tier.label} — Diskon {Math.round(discountRate * 100)}%</p>
                                        </div>
                                    </div>

                                    {/* Qty selector */}
                                    <div className="mb-5">
                                        <label className="text-[10px] font-black text-[#DCCCAC] uppercase tracking-wider block mb-3">
                                            Jumlah
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                                className="w-10 h-10 rounded-xl bg-[#FFF8EC] flex items-center justify-center text-[#546B41] font-black hover:bg-[#DCCCAC]/20 transition-all disabled:opacity-40 active:scale-95"
                                            >
                                                <FaMinus className="text-xs" />
                                            </button>
                                            <span className="text-2xl font-black text-[#546B41] w-12 text-center tabular-nums">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                disabled={quantity >= product.stock}
                                                className="w-10 h-10 rounded-xl bg-[#FFF8EC] flex items-center justify-center text-[#546B41] font-black hover:bg-[#DCCCAC]/20 transition-all disabled:opacity-40 active:scale-95"
                                            >
                                                <FaPlus className="text-xs" />
                                            </button>
                                            <span className="text-xs font-bold text-[#DCCCAC] ml-1">max {product.stock}</span>
                                        </div>
                                    </div>

                                    {/* Ringkasan harga */}
                                    <div className="bg-[#FFF8EC] rounded-2xl p-5 space-y-3 mb-5">
                                        <div className="flex justify-between text-sm font-bold text-[#546B41]">
                                            <span className="text-[#99AD7A]">Harga satuan</span>
                                            <span>Rp {Number(product.price).toLocaleString("id-ID")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold text-[#546B41]">
                                            <span className="text-[#99AD7A]">Subtotal ({quantity}x)</span>
                                            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                                        </div>
                                        {discountRate > 0 && (
                                            <div className="flex justify-between text-sm font-bold text-green-600">
                                                <span>Diskon {Math.round(discountRate * 100)}%</span>
                                                <span>- Rp {discountAmount.toLocaleString("id-ID")}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-[#DCCCAC]/30 pt-3 flex justify-between font-black text-[#546B41]">
                                            <span>Total Bayar</span>
                                            <span className="text-lg">Rp {totalAmount.toLocaleString("id-ID")}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-yellow-600">
                                            <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> Poin didapat</span>
                                            <span>+{pointsEarned} poin</span>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {orderError && (
                                        <p className="text-red-500 text-xs font-bold mb-4 bg-red-50 px-4 py-2 rounded-xl">{orderError}</p>
                                    )}

                                    {/* Tombol order */}
                                    <button
                                        onClick={handleOrder}
                                        disabled={outOfStock || ordering}
                                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                                            outOfStock
                                                ? "bg-[#FFF8EC] text-[#DCCCAC] cursor-not-allowed shadow-none"
                                                : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] shadow-[#546B41]/30"
                                        }`}
                                    >
                                        {ordering ? (
                                            <><FaSpinner className="animate-spin" /> Memproses...</>
                                        ) : (
                                            <><FaShoppingCart /> {outOfStock ? "Stok Habis" : "Buat Order"}</>
                                        )}
                                    </button>
                                </>
                            )}

                            {/* Admin view */}
                            {isAdmin && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-[#FFF8EC]">
                                        <span className="text-xs font-black text-[#DCCCAC] uppercase tracking-wider">Harga</span>
                                        <span className="font-black text-[#546B41]">Rp {Number(product.price).toLocaleString("id-ID")}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-[#FFF8EC]">
                                        <span className="text-xs font-black text-[#DCCCAC] uppercase tracking-wider">Stok</span>
                                        <span className={`font-black ${outOfStock ? "text-red-500" : "text-[#546B41]"}`}>{product.stock} unit</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-xs font-black text-[#DCCCAC] uppercase tracking-wider">Ditambahkan</span>
                                        <span className="font-bold text-[#546B41] text-sm">
                                            {new Date(product.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
