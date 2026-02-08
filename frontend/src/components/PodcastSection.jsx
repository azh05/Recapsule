import PodcastGrid from './PodcastGrid'

export default function PodcastSection({ title, podcasts, delay = 0 }) {
  return (
    <section
      className="my-16 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[2rem] font-bold tracking-tight">{title}</h2>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-text-secondary text-sm font-semibold hover:text-text-primary transition-colors duration-300"
        >
          Show all
        </a>
      </div>
      <PodcastGrid podcasts={podcasts} />
    </section>
  )
}
