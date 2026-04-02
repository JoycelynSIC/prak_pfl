export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-pink-50 text-pink-950 font-sans pb-20">
      <Navigation />

      <header className="px-6 py-16 text-center bg-white border-b border-pink-100">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 mb-4">
          Belajar Tailwind CSS 4
        </h1>
        <p className="text-lg text-pink-700 max-w-2xl mx-auto italic">
          "Eksplorasi framework CSS paling populer dengan tampilan yang lebih
          elegan, modern, dan serba pink."
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-pink-500 pl-3">
            Tata Letak & Jarak
          </h2>
          <Spacing />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-pink-500 pl-3">
            Tipografi & Tombol
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
            <Typography />
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95">
                Tombol Utama
              </a>
              <BorderRadius />
            </div>
          </div>
        </section>

        <section className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-pink-500 pl-3">
            Efek Visual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BackgroundColors />
            <ShadowEffects />
          </div>
        </section>
      </main>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md px-8 py-4 border-b border-pink-100">
      <h1 className="text-xl font-black text-pink-600 uppercase tracking-widest">
        LAB.PINK
      </h1>
      <ul className="hidden md:flex space-x-8 font-medium text-pink-700">
        <li>
          <a href="#" className="hover:text-pink-600 transition">
            Beranda
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-600 transition">
            Dokumentasi
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-600 transition">
            Galeri
          </a>
        </li>
      </ul>
      <a href="#" className="bg-pink-950 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-pink-800 transition">
        Mulai Sekarang
      </a>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="bg-white shadow-sm border border-pink-100 p-8 rounded-2xl group hover:border-pink-300 transition-colors">
      <h3 className="text-lg font-bold text-pink-900">Jarak Kartu</h3>
      <p className="mt-3 text-pink-700 leading-relaxed">
        Menggunakan{" "}
        <code className="bg-pink-100 text-pink-800 px-1 rounded">p-8</code>{" "}
        untuk ruang dalam yang lega dan{" "}
        <code className="bg-pink-100 text-pink-800 px-1 rounded">
          rounded-2xl
        </code>{" "}
        agar sudut terlihat lebih manis.
      </p>
      <div className="mt-4 h-2 w-full bg-pink-100 rounded-full overflow-hidden">
        <div className="bg-pink-500 h-full w-2/3"></div>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div>
      <h1 className="text-3xl font-black text-pink-950 leading-tight">
        Seni Mengatur Tulisan
      </h1>
      <p className="text-pink-700 text-lg mt-3">
        Tailwind memberikan kendali penuh atas{" "}
        <span className="font-semibold italic text-pink-800">
          jarak antar huruf
        </span>
        , <span className="underline decoration-pink-300">tinggi baris</span>,
        dan berbagai warna teks.
      </p>
    </div>
  );
}

function BorderRadius() {
  return (
    <a
      href="#"
      className="inline-block border-2 border-pink-600 text-pink-600 font-bold px-6 py-2 rounded-xl hover:bg-pink-50 transition-colors"
    >
      Gaya Garis Luar
    </a>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white p-8 rounded-2xl shadow-xl shadow-pink-200 transform hover:-rotate-1 transition-transform">
      <h3 className="text-2xl font-bold">Gradasi Dinamis</h3>
      <p className="mt-2 opacity-90 italic">
        "Warna pink yang hidup membuat tampilan website jadi jauh lebih
        estetik."
      </p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-white shadow-[0_10px_25px_-5px_rgba(244,114,182,0.2)] p-8 rounded-2xl hover:shadow-2xl hover:shadow-pink-100 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center border border-pink-50">
      <h3 className="text-xl font-bold text-pink-900 italic">Kartu Melayang</h3>
      <p className="text-pink-700 mt-2">
        Arahkan kursor ke sini untuk melihat efek perubahan bayangan dan posisi
        kartu.
      </p>
    </div>
  );
}