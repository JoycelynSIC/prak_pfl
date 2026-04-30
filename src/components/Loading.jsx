export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#FFF8EC]">
            <div className="w-12 h-12 border-4 border-[#99AD7A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#546B41] text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                Loading...
            </p>
        </div>
    );
}