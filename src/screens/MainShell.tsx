import { useState } from 'react'
import { CompassMark } from '@/components/ui/CompassMark'
import { useAppStore } from '@/store/useAppStore'
import { ProfileSheet } from './ProfileSheet'
import { ExploreTab } from './ExploreTab'
import { CollectionTab } from './CollectionTab'
import { ZooTab } from './ZooTab'
import { FriendsSheet, friendDisplayName } from './FriendsSheet'
import { FriendZooSheet } from './FriendZooSheet'

type MainTab = 'explore' | 'collection' | 'zoo'

export function MainShell() {
  const user = useAppStore((state) => state.user)
  const [activeTab, setActiveTab] = useState<MainTab>('explore')
  const [showProfile, setShowProfile] = useState(false)
  const [showFriends, setShowFriends] = useState(false)
  const [viewingFriendId, setViewingFriendId] = useState<string | null>(null)

  return (
    <section className="app-content" aria-label="Finders Keepers">
      <header className="top-bar">
        <div className="brand-lockup">
          <CompassMark small />
          <span>Finders Keepers</span>
        </div>
        <div className="top-bar-actions">
          <button className="icon-button" aria-label="Friends" onClick={() => setShowFriends(true)}>
            <span className="icon-friends" />
          </button>
          <button className="profile-button" aria-label="Open your profile" onClick={() => setShowProfile(true)}>
            {user?.displayName.charAt(0) ?? 'FK'}
          </button>
        </div>
      </header>

      {activeTab === 'explore' && <ExploreTab />}
      {activeTab === 'collection' && <CollectionTab />}
      {activeTab === 'zoo' && <ZooTab />}

      {showProfile && <ProfileSheet onClose={() => setShowProfile(false)} />}

      {showFriends && (
        <FriendsSheet
          onClose={() => setShowFriends(false)}
          onViewFriend={(friendId) => {
            setShowFriends(false)
            setViewingFriendId(friendId)
          }}
        />
      )}

      {viewingFriendId && (
        <FriendZooSheet
          friendId={viewingFriendId}
          friendName={friendDisplayName(viewingFriendId)}
          onClose={() => setViewingFriendId(null)}
        />
      )}

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button className={activeTab === 'explore' ? 'nav-item is-active' : 'nav-item'} onClick={() => setActiveTab('explore')}>
          <span className="nav-symbol nav-symbol--explore" />
          Explore
        </button>
        <button
          className={activeTab === 'collection' ? 'nav-item is-active' : 'nav-item'}
          onClick={() => setActiveTab('collection')}
        >
          <span className="nav-symbol nav-symbol--my-finds" />
          Collection
        </button>
        <button className={activeTab === 'zoo' ? 'nav-item is-active' : 'nav-item'} onClick={() => setActiveTab('zoo')}>
          <span className="nav-symbol nav-symbol--collection" />
          Zoo
        </button>
      </nav>
    </section>
  )
}
