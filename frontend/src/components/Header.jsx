import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="sticky top-0 bg-[rgba(10,10,15,0.9)] backdrop-blur-xl px-6 md:px-12 py-[1.2rem] flex items-center gap-4 md:gap-8 border-b border-[rgba(255,255,255,0.05)] z-[100]">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 text-2xl font-black text-accent-primary no-underline">
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
          <path d="M16 8v16M12 16c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Podwave</span>
      </a>

      <SearchBar />

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="px-6 py-2.5 bg-transparent border-[1.5px] border-[rgba(255,255,255,0.2)] rounded-full text-text-primary font-semibold text-[0.85rem] cursor-pointer transition-all duration-300 hover:border-text-primary hover:bg-[rgba(255,255,255,0.05)]">
          Install App
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center font-bold cursor-pointer transition-transform duration-300 hover:scale-110">
          A
        </div>
      </div>
    </header>
  )
}
