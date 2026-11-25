# Otter Pond Swim School

Static Next.js website for **Otter Pond Swim School** — a learn-to-swim school with a warm 0.9 m teaching pond and a 25 m lap pool, built on the Jamstacks Next.js static export starter.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview locally, or `npm run check` to run all tests, typecheck and static export.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, 8-level lane-rope ladder, mini-week whiteboard, make-up promise, water-safety signs, instructors on deck, desk hours & location, and `SportsActivityLocation` + `Course` JSON-LD |
| `/levels/` | Interactive swimmer age finder, full 8-lane pool from shallow to deep, and week 9/10 move-up guide |
| `/timetable/` | 10-week term strip, filterable poolside lane-board timetable (level & day chips), pool key and upcoming term dates |
| `/make-ups/` | Enamel pool-rules sign with the 8 make-up rules, 3-step request guide, Sunday make-up swim times, and closure/illness guidance |
| `/water-safety/` | Featured "Float, flip, follow" band, filterable poolside safety signs, and "Reach or throw, don’t go" diagram |
| `/contact/` | Hosted Jamstacks enquiry form (when configured) or direct email fallback, visible email & phone, desk hours and clipboard checklist |
| `/404.html` | Themed "This lane’s empty" page with Pip and lost goggles |

## Common owner edits

### Update open spots on the timetable (`content/timetable.ts`)
Open `content/timetable.ts` and change the `spotsLeft` number on any class (for example, change `mon-1600-pebbles` from `spotsLeft: 0` to `spotsLeft: 2`).
- `0` displays as **Waitlist**
- `1` displays as **1 spot**
- `2+` displays as **N spots**

Run `npm run check` to verify `spotsLeft` stays within the level’s `maxClassSize` and rebuild the static site.

### Update term dates and holiday closures (`content/terms.ts`)
Edit `content/terms.ts` before each new 10-week term. Update `id`, `name`, `start`, `end` (ISO `YYYY-MM-DD`) and `closures` (`{ date, reason }`). Validation tests ensure terms are ordered and every closure falls inside its term window.

### Update make-up policy numbers (`content/makeups.ts`)
Edit `makeupPolicy` in `content/makeups.ts` (`noticeCutoff`, `creditsPerTerm`, `creditsExpire`, `noMakeupWeek`). Changing `creditsPerTerm` or `noticeCutoff` automatically updates both the Home make-up promise and the `/make-ups/` rules sign.

## File ownership

| File | Owns |
| --- | --- |
| `content/business.ts` | School name, email, phone, Green Lake east beach landmark, desk hours and Contact enquiry copy |
| `content/pools.ts` | Teaching pond (`0.9 M`, 90°F) and Lap pool (`1.1–2.0 M`, 84°F) |
| `content/levels.ts` | Eight swim levels, age boundaries (in months), skills, term prices and age-finder helper |
| `content/instructors.ts` | Instructors on deck, roles, qualifications and fun facts |
| `content/timetable.ts` | Weekly Monday–Saturday classes, times, pool/instructor links and `spotsLeft` |
| `content/makeups.ts` | Typed make-up policy values, derived pool rules and Sunday make-up swim sessions |
| `content/terms.ts` | 10-week term start/end dates and planned holiday closures |
| `content/safety.ts` | Water-safety tips, filter categories and featured tip |
| `app/**/page.tsx` | Page-specific headings, prose, labels and calls to action |
| `app/tailwind.input.css` | Light ("Summer session") and dark ("Night swim") palette tokens, cap tokens, tile/caustic textures and motion rules |
| `components/pool-art.tsx`, `components/pool-icons.tsx` | Bespoke inline SVG illustrations and 24 px poolside icons |
| `site.config.json` | Public name, description, hostname, `timeZone` (`America/Los_Angeles`) and Jamstacks integration |
| `lib/structured-data.ts` | `SportsActivityLocation` and `Course` JSON-LD derived from content |

## Fonts and appearance

Self-hosted via npm (no external font CDN requests):
- **Grandstander Variable** (`@fontsource-variable/grandstander`, SIL Open Font License 1.1) — display headings, wordmark, depth markers and oversized numerals.
- **Readex Pro Variable** (`@fontsource-variable/readex-pro`, SIL Open Font License 1.1) — body copy, timetables, labels and tabular numerals.

Light ("Summer session") and dark ("Night swim") themes switch via CSS tokens in `app/tailwind.input.css` and `jamstacks`'s `ThemeProvider`, `ThemeScript` and `DarkModeToggle`.

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`). Do not store business collections or credentials in `site.config.json`.

On `/contact/`, when `JAMSTACKS_SITE` or `site.config.json`'s `jamstacks.siteId` is set, the page renders one `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap. Without a site ID, it shows the direct email fallback with no embed request. Public email (`hello@next-swim-school.jamstacks.net`) and phone remain visible in both states. Navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Checks, preview and deployment

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`.github/workflows/pages.yml` builds and deploys the static export to GitHub Pages while preserving the `provisioning_id` dispatch contract. `jamstacks/` holds optional gallery publishing metadata and screenshots and can be deleted cleanly by customer sites.
