import Hero from '../components/Hero'
import CategoryPills from '../components/CategoryPills'
import PodcastSection from '../components/PodcastSection'
import { sections, categories } from '../data/podcasts'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryPills categories={categories} />
      {sections.map((section, i) => (
        <PodcastSection
          key={section.title}
          title={section.title}
          podcasts={section.podcasts}
          delay={i * 0.1}
        />
      ))}
    </>
  )
}
