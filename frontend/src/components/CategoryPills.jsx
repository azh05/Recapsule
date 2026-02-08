import { useState } from 'react'

export default function CategoryPills({ categories }) {
  const [active, setActive] = useState('All')

  return (
    <div className="flex gap-4 flex-wrap mb-12 animate-fade-in-up">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-6 py-[0.7rem] rounded-full text-[0.85rem] font-semibold cursor-pointer transition-all duration-300 border ${
            active === cat
              ? 'bg-accent-primary border-accent-primary text-white -translate-y-0.5'
              : 'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-text-secondary hover:bg-accent-primary hover:border-accent-primary hover:text-white hover:-translate-y-0.5'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
