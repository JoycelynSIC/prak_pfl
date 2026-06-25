import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  FaPlus, FaTimes, FaBoxOpen, FaTrash, FaSpinner,
  FaShoppingCart, FaSearch, FaStar,
} from "react-icons/fa";
import { productsService } from "../services/productsService";
import { useAuth } from "../context/AuthContext";

const TIER_CONFIG = {
  platinum: { color: "bg-purple-600", text: "text-white",      label: "Platinum" },
  gold:     { color: "bg-yellow-400", text: "text-yellow-900", label: "Gold"     },
  silver:   { color: "bg-gray-400",   text: "text-white",      label: "Silver"   },
  bronze:   { color: "bg-[#DCCCAC]",  text: "text-[#546B41]",  label: "Bronze"   },
};
const TIER_DISCOUNT = { bronze: 0, silver: 5, gold: 10, platinum: 15 };

export default function Product() {
  const { profile } = useAuth();
  const isAdmin  = profile?.role === "admin";
  const isMember = profile?.role === "member";

  const [products, setProducts]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [isLoaded, setIsLoaded]   = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState("");
  const [search, setSearch]       = useState("");
  const [viewMode, setViewMode]   = useState("grid");

  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const tier     = TIER_CONFIG[profile?.current_tier] ?? TIER_CONFIG.bronze;
  const discount = TIER_DISCOUNT[profile?.current_tier] ?? 0;

  // ── Fetch produk ──
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsService.getAll();
      setProducts(data);
      setFiltered(data);
      setIsLoaded(true);
    } catch (err) {
      console.error("Gagal memuat produk:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Search filter ──
  useEffect(() => {
    if (!search.trim()) { setFiltered(products); return; }
    setFiltered(products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, products]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Add product ──
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      setFormError("Semua field wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      await productsService.create({
        name:  form.name.trim(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      });
      setForm({ name: "", price: "", stock: "" });
      setShowForm(false);
      await fetchProducts();
    } catch (err) {
      setFormError(err.message || "Gagal menyimpan produk.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete product ──
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus produk "${name}"?`)) return;
    try {
      await productsService.remove(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const discountedPrice = (price) => price - price * (discount / 100);

  return (
    <div className="bg-[#FFF8EC] min-h-screen pb-10">
      <div className="px-10">
        <PageHeader title="Products" breadcrumb={["Dashboard", "Products"]}>
          {isAdmin && (
            <button
              onClick={() => { setShowForm(!showForm); setFormError(""); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${
                showForm
                  ? "bg-[#DCCCAC] text-[#546B41]"
                  : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] hover:-translate-y-0.5 active:scale-95"
              }`}
            >
              {showForm ? <FaTimes /> : <FaPlus />}
              {showForm ? "Cancel" : "Add Product"}
            </button>
          )}
        </PageHeader>
      </div>

      <div className="px-10 mt-2 space-y-6">

        {/* ── Banner diskon untuk member ── */}
        {isMember && (
          <div className={`${tier.color} rounded-3xl p-6 flex items-center justify-between shadow-lg`}
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease-out" }}>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-2xl p-3">
                <FaStar className={`text-2xl ${tier.text}`} />
              </div>
              <div>
                <p className={`text-xs font-black uppercase tracking-widest opacity-75 ${tier.text}`}>Tier Kamu</p>
                <p className={`text-2xl font-black ${tier.text}`}>{tier.label}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs font-black uppercase tracking-widest opacity-75 ${tier.text}`}>Diskon Spesial</p>
              <p className={`text-4xl font-black ${tier.text}`}>{discount}%</p>
              <p className={`text-xs font-bold opacity-75 ${tier.text}`}>untuk setiap pembelian</p>
            </div>
          </div>
        )}

        {/* ── Form Add Product (admin only) ── */}
        {isAdmin && showForm && (
          <form onSubmit={handleSave}
            className="bg-white p-8 rounded-3xl shadow-xl border border-[#DCCCAC]/30">
            <h3 className="text-lg font-black text-[#546B41] mb-6 border-l-4 border-[#99AD7A] pl-4 uppercase tracking-tight">
              Add New Product
            </h3>
            {formError && (
              <p className="text-red-500 text-sm font-bold mb-4 bg-red-50 px-4 py-2 rounded-xl">{formError}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Product Name</label>
                <input name="name" value={form.name} onChange={handleFormChange}
                  className="bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold"
                  placeholder="Nama produk" />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Price (Rp)</label>
                <input type="number" name="price" value={form.price} onChange={handleFormChange} min="0"
                  className="bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold"
                  placeholder="0" />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-[#99AD7A] uppercase tracking-wider">Stock</label>
                <input type="number" name="stock" value={form.stock} onChange={handleFormChange} min="0"
                  className="bg-[#FFF8EC] p-3 rounded-xl outline-none border-2 border-transparent focus:border-[#DCCCAC] transition-all text-[#546B41] placeholder-[#DCCCAC] font-bold"
                  placeholder="0" />
              </div>
              <div className="md:col-span-4">
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 bg-[#99AD7A] text-[#FFF8EC] font-black py-3 px-8 rounded-xl shadow-lg hover:bg-[#546B41] transition-all uppercase text-xs tracking-widest active:scale-95 disabled:opacity-60">
                  {saving && <FaSpinner className="animate-spin" />}
                  {saving ? "Menyimpan..." : "Save Product"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ── Search & View Toggle ── */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99AD7A] text-sm" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border-2 border-transparent focus:border-[#DCCCAC] outline-none text-[#546B41] font-bold placeholder-[#DCCCAC] transition-all shadow-sm" />
          </div>
          <div className="flex bg-white rounded-2xl border border-[#DCCCAC]/30 overflow-hidden shadow-sm">
            <button onClick={() => setViewMode("grid")}
              className={`px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${viewMode === "grid" ? "bg-[#546B41] text-[#FFF8EC]" : "text-[#99AD7A] hover:bg-[#FFF8EC]"}`}>
              Grid
            </button>
            <button onClick={() => setViewMode("table")}
              className={`px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${viewMode === "table" ? "bg-[#546B41] text-[#FFF8EC]" : "text-[#99AD7A] hover:bg-[#FFF8EC]"}`}>
              Table
            </button>
          </div>
          <span className="text-xs font-black text-[#DCCCAC] uppercase tracking-wider">
            {filtered.length} produk
          </span>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex justify-center items-center py-20 text-[#99AD7A]">
            <FaSpinner className="animate-spin text-3xl mr-3" />
            <span className="font-black uppercase tracking-widest text-sm">Memuat produk...</span>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col justify-center items-center py-20 text-[#DCCCAC] bg-white rounded-[2.5rem] border border-[#DCCCAC]/20">
            <FaBoxOpen className="text-5xl mb-4" />
            <p className="font-black uppercase tracking-widest text-sm">
              {search ? "Produk tidak ditemukan" : "Belum ada produk"}
            </p>
          </div>
        )}

        {/* ══════════════════════════
            GRID VIEW
        ══════════════════════════ */}
        {!loading && filtered.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => {
              const outOfStock = product.stock === 0;
              const lowStock   = product.stock > 0 && product.stock <= 5;
              const finalPrice = discountedPrice(product.price);

              return (
                <div key={product.id}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="bg-white rounded-[2rem] border-2 border-transparent hover:border-[#DCCCAC]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden flex flex-col">

                  {/* Gambar / placeholder */}
                  <div className="bg-gradient-to-br from-[#FFF8EC] to-[#DCCCAC]/20 p-10 flex items-center justify-center relative">
                    <FaBoxOpen className="text-5xl text-[#99AD7A] group-hover:scale-110 transition-transform duration-300" />
                    {outOfStock && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-full">Habis</span>
                    )}
                    {lowStock && !outOfStock && (
                      <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[9px] font-black uppercase px-2 py-1 rounded-full">Menipis</span>
                    )}
                    {isAdmin && (
                      <button onClick={() => handleDelete(product.id, product.name)}
                        className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 p-2 bg-white rounded-xl text-[#DCCCAC] hover:text-red-500 transition-all shadow-sm">
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-black text-[#546B41] text-sm leading-tight mb-1 group-hover:text-[#99AD7A] transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-[10px] font-bold text-[#DCCCAC] uppercase tracking-wider mb-3">
                      Stok: {product.stock} unit
                    </p>

                    {/* Harga */}
                    <div className="mt-auto mb-4">
                      {isMember && discount > 0 ? (
                        <>
                          <p className="text-xs text-[#DCCCAC] line-through font-bold">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                          </p>
                          <p className="text-lg font-black text-[#546B41]">
                            Rp {finalPrice.toLocaleString("id-ID")}
                          </p>
                          <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Hemat {discount}%
                          </span>
                        </>
                      ) : (
                        <p className="text-lg font-black text-[#546B41]">
                          Rp {Number(product.price).toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    {isMember ? (
                      <Link to={`/products/${product.id}`}
                        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                          outOfStock
                            ? "bg-[#FFF8EC] text-[#DCCCAC] pointer-events-none"
                            : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] shadow-md shadow-[#546B41]/20"
                        }`}>
                        <FaShoppingCart className="text-xs" />
                        {outOfStock ? "Stok Habis" : "Pesan Sekarang"}
                      </Link>
                    ) : (
                      <Link to={`/products/${product.id}`}
                        className="text-center py-2.5 rounded-xl font-black text-xs uppercase tracking-widest bg-[#FFF8EC] text-[#99AD7A] hover:bg-[#DCCCAC]/20 transition-all">
                        Lihat Detail
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════
            TABLE VIEW
        ══════════════════════════ */}
        {!loading && filtered.length > 0 && viewMode === "table" && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#DCCCAC]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#FFF8EC]/50 border-b border-[#DCCCAC]/20">
                    <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Product</th>
                    <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">
                      {isMember && discount > 0 ? "Harga Normal" : "Price"}
                    </th>
                    {isMember && discount > 0 && (
                      <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Harga Kamu</th>
                    )}
                    <th className="px-8 py-6 font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Stock</th>
                    <th className="px-8 py-6 text-center font-black text-[#99AD7A] text-[10px] uppercase tracking-[0.2em]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFF8EC]">
                  {filtered.map((product, i) => (
                    <tr key={product.id}
                      className="hover:bg-[#FFF8EC]/40 transition-all duration-300 group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#FFF8EC] flex items-center justify-center text-[#99AD7A] shrink-0">
                            <FaBoxOpen className="text-sm" />
                          </div>
                          <span className="font-black text-[#546B41] text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-bold text-sm">
                        {isMember && discount > 0 ? (
                          <span className="line-through text-[#DCCCAC]">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span className="font-black text-[#546B41]">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                          </span>
                        )}
                      </td>
                      {isMember && discount > 0 && (
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#546B41] text-sm">
                              Rp {discountedPrice(product.price).toLocaleString("id-ID")}
                            </span>
                            <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              -{discount}%
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="px-8 py-5">
                        <span className={`font-black text-sm ${
                          product.stock === 0 ? "text-red-500" :
                          product.stock <= 5  ? "text-yellow-500" : "text-[#546B41]"
                        }`}>{product.stock}</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {isMember && (
                            <Link to={`/products/${product.id}`}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                                product.stock === 0
                                  ? "bg-[#FFF8EC] text-[#DCCCAC] pointer-events-none"
                                  : "bg-[#546B41] text-[#FFF8EC] hover:bg-[#435634] active:scale-95"
                              }`}>
                              <FaShoppingCart className="text-[10px]" />
                              {product.stock === 0 ? "Habis" : "Pesan"}
                            </Link>
                          )}
                          {isAdmin && (
                            <>
                              <Link to={`/products/${product.id}`}
                                className="px-3 py-2 rounded-xl font-black text-xs text-[#99AD7A] hover:bg-[#FFF8EC] transition-all">
                                Detail
                              </Link>
                              <button onClick={() => handleDelete(product.id, product.name)}
                                className="p-2 text-[#DCCCAC] hover:text-red-500 hover:scale-110 transition-all">
                                <FaTrash className="text-sm" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
