# Finders Keepers — Premise, Features & Demo Guide

## The premise

Finders Keepers turns the places you already go — the gym, work, school, a
coffee shop, the library, a club — into a lightweight collection game. You
drop a pin on a real place you visit, and every time you check in there you
have a chance to catch a small animal companion "flavored" to that kind of
place (gyms attract pandas and bears, libraries attract owls and foxes,
coffee shops and clubs attract bunnies and otters, etc.). Keep visiting the
same place and the companion that lives there grows XP, levels up, and
eventually evolves. Place your companions in a customizable 3D zoo diorama,
compare zoos with friends, and chase a small set of achievements.

It's a Pokémon-GO-style habit loop, but the "gym" is your actual gym: the
game rewards you for showing up to places you've decided matter to you,
rather than for wandering to arbitrary GPS coordinates.

**Tagline (from the splash screen):** *"Go out. Look closer." / "Tiny
adventures are everywhere."*

**Design promise (from the permission screen):** location is never tracked
in the background — the app only checks your distance to a saved place when
you tap it, and there's always a manual "I'm here" fallback if GPS is denied
or unavailable.

## Best features

- **Place-flavored catching** — each location category (gym, work, school,
  coffee, library, club, custom) has its own pool of species, weighted by
  rarity (common/uncommon/rare), plus a rare 3% "wildcard" roll that can pull
  from the *entire* catalog regardless of category. `src/lib/game/rarity.ts`
- **One buddy per place, leveling over time** — the first check-in at a
  location always catches a new companion; every check-in after that feeds
  XP to that location's buddy. At level 3 it's ready to evolve into its
  stage-2 form. `src/lib/game/claimVisit.ts`, `src/lib/game/xp.ts`
- **A real 3D zoo** — placed companions live in an actual WebGL diorama
  (not just a grid of icons), with a wandering-animal animation, a choice of
  three backdrops (Meadow/Beach/Snow), and a "Save a photo" button that
  exports a PNG snapshot of the canvas. `src/components/zoo3d/`, `ZooTab.tsx`
- **Mood as a cosmetic health signal** — companions you haven't visited in a
  while look sleepier (happy → content → sleepy) based on days since last
  interaction. Purely cosmetic by design — nothing is ever lost or
  penalized, so there's no punishing "pet died" moment. `src/lib/game/mood.ts`
- **Achievements that reward the real behavior the app wants** — first
  catch, first evolution, 3-day and 7-day visit streaks, making a friend,
  filling the zoo, and collecting one of every species family.
  `src/data/achievements.ts`
- **Social without needing a backend** — friend codes are just user IDs; a
  seeded demo friend ("Alex", code `ALEX2016`) comes with a pre-populated
  zoo so the social/friend-zoo view is demoable solo, with no second account
  needed. `src/data/demoFriend.ts`
- **Map-based place picking** — Leaflet/OpenStreetMap map where you tap to
  drop a pin, pick a category, and optionally share just the pin + name with
  friends (never the exact address). `src/screens/ExploreTab.tsx`,
  `AddLocationSheet.tsx`
- **Everything runs client-only, with a backup/restore escape hatch** — all
  state lives in `localStorage` via Zustand `persist` stores; `backup.ts`
  exports/imports a single JSON file covering every store, so a demo device
  can be reset or restored in one click. `src/lib/backup.ts`

## How it works for a demo

Everything below works **without GPS, without a backend, and without a
second device** — the check-in flow has no distance check, no cooldown, and
no visit limit by design, specifically so a demo can check in as many times
as it wants.

1. **Launch** — splash screen (~3s) → sign in (local/guest, no real auth
   backend needed) → pick an avatar → permission intro screen. On the
   permission screen, either *Allow location* (for the live map centering)
   or *Not now* — both work for the demo; "Not now" just skips GPS recenter
   and defaults the map to a fixed center.

2. **Add a place (Explore tab)**
   - Tap **"+ Add a place"**, then tap anywhere on the map to drop a pin.
   - Name it (e.g. "My Gym"), pick a category — category drives which
     species can appear there — and optionally toggle "Share this pin with
     friends."
   - Save. The pin appears on the map immediately.

3. **Catch your first companion**
   - Tap the new pin → **Check in**. This always catches on the first visit
     to a place — great for a guaranteed "wow" moment in a demo.
   - Narrate the rarity badge and the (rare, ~3%) wildcard banner if it pops.

4. **Level it up**
   - Tap the same pin and **Check in** again (repeatable instantly, no
     cooldown) — each repeat grants the resident companion +50 XP.
   - Do this 3 times total (1 catch + 2 XP check-ins = level 3) to show the
     "ready to evolve" state, and narrate that evolution happens at level 3.
   - Add one or two more pins in different categories (e.g. a "library" and
     a "coffee shop") and repeat to build a small roster quickly.

5. **Build the zoo**
   - Switch to the **Zoo** tab. Unplaced companions sit in a tray at the
     top — tap one to drop it into the 3D yard (up to 9 at once).
   - Swap the backdrop (Meadow/Beach/Snow) to show theming, then hit
     **"Save a photo"** to export a PNG of the diorama — a good visual beat
     to close on.

6. **Show the social loop**
   - Open **Friends** (top bar icon) and enter the demo code **`ALEX2016`**
     to add a pre-seeded friend with their own pre-placed zoo — no second
     device or account needed. Tap into their zoo to show the friend-zoo
     viewer.

7. **Achievements**
   - Achievement toasts fire automatically as you do the above (first
     catch, first evolution, made a friend, zoo curator at 5 placed, etc.) —
     just point them out as they appear rather than hunting for a dedicated
     screen.

8. **Reset between demo runs (optional)**
   - Profile sheet → export a backup before you start experimenting, or just
     clear the `finders-keepers-*` keys in `localStorage` / use the import
     flow to restore a known-good state for a repeat run.

### Talking points worth calling out live

- No background tracking — distance is only checked when a saved pin is
  tapped, and manual check-in always works regardless of GPS state.
- The catch pool is tied to *why* a place matters (gym → stronger/bigger
  animals, library → quieter ones, coffee/club → social ones) — it's a
  reskin of your actual routine, not a generic map game.
- Nothing in the companion system punishes neglect (mood is cosmetic only),
  which keeps the tone cozy rather than stressful.
