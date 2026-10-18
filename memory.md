# FindersKeepers — Project Memory

Quick-reference for picking this project back up after context compaction. Full plan lives at
`C:\Users\Roni\.claude\plans\job-plan-v1-jolly-pond.md` (11-section V1 plan: scope, screens, data
model, gameplay rules, roadmap, risks, asset inventory, demo checklist) — **re-read that file
first** for anything about rules/mechanics/roadmap this file doesn't cover.

## What this is
Pokémon GO-inspired PWA: users pin real places (gym/work/school/coffee/library/club), earn virtual
companions by visiting them, level/evolve them, display them in a shareable zoo. 2016-nostalgic
visual style. Hackathon V1 — small team, ship the core loop, not every feature.

## Repo state
- Local path: `C:\Users\Roni\Desktop\FindersKeepers`
- Git remote: `https://github.com/rmedagam06/FindersKeepers.git`, branch `main`, pushed up to date
- Deployed on Vercel (user connected the GitHub repo there themselves; I don't have Vercel project-creation permission on their team — 403 when tried)
- Stack: Vite 8 + React 19 + TypeScript + Tailwind v4 (originally a Figma Make splash-screen export, since built out)

## Environment quirks (don't re-discover these)
- **git** is installed but not on PATH in fresh PowerShell sessions — it's at
  `$env:LOCALAPPDATA\Programs\Git\{bin,cmd}`. Every PowerShell tool call is a new process (shell
  state doesn't persist), so prepend this to PATH in every command block that needs git:
  `$env:PATH = "$env:LOCALAPPDATA\Programs\Git\bin;$env:LOCALAPPDATA\Programs\Git\cmd;$env:PATH"`
- **npm install** (plain) crashes with `Cannot read properties of null (reading 'edgesOut')` — a
  local npm/Arborist bug, unrelated to our deps. Always use `npm install --legacy-peer-deps`.
  This is also pinned in `vercel.json`'s `installCommand` so Vercel builds don't hit it either.
- No `gh` CLI, no GitHub MCP connector in this session — can't create repos/PRs via API. Git
  Credential Manager (`credential.helper = manager`) is configured, so `git push` over HTTPS just
  works once a remote exists.
- Claude-in-Chrome browser testing was declined by the user — no live browser verification done;
  relying on `tsc --noEmit` + `npm run build` + manual code review instead. Flag this honestly if
  asked "did you test it."
- `firebase` SDK is installed but **not configured** — no project created yet. Auth/Firestore
  silently no-op until `VITE_FIREBASE_*` env vars are set (see `src/lib/firebase.ts`). User is
  creating the Firebase project themselves and will hand over config later.

## Where things live
```
src/
  types/models.ts          — all data model interfaces (User, SavedLocation, Species,
                              AnimalInstance, Achievement, Friendship, Visit, ...)
  lib/
    game/location.ts       — Haversine distance, arrival radius check, cooldown logic (pure, no UI)
    game/xp.ts             — XP curve, level calc, evolution threshold isReadyToEvolve() (pure)
    game/rarity.ts         — weighted species roll by location category (pure)
    game/claimVisit.ts     — pure reward-claim rules: cooldown + distance + manual-rate-limit gates,
                              first-visit catch vs. repeat-visit XP, no store/UI access
    game/achievements.ts   — pure evaluateAchievements(context, alreadyUnlocked) — same no-store pattern
    game/useAchievementCheck.ts — the one hook that bridges that pure fn to the stores; reads via
                              `.getState()` (not the hook's own reactive values) specifically so it
                              sees a just-dispatched store update in the same event handler, not a
                              stale pre-update snapshot. Call check() right after catch/evolve/
                              friend-add/zoo-place, in the same handler — not in a useEffect.
    assets.ts              — asset-swap manifest pattern (import.meta.glob) for animals,
                              achievements, avatars — components never hardcode a filename
    firebase.ts            — Firebase init, gated on VITE_FIREBASE_* env vars; isFirebaseConfigured flag
    auth.ts                — signInWithGoogle (needs Firebase), createGuestUser (always works, local-only)
    notifications.ts       — browser Notification API ONLY, not FCM. Can show a notification while
                              the browser is running; can't wake a closed app or be server-triggered.
    feedback.ts             — Web Audio chimes (playCatchSound/playEvolveSound/playAchievementSound)
                              + navigator.vibrate() haptics; best-effort, silently no-ops if unsupported
    backup.ts                — exportBackup()/importBackup() — JSON dump/restore of every
                              zustand-persist localStorage key; BACKUP_KEYS must stay in sync with
                              each store's `persist({ name: ... })` value
    game/mood.ts             — computeMood(animal, visits) — purely cosmetic happy/content/sleepy,
                              based on days since last catch/XP event tied to that animal instance
  data/
    species.ts             — V1 species catalog (6 species × 2 stages: panda, bear, fox, owl, bunny,
                              otter) + SPECIES_FAMILIES (stage-1 rows only) + getSpeciesById()
    locationCategories.ts  — category → label/color map (gym, work, school, coffee, library, club, custom)
  store/
    useAppStore.ts          — zustand+persist: current user, avatar, permission state, onboarding flags
    useLocationsStore.ts    — zustand+persist: saved location pins + claimLocation(id) (sets lastClaimedAt)
    useCollectionStore.ts   — zustand+persist: owned AnimalInstance[]; catchAnimal(), grantXp() (recomputes
                              level), evolveAnimal(id, evolvedSpeciesId), setNickname(), placeInZoo(id, {x,y}|null)
    useVisitsStore.ts       — zustand+persist: Visit[] audit log; logVisit(), countManualVisitsThisWeek()
    useFriendsStore.ts      — zustand+persist: Friendship[]; addFriendByCode(userId, code) accepts any
                              non-empty code as a friendId (no backend to validate against yet — the
                              special DEMO_FRIEND_CODE also seeds a demo friend's zoo); friendsOf(userId)
    useAchievementsStore.ts — zustand+persist: UserAchievement[]; checkAndUnlock(userId, context) is
                              idempotent (never re-unlocks, never revokes); unlockedIdsFor(userId)
  components/ui/            — design system: Button, Card, Badge, Modal, XPBar, AnimalArt (has
                              graceful fallback to initial-letter badge when art is missing), CompassMark
  screens/
    MainShell.tsx           — owns active-tab state (explore/collection/zoo) + shared top-bar/profile/
                              bottom-nav chrome; renders one of the three tabs below
    ExploreTab.tsx          — the map: Leaflet + OSM, tap "+ Add a place" then tap the map to drop a
                              categorized pin, tap an existing pin to open the check-in flow
    CollectionTab.tsx       — "Creature-dex" grid: owned instances (tap → AnimalDetailSheet) +
                              one locked "?" card per undiscovered species family
    ZooTab.tsx              — unplaced-companions tray (tap-to-place at a random yard point, no
                              drag library) + the lazy-loaded 3D scene + a backdrop-theme picker +
                              "Save a photo" snapshot button
    AnimalDetailSheet.tsx   — art, nickname input (saves on blur), XP bar, level, Evolve CTA at level 3
    FriendsSheet.tsx        — "Your code" (your raw user id) + add-by-code input + friends list;
                              exports friendDisplayName() too (demo friend gets a real name, everyone
                              else shows as "Explorer #last6ofid" since there's no user directory yet)
    FriendZooSheet.tsx      — read-only version of the zoo grid for a friend's userId (no onClick handlers)
    AddLocationSheet.tsx / ProfileSheet.tsx / LocationVisitSheet.tsx — modals used by ExploreTab
    SplashScreen / SignInScreen / AvatarPickScreen / PermissionIntroScreen — pre-MainShell onboarding flow
  data/demoFriend.ts         — seeded demo friend (id/name/code + 3 pre-placed zoo animals) so Friends
                              is demoable with zero backend; code is "ALEX2016"
  data/achievements.ts        — 7 achievements catalog + getAchievementById()
  data/zooThemes.ts           — 3 ground/sky color presets (Meadow/Beach/Snow) for the 3D scene,
                              built only from colors already in the palette
  components/ui/AchievementBadge.tsx / AchievementUnlockNotice.tsx — locked/unlocked badge rendering
                              and the inline "Achievement unlocked!" block (also plays the
                              achievement sound/vibration — centralized here, not per call site)
  components/ui/MoodDot.tsx   — the cosmetic mood indicator (colored dot ± label)
  components/zoo3d/           — the 3D zoo, lazy-loaded (see Phase 6 below for why):
    ZooScene3D.tsx           — Canvas, lighting, ground (themeable), OrbitControls, tap-to-inspect
                              popup; accepts onCanvasReady(canvas) for snapshot support
    WanderingAnimal.tsx       — per-animal random-wander movement + bob, via useFrame
    species/{Panda,Bear,Fox,Owl,Bunny,Otter}3D.tsx — low-poly primitive-built creatures (spheres/
                              cones/cylinders only, no 3D models/assets), same palette as the flat SVGs
    species/Legs.tsx          — shared 4-leg helper reused by several species
  lib/webgl.ts                — isWebGLAvailable() feature-detection, deliberately dependency-free
                              from three.js so checking support never triggers loading the 3D chunk
  assets/
    animals/{panda,bear,fox,owl,bunny,otter}/stage-{1,2}.svg — all 6 species now have real art
    avatars/avatar-{1..6}.svg       — 6 original 2016-nostalgic chibi avatars
    achievements/*.svg              — 7 badge icons
  App.tsx                   — top-level flow controller: splash → sign-in → avatar pick →
                              permission intro → MainShell (based on useAppStore state)
  index.css                — single global stylesheet; palette tokens + all component CSS classes
                              (prefixed `ds-` for design-system components, screen-specific classes
                              otherwise). No CSS modules/Tailwind component classes — plain CSS by design.
vercel.json                 — pins installCommand/buildCommand/outputDirectory/framework for Vercel
```

## Design system / visual identity (do not redesign — reuse)
- Palette: `#FFFED6` cream bg · `#3F466F` navy text · `#7078A4` navy-blue accent · `#F292AA` pink ·
  `#71BCB7` teal · `#CEE2B1`/`#98C48D` sage greens · `#F8F4C9` card bg
- Fonts: Fredoka (headings) / DM Sans (body), loaded via Google Fonts `@import` in `index.css`
- Shape language: fully-rounded pills, teardrop map pins, blobby organic shapes, soft shadows
- All of this originated from the supplied Figma Make splash-screen export — preserved, not reinvented

## Phase status
- **Phase 0 (done)**: scaffold extracted, PWA configured (`vite-plugin-pwa@2.0.0`, manifest/SW),
  rebranded copy from "treasures" to companions, game-logic + asset-manifest foundation, first
  species art (panda), design-system components
- **Phase 1 (done)**: auth screen (guest works now, Google gated on Firebase), avatar picker,
  location-permission intro, real Leaflet+OSM map with tap-to-drop categorized pins (local storage
  only — no Firestore yet)
- **Phase 2 (done)**: core reward loop end-to-end — tap a pin → "Check in" → GPS check (falls back
  to manual "I'm here" if denied/unavailable, rate-limited to 2/week) → first visit at a location
  = guaranteed catch (rarity-weighted roll from that category's species pool), repeat visit after
  the 4h cooldown = +50 XP to that location's "buddy" animal. All local-only for now (same
  localStorage pattern as Phase 1); swapping in a Cloud Function later means moving `claimVisit`'s
  call site server-side and re-validating there — the pure function itself doesn't change.
- **Phase 3 (done)**: real bottom-nav tab switching via `MainShell` (no more "coming soon" stubs) —
  Collection ("Creature-dex": owned instances + locked "?" cards per undiscovered species family),
  Animal Detail (nickname, XP bar, Evolve CTA at level 3 using the fixed evolution threshold), and
  a Zoo tab (tap-to-place/tap-to-remove 3×3 yard grid, reusing the `.map-pond`/`.map-green` CSS
  shapes that had been dead code since Phase 1). All 6 species now have real original art.
- **Phase 4 (done)**: friends — add-by-code (any non-empty code is accepted as a friendId, since
  there's no backend to validate against; a seeded demo friend "Alex" via code ALEX2016 makes this
  demoable without a second account), read-only friend zoo viewing, and an opt-in "share this pin
  with friends" checkbox on new locations (`SavedLocation.visibility`). Reachable via a new
  top-bar icon next to the profile button (not a 4th bottom-nav tab, matching the original plan's
  screen spec). Two real guest sessions *in the same browser* can genuinely friend each other too,
  since all local data shares one localStorage origin — open two tabs, copy one's "Your code" into
  the other's add-friend field.
- **Phase 5 (done)**: 5 achievements (First Catch, First Evolution, 3-Day Explorer, Made a Friend,
  Zoo Curator) with original badge art, checked right after the relevant action in
  LocationVisitSheet/AnimalDetailSheet/FriendsSheet/ZooTab, surfaced via an inline "Achievement
  unlocked!" notice plus a full locked/unlocked grid in the Profile sheet. Also notification
  opt-in — ProfileSheet has an "Enable reminders" button that requests real browser Notification
  permission and fires one demo notification to prove it works; this is **not** FCM, see
  `src/lib/notifications.ts` above, and the UI says so explicitly rather than overclaiming.
- **Phase 6 (done) — 3D Zoo + 10 features** (this was NOT in the original V1 plan; it's a
  user-requested expansion, planned separately — see the plan file, which now covers only this
  increment, not the already-shipped V1 phases above):
  - **3D Zoo**: the 2D 3×3 grid is gone — `ZooTab`/`FriendZooSheet` now render a real Three.js/
    React-Three-Fiber scene. Placed companions wander the yard on their own (random-target walk +
    bob, no pathfinding/collision). Each species is a low-poly creature built from primitive
    geometries (spheres/cones/cylinders) in its existing palette colors — no 3D model files, none
    were authorable here. `AnimalInstance.zooPosition` is UNCHANGED (`{x,y}|null`) — it's just a
    one-time spawn point now (continuous world coords, not a grid index); live wander position
    while the scene is mounted is ephemeral component state, never written back to the store.
  - Three.js/`@react-three/fiber`/`@react-three/drei` are **lazy-loaded** (`React.lazy` +
    `Suspense`) specifically so they only download when the Zoo tab opens — confirmed via build
    output: main bundle ~720KB (barely moved), the 3D code is its own ~880KB chunk.
  - Also added: sound+haptic feedback on catch/evolve/achievement, a visit-streak tracker + two
    more achievements (7-Day Streak, Caught 'em All — now 7 total), full data export/import backup,
    Collection sort/filter, a "recenter on me" map button, a 3% wildcard catch (rolls the whole
    catalog, not just the location category's pool), a cosmetic companion mood indicator, zoo
    snapshot-to-PNG sharing, and 3 zoo backdrop themes.
- **Phase 7+**: co-visit XP bonus (explicitly deferred — see below), real FCM push once Firebase is
  configured, actually rendering a friend's *shared pins* on your map (the data model/toggle exist,
  the map-overlay UI for it doesn't yet) — see plan file for full roadmap

## Known gaps / follow-ups flagged to user
- No Firebase project yet — Google sign-in and any backend persistence wait on that
- Main bundle ~720KB, plus a separate ~880KB lazy-loaded chunk for the 3D zoo (only fetched when
  that tab opens) — acceptable for V1; the lazy-load boundary is the thing to preserve if this grows
- No browser-based UI testing performed (user declined Chrome extension) — verify manually after
  any screen-level changes; have caught real bugs via code review alone (see below) so it's not a
  substitute for an actual click-through when you get the chance
- Zoo yard is a fixed 3×3 (9 slots) — fine for V1, would need a bigger/scrolling grid if someone
  collects more than 9 companions and wants them all displayed at once
- Co-visit XP bonus (plan §9, marked "Nice to Have") deliberately skipped: each user's SavedLocation
  is its own row with its own id, so "friend visited the same place" would need geo-matching between
  two independent location records, not just an id match — real complexity for a Nice-to-Have.
  Revisit once Firestore exists and a "shared location" concept (one canonical row both check into)
  can be designed properly.
- Friend lookup has no real validation (any code is accepted) and there's no user directory, so a
  non-demo friend just displays as "Explorer #last6ofid" — fine for a local demo, not meant to survive
  contact with a real backend without rework.

## Bugs already found & fixed (don't reintroduce these patterns)
- **Desktop grid placement**: `.app-content` switches to a 2-column CSS grid at ≥800px wide. Any
  new "main content panel" component needs its wrapper class added to the `.map-card, .leaflet-shell,
  .tab-panel { grid-column: 2; grid-row: 2/5; ... }` rule in the `@media (min-width: 800px)` block in
  `index.css`, or it silently gets squeezed into the narrow left column with no explicit placement.
- **Leaflet z-index leaking**: Leaflet's internal panes (tiles/markers/popups) use z-index 200–700,
  assuming they're contained in the map container's own stacking context. That containment only
  happens if the container has an *explicit* `z-index` (Leaflet only sets `position: relative` via
  JS) — `.leaflet-container--themed` now has `z-index: 0` for exactly this reason. Don't remove it;
  without it, anything overlaid on the map (FABs, badges) can get rendered underneath map internals.
- **react-leaflet's `center`/`zoom` props only apply on first mount** — recentering after async
  geolocation resolves needs the imperative `useMap().setView()` pattern already in `ExploreTab.tsx`
  (`RecenterMap` component). Don't try to just update the `center` prop and expect it to move the map.
- **`@react-three/fiber` doesn't export `GroupProps`** (that's an older-version type name) — use
  `ThreeElements['group']` from the same package for a species component's prop type.
- **Canvas snapshot needs `preserveDrawingBuffer: true`** on the `<Canvas gl={{...}}>` prop, or
  `canvasEl.toDataURL()` can capture a blank/black frame because WebGL may clear the buffer right
  after each render. Already set in `ZooScene3D.tsx` — don't remove it if touching that file.
- **Persisted-spawn vs. ephemeral-live-position is a deliberate split**, not an oversight: writing
  a wandering animal's position to the store every animation frame would thrash localStorage. Only
  the one-time spawn point is persisted; live position during the session is component-local state.
