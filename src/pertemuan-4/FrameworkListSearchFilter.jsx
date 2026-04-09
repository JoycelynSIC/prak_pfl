import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkLisSearchFilter() {
  //   /** Deklarasi state **/
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedTag, setSelectedTag] = useState("");

  /*Inisialisasi DataForm*/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    /*Tambah state lain beserta default value*/
  });

  /*Inisialisasi Handle perubahan nilai input form*/
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /** Deklarasi Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100/50">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600">
          Framework Showcase
        </span>
        <span className="text-3xl ml-2">✨</span>
      </h1>

      {/* --- BAGIAN SEARCH & FILTER --- */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-grow group">
          <input
            type="text"
            name="searchTerm" 
            value={dataForm.searchTerm} 
            onChange={handleChange}
            placeholder="Search name, description, or developer..."
            className="w-full p-4 pl-12 border-2 border-pink-100 rounded-2xl bg-white/70 backdrop-blur-md 
                 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 
                 transition-all duration-300 shadow-sm text-gray-700 placeholder-pink-300 font-medium"
          />
          {/* Ikon Kaca Pembesar Tetap Sama */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="relative min-w-[180px]">
          <select
            name="selectedTag" 
            value={dataForm.selectedTag} 
            onChange={handleChange}
            className="w-full p-4 pr-10 border-2 border-pink-100 rounded-2xl bg-white/70 backdrop-blur-md 
                 appearance-none focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 
                 transition-all duration-300 shadow-sm text-gray-600 font-bold cursor-pointer"
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {/* Ikon Panah Tetap Sama */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group relative border border-pink-100 p-7 rounded-3xl bg-white/80 backdrop-blur-sm
                       shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                       hover:shadow-[0_20px_40px_rgba(244,114,182,0.15)] 
                       hover:border-pink-200
                       transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.01]"
          >
            <div
              className="absolute -inset-px bg-gradient-to-r from-pink-200 to-fuchsia-200 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10"
              aria-hidden="true"
            ></div>

            <h2 className="text-2xl font-bold text-pink-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors duration-300">
              {item.name}
            </h2>

            <p className="text-gray-600 text-base mb-5 leading-relaxed min-h-[60px]">
              {item.description}
            </p>

            <div className="flex items-center gap-3 mb-8 border-t border-pink-50 pt-5">
              <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow-inner shadow-pink-200/50">
                {item.details.developer}
              </span>
              <span className="text-pink-700 text-sm font-bold">
                Released in {item.details.releaseYear}
              </span>
            </div>

            <a
              href={item.details.officialWebsite}
              target="_blank"
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
              <svg
                className="w-4 h-4 ml-2 -mr-1 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>

      {filteredFrameworks.length === 0 && (
        <div className="text-center py-20 text-pink-300 font-bold text-xl">
          No artifacts found in this memory... 🦴
        </div>
      )}
    </div>
  );
}
