export default function Hero() {
  return (
    <section className="hero-orb my-8 md:my-12 bg-gradient-to-br from-[rgba(255,107,53,0.15)] to-[rgba(255,200,87,0.1)] rounded-3xl px-8 py-10 md:px-12 md:py-16 animate-fade-in-up">
      <div className="relative z-10">
        <h1 className="gradient-text text-[2.5rem] md:text-[4rem] font-black tracking-tight mb-4">
          Podcasts
        </h1>
        <p className="text-lg md:text-xl text-text-secondary font-light max-w-[600px]">
          Discover over 500,000 titles available in our podcasts subscriber catalog.
        </p>
      </div>
    </section>
  )
}
