import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        /* Background Utama: Gradasi Pink Lembut */
        <div className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100/50">
            
            {/* Header: Judul dengan Efek Gradasi Teks */}
            <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600">
                    Framework Showcase
                </span>
                <span className="text-3xl ml-2">✨</span>
            </h1>

            {/* Grid Layout: Responsif & Rapih */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        /* EFEK KARTU UTAMA */
                        className="group relative border border-pink-100 p-7 rounded-3xl bg-white/80 backdrop-blur-sm
                                   shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                                   hover:shadow-[0_20px_40px_rgba(244,114,182,0.15)] 
                                   hover:border-pink-200
                                   transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.01]"
                    >
                        {/* EFEK DEKORATIF: Cahaya Pink Halus di Sudut saat Hover */}
                        <div className="absolute -inset-px bg-gradient-to-r from-pink-200 to-fuchsia-200 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10" aria-hidden="true"></div>

                        {/* Nama Framework: Warna Pink Bold */}
                        <h2 className="text-2xl font-bold text-pink-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors duration-300">
                            {item.name}
                        </h2>
                        
                        {/* Deskripsi: Teks Abu-abu agar Fokus, dengan Spasi Baris Bagus */}
                        <p className="text-gray-600 text-base mb-5 leading-relaxed min-h-[60px]">
                            {item.description}
                        </p>
                        
                        {/* Detail Badge & Tahun: Tata Letak flex yang rapi */}
                        <div className="flex items-center gap-3 mb-8 border-t border-pink-50 pt-5">
                            <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow-inner shadow-pink-200/50">
                                {item.details.developer}
                            </span>
                            <span className="text-pink-300 text-sm font-medium">
                                Released in {item.details.releaseYear}
                            </span>
                        </div>

                        {/* EFEK TOMBOL: Gradasi & Animasi Klik */}
                        <a 
                            href={item.details.officialWebsite} 
                            target='_blank' 
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center py-3 px-6 
                                       bg-gradient-to-r from-pink-500 to-fuchsia-500 
                                       text-white font-semibold rounded-xl
                                       shadow-lg shadow-pink-500/30
                                       hover:from-pink-600 hover:to-fuchsia-600
                                       active:scale-[0.97] active:shadow-md
                                       transition-all duration-150 transform"
                        >
                            Visit Official Website
                            {/* Ikon Panah Kecil (Opsional tapi Manis) */}
                            <svg className="w-4 h-4 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}