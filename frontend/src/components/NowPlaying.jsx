import { useState } from 'react'

export default function NowPlaying({ data }) {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgba(20,20,25,0.98)] backdrop-blur-xl border-t border-[rgba(255,255,255,0.1)] px-4 py-3 md:px-12 md:py-4 flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 z-[200] animate-slide-up">
      {/* Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-14 h-14 bg-gradient-to-br from-[#2a2a35] to-[#3a3a45] rounded-lg shrink-0" />
        <div className="min-w-0">
          <div className="font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{data.title}</div>
          <div className="text-xs text-text-secondary">{data.author}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 flex-1 justify-center order-first md:order-none w-full md:w-auto mb-2 md:mb-0">
        <button className="bg-transparent border-none text-text-primary cursor-pointer p-2 transition-all duration-200 flex items-center justify-center hover:text-accent-primary hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-text-primary rounded-full text-bg-primary cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-accent-primary hover:text-white hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            {isPlaying ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>

        <button className="bg-transparent border-none text-text-primary cursor-pointer p-2 transition-all duration-200 flex items-center justify-center hover:text-accent-primary hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="flex-1 flex items-center gap-4">
        <span className="text-xs text-text-muted min-w-[40px]">1:22</span>
        <div className="progress-track flex-1 h-1 bg-[rgba(255,255,255,0.1)] rounded-sm relative cursor-pointer">
          <div className="progress-knob h-full bg-accent-primary rounded-sm w-[40%] relative" />
        </div>
        <span className="text-xs text-text-muted min-w-[40px]">3:30</span>
      </div>
    </div>
  )
}
