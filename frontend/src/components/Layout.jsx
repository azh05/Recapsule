import Header from './Header'
import NowPlaying from './NowPlaying'
import { nowPlayingData } from '../data/podcasts'

export default function Layout({ children }) {
  return (
    <div className="ambient-bg font-sans text-text-primary">
      <Header />
      <main className="relative z-[1] max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        {children}
      </main>
      <NowPlaying data={nowPlayingData} />
    </div>
  )
}
