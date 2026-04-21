# KidZone Adventure

KidZone Adventure is a mobile-first educational web game for kids aged 3-10.
It is built with plain HTML, CSS, and JavaScript (no framework, no build step).

## Features

- 16 mini-games grouped by age ranges.
- Simple scoring system with stars.
- Local high-score persistence using `localStorage`.
- Kid-safe design (no ads, no external links, no data collection).

## Project Structure

```text
index.html         # Main app shell, styles, and core game engine logic
games/*.js         # One file per mini-game
DOCUMENTATION.md   # Full architecture and game reference
```

## Run Locally

Use a local server (do not open via `file://`):

```bash
python3 -m http.server 8765
```

Then open:

`http://localhost:8765`

## Add a New Game

1. Create `games/<id>.js` with one global function:
   `setup_<id>(area)`.
2. Add the game id to the correct age group in `AGE_GROUPS` in `index.html`.
3. Register the game in `dispatchGame()` in `index.html`.
4. Add `<script src="games/<id>.js"></script>` to `index.html`.

## Game Module Contract

Each game module receives `area` (the `.game-area` element) and should:

- Check `canAns` before accepting input.
- Call `onCorrect()` when the answer is correct.
- Call `onWrong()` when incorrect, then re-enable `canAns = true` after about 520ms.

## Tech Constraints

- Vanilla JavaScript only.
- No bundler, no transpiler, no module system.
- Mobile-first interaction model.
