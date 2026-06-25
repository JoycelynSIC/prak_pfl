import React, { useState, useEffect } from "react";
import { notesAPI } from "../services/notesAPI";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import { AiFillDelete } from "react-icons/ai";

export default function Notes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [notes, setNotes] = useState([]);
    const [dataForm, setDataForm] = useState({
        title: "", content: "", status: ""
    });

    // Load data saat pertama di-render
    useEffect(() => {
        loadNotes();
    }, []);

    // Memanggil fetchNotes beserta error/loading handling
    const loadNotes = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await notesAPI.fetchNotes();
            setNotes(data);
        } catch (err) {
            setError("Gagal memuat catatan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // Handle form submission for creating notes
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.createNote(dataForm);

            setSuccess("Catatan berhasil ditambahkan!");

            // Kosongkan Form setelah Success
            setDataForm({ title: "", content: "", status: "" });

            // Hilangkan pesan Success setelah 3 detik
            setTimeout(() => setSuccess(""), 3000);
            
            // Panggil Ulang loadNotes untuk refresh data
            loadNotes();
            
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle untuk aksi hapus data
    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
        if (!konfirmasi) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.deleteNote(id);
            setSuccess("Catatan berhasil dihapus!");
            setTimeout(() => setSuccess(""), 3000);

            // Refresh data
            loadNotes();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="notes-container" className="min-h-screen bg-[#FFF8EC] pb-10">
            <div className="px-10">
                <PageHeader title="Notes App" breadcrumb={["Home", "Notes"]} />

                {error && <AlertBox type="error">{error}</AlertBox>}
                {success && <AlertBox type="success">{success}</AlertBox>}

                <div className="max-w-4xl mx-auto mt-6">
                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-[#DCCCAC]/20">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Tambah Catatan Baru
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={dataForm.title}
                                placeholder="Judul catatan"
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                                    duration-200 text-gray-800 disabled:opacity-50"
                            />

                            <textarea
                                name="content"
                                value={dataForm.content}
                                placeholder="Isi catatan"
                                onChange={handleChange}
                                required
                                disabled={loading}
                                rows="3"
                                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                                    duration-200 resize-none text-gray-800 disabled:opacity-50"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                                    rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                                    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-all duration-200 shadow-lg"
                            >
                                {loading ? "Mohon Tunggu..." : "Tambah Data"}
                            </button>
                        </form>
                    </div>

                    {/* Notes Table Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#DCCCAC]/20">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Daftar Catatan ({notes.length})
                            </h3>
                        </div>

                        {loading && <LoadingSpinner text="Memuat catatan..." />}

                        {!loading && notes.length === 0 && !error && (
                            <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
                        )}

                        {!loading && notes.length === 0 && error && (
                            <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
                        )}

                        {!loading && notes.length > 0 ? (
                            <div className="overflow-x-auto">
                                <GenericTable
                                    columns={["#", "Judul", "Isi Catatan", "Aksi"]}
                                    data={notes}
                                    renderRow={(note, index) => (
                                        <>
                                            <td className="px-6 py-4 font-medium text-gray-700 w-12">
                                                {index + 1}.
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-emerald-600">
                                                {note.title}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-md break-words">
                                                {note.content}
                                            </td>
                                            <td className="px-6 py-4 w-20 text-center">
                                                <button
                                                    onClick={() => handleDelete(note.id)}
                                                    disabled={loading}
                                                    className="p-1 hover:bg-red-50 rounded-lg transition-colors inline-block"
                                                >
                                                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
