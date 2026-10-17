import { useState } from 'react'

const categories = ['All', 'Gym', 'Study', 'Coffee']

const finds = [
  {
    id: 1,
    title: 'Sleepy panda cub',
    detail: '2 min away',
    category: 'Gym',
    color: '#F292AA',
    className: 'left-[17%] top-[32%]',
  },
  {
    id: 2,
    title: 'Clever fox kit',
    detail: '5 min away',
    category: 'Study',
    color: '#71BCB7',
    className: 'right-[12%] top-[18%]',
  },
  {
    id: 3,
    title: 'Chill otter pup',
    detail: '8 min away',
    category: 'Coffee',
    color: '#7078A4',
    className: 'right-[20%] top-[56%]',
  },
  {
    id: 4,
    title: 'Fluffy bear cub',
    detail: '6 min away',
    category: 'Gym',
    color: '#F292AA',
    className: 'left-[31%] top-[69%]',
  },
]

function CompassMark({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? 'compass-mark compass-mark--small' : 'compass-mark'} aria-hidden="true">
      <span className="compass-mark__heart" />
      <span className="compass-mark__needle" />
    </span>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedFind, setSelectedFind] = useState(finds[0])
  const [activeTab, setActiveTab] = useState('Explore')

  const visibleFinds =
    activeCategory === 'All' ? finds : finds.filter((find) => find.category === activeCategory)

  return (
    <main className="app-shell">
      <section className="app-content" aria-label="Finders Keepers companion map">
        <header className="top-bar">
          <div className="brand-lockup">
            <CompassMark small />
            <span>Finders Keepers</span>
          </div>
          <button className="profile-button" aria-label="Open your profile">
            FK
          </button>
        </header>

        <div className="welcome-copy">
          <p className="eyebrow">Ready to wander?</p>
          <h1>Little companions are waiting nearby.</h1>
        </div>

        <div className="category-row" aria-label="Companion categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'category-pill is-active' : 'category-pill'}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="map-card">
          <div className="map-path map-path--one" />
          <div className="map-path map-path--two" />
          <div className="map-path map-path--three" />
          <div className="map-pond" />
          <div className="map-green map-green--one" />
          <div className="map-green map-green--two" />
          <div className="map-green map-green--three" />

          {visibleFinds.map((find) => (
            <button
              aria-label={`${find.title}, ${find.detail}`}
              className={`map-pin ${find.className} ${selectedFind.id === find.id ? 'is-selected' : ''}`}
              key={find.id}
              onClick={() => setSelectedFind(find)}
              style={{ '--pin-color': find.color } as React.CSSProperties}
            >
              <span />
            </button>
          ))}

          <div className="you-marker" aria-label="Your current location">
            <span />
          </div>

          <div className="find-card">
            <span
              className="find-card__badge"
              style={{ backgroundColor: selectedFind.color }}
              aria-hidden="true"
            >
              <CompassMark small />
            </span>
            <span className="find-card__copy">
              <strong>{selectedFind.title}</strong>
              <small>{selectedFind.detail}</small>
            </span>
            <button aria-label={`Go to ${selectedFind.title}`}>Go</button>
          </div>
        </div>

        <nav className="bottom-nav" aria-label="Primary navigation">
          {['Explore', 'My Finds', 'Collection'].map((tab) => (
            <button
              className={activeTab === tab ? 'nav-item is-active' : 'nav-item'}
              key={tab}
              onClick={() => setActiveTab(tab)}
            >
              <span className={`nav-symbol nav-symbol--${tab.toLowerCase().replace(' ', '-')}`} />
              {tab}
            </button>
          ))}
        </nav>
      </section>

      <section className="splash-screen" aria-label="Finders Keepers is opening">
        <div className="splash-blob splash-blob--pink" />
        <div className="splash-blob splash-blob--green" />
        <div className="splash-blob splash-blob--blue" />
        <div className="spark spark--one" />
        <div className="spark spark--two" />
        <div className="spark spark--three" />
        <div className="splash-logo">
          <CompassMark />
          <p className="splash-kicker">Go out. Look closer.</p>
          <h2>Finders<br />Keepers</h2>
          <p className="splash-subtitle">Tiny adventures are everywhere.</p>
        </div>
        <div className="splash-handle" />
      </section>
    </main>
  )
}
