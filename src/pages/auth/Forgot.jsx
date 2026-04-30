export default function Forgot() {
    return (
        <div>
            <h2 className="text-3xl font-black text-[#546B41] mb-2 text-center tracking-tight">
                Forgot Your Password?
            </h2>
            
            <p className="text-[#99AD7A] text-[10px] font-black mb-8 text-center uppercase tracking-[0.2em]">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            <form>
                <div className="mb-8">
                    <label
                        htmlFor="email"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#546B41] hover:bg-[#435634] text-[#FFF8EC] font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#546B41]/20 active:scale-95"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    )
}