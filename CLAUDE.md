# CLAUDE.md — KidZone Adventure

## Project Overview
Mobile-first educational game for kids aged 3–10. Single HTML file + `games/` folder. No build tools, no framework, no backend.

## File Structure
```
index.html        # All CSS, engine JS, HTML skeleton — the entire app
games/*.js        # One file per mini-game (16 total)
DOCUMENTATION.md  # Full architecture & game reference
```

## Architecture Rules

### Adding a new game
1. Create `games/<id>.js` with a single global function `setup_<id>(area)`
2. Add entry to `AGE_GROUPS[n].games` array in `index.html`
3. Add `case '<id>': setup_<id>(area); break;` in `dispatchGame()` in `index.html`
4. Add `<script src="games/<id>.js"></script>` in `index.html`

### Game module contract
Each game file receives `area` (the `.game-area` DOM element) and must:
- Check `canAns` before accepting input
- Call `onCorrect()` on right answer
- Call `onWrong()` on wrong answer, re-enable `canAns = true` after ~520ms

### Engine globals available to all game files
`canAns`, `onCorrect`, `onWrong`, `pick(arr)`, `pickN(arr, n)`, `shuffle(arr)`, `addQ(area, text)`, `makeDisplay(...els)`

## Age Groups
- **3–4** 🌱 — colors, shapes, animals, bigsmall
- **5–6** ⭐ — count, letters, easymath, oddone
- **7–8** 🚀 — math20, spellit, flags, pattern
- **9–10** 🏆 — multiply, divide, capitals, sequence

## CSS Conventions
- Design tokens: `--coral`, `--teal`, `--yellow`, `--purple`, `--gold`, `--cream`, `--dark`
- Option grids: `.opts-2` (2-col), `.opts-4` (4-col)
- Answer feedback: `.is-correct` + `.hi-correct` / `.is-wrong` + `.hi-wrong`
- Game display elements: `.g-color`, `.g-emoji`, `.g-letter`, `.g-word`, `.g-math`, `.g-flag`
- Fonts: **Fredoka One** (game UI), **Nunito** (labels/subtitles)

## Session & Scoring
- 8 questions per session (`TOTAL_Q = 8`)
- Stars: 7–8 correct = ⭐⭐⭐, 5–6 = ⭐⭐, 1–4 = ⭐
- High score per game persisted in `localStorage` (never decreased)
- Cumulative `totalStars` also persisted

## Testing
Run a local server to test (file:// URLs are blocked by Playwright):
```bash
python3 -m http.server 8765
# then open http://localhost:8765
```

## Key Constraints
- **No build step** — plain vanilla JS, no imports, no modules
- **Mobile-first** — touch events, no hover-only interactions
- **Kid-safe** — no external links, no ads, no data collection
- Keep each game file self-contained and under ~100 lines
