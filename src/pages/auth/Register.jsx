export default function Register() {
    return (
        <div>
            <h2 className="text-3xl font-black text-[#546B41] mb-2 text-center tracking-tight">
                Create Account ✨
            </h2>
            <p className="text-[#99AD7A] text-center text-[10px] font-black mb-8 uppercase tracking-[0.2em]">
                Join our admin system
            </p>

            <form>
                <div className="mb-5">
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

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="********"
                    />
                </div>

                <div className="mb-8">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-[10px] font-black text-[#DCCCAC] uppercase tracking-[0.25em] mb-2 ml-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-5 py-3 bg-[#FFF8EC]/50 border-2 border-[#DCCCAC]/20 rounded-2xl focus:border-[#546B41] focus:outline-none transition-all duration-300 text-[#546B41] font-bold placeholder-[#DCCCAC]/60"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#546B41] hover:bg-[#435634] text-[#FFF8EC] font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#546B41]/20 active:scale-95"
                >
                    Register Now
                </button>
            </form>
        </div>
    )
}