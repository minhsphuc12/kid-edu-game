# KidZone Adventure — Project Documentation

## Overview

**KidZone Adventure** is a mobile-first, single-file educational game app for children aged 3–10. It runs entirely in the browser with no build tools, no framework, and no backend — just `index.html` plus a `games/` folder.

The app keeps kids engaged while parents eat a meal. A built-in **Parent Timer** (15 / 20 / 30 min) counts down on the home screen so children know when playtime ends.

---

## Project Structure

```
kid-edu-game/
├── index.html          # Main app: all CSS, engine logic, HTML skeleton
└── games/              # One JS file per mini-game
    ├── colors.js       # Color Match
    ├── shapes.js       # Shape Match (SVG)
    ├── animals.js      # Animal Quiz
    ├── bigsmall.js     # Big & Small comparison
    ├── count.js        # Count the Animals
    ├── letters.js      # ABC Match (upper/lowercase)
    ├── easymath.js     # Easy Addition (sums ≤ 10)
    ├── oddone.js       # Odd One Out (category logic)
    ├── math20.js       # Math Race (add/subtract within 20)
    ├── spellit.js      # Spell It! (fill-in-the-blank vowel)
    ├── flags.js        # Flag Quiz (15 countries)
    ├── pattern.js      # Number Patterns (next-in-sequence)
    ├── multiply.js     # Times Table (×2–×10)
    ├── divide.js       # Division (exact integer results)
    ├── capitals.js     # World Capitals Quiz
    └── sequence.js     # Advanced Sequences (×2, arithmetic, squares, Fibonacci)
```

---

## Architecture

### Single-Page App with 3 Screens

The app is a true SPA with three full-screen panels managed by CSS `.hidden` toggling:

| Screen         | ID              | Purpose                                    |
|----------------|-----------------|--------------------------------------------|
| Home           | `#home`         | Age selector, game grid, parent timer      |
| Game           | `#game`         | Active gameplay (question → answer loop)   |
| Celebration    | `#celebration`  | End-of-session star summary & replay       |

Transitions use `opacity` + `scale` CSS for a smooth, child-friendly feel.

### Game Engine (in `index.html`)

The engine provides:

- **`dispatchGame(gameId, area)`** — switch-routes to the correct `setup_*` function
- **`nextQ()`** — clears the game area, increments question index, calls `dispatchGame`
- **`onCorrect()`** — increments score, shows feedback emoji, spawns confetti, advances after 830 ms
- **`onWrong()`** — shows thinking emoji; individual games handle re-enable timing (~520 ms)
- **`endGame()`** — computes star rating (1–3 ⭐), saves to `localStorage`, shows celebration screen

### Game Module Contract

Each file in `games/` must export a single global function:

```js
function setup_<gameId>(area) {
  // area: HTMLElement — the .game-area container
  // Build question UI and append it to area.
  // Call onCorrect() or onWrong() on user interaction.
}
```

Engine globals available to all modules:

| Symbol        | Type       | Description                                      |
|---------------|------------|--------------------------------------------------|
| `canAns`      | `boolean`  | Gate flag — read before accepting answer         |
| `onCorrect()` | function   | Call when the player answers correctly           |
| `onWrong()`   | function   | Call when the player answers incorrectly         |
| `pick(arr)`   | function   | Random single pick from array                    |
| `pickN(arr,n)`| function   | Random n picks from array (no replacement)       |
| `shuffle(arr)`| function   | Fisher-Yates shuffle, returns new array          |
| `addQ(area, text)` | function | Appends a `.q-text` question label to area  |
| `makeDisplay(...els)` | function | Creates a `.g-display` wrapper div        |

---

## Age Groups & Games

Games are organized into four age bands, each with four mini-games:

### 🌱 Age 3–4 (Early learners)
| Game        | File          | Mechanic                                           |
|-------------|---------------|----------------------------------------------------|
| Color Match | `colors.js`   | Tap the colored circle that matches the prompt     |
| Shapes!     | `shapes.js`   | Match an SVG shape (circle, square, triangle, star, heart, diamond) |
| Animals     | `animals.js`  | Identify 1 of 12 animal emojis by name             |
| Big & Small | `bigsmall.js` | Pick which real-world object is bigger or smaller  |

### ⭐ Age 5–6 (Foundation skills)
| Game        | File          | Mechanic                                           |
|-------------|---------------|----------------------------------------------------|
| Count It!   | `count.js`    | Count 2–9 animal emojis; pick number from 8-button grid |
| ABC Match   | `letters.js`  | Match uppercase ↔ lowercase letter (A–R)           |
| Easy Math   | `easymath.js` | Addition with sums ≤ 10; dot visual aid shown      |
| Odd One Out | `oddone.js`   | Pick the item that doesn't belong in the category  |

### 🚀 Age 7–8 (Expanding knowledge)
| Game        | File          | Mechanic                                           |
|-------------|---------------|----------------------------------------------------|
| Math Race   | `math20.js`   | Addition & subtraction within 20                   |
| Spell It!   | `spellit.js`  | Fill in the missing vowel (C_T → CAT)              |
| Flag Quiz   | `flags.js`    | Identify flag emoji from 15 countries              |
| Patterns    | `pattern.js`  | Predict next number (step +2/+3/+5, doubling, +10) |

### 🏆 Age 9–10 (Advanced)
| Game         | File           | Mechanic                                          |
|--------------|----------------|---------------------------------------------------|
| Times Table  | `multiply.js`  | Multiplication ×2–×10                             |
| Division     | `divide.js`    | Exact integer division                            |
| Capitals     | `capitals.js`  | Capital city of 13 countries                      |
| Sequences    | `sequence.js`  | Find missing number: ×2, arithmetic, ÷2, squares, Fibonacci-like |

---

## Gameplay Loop

```
startGame(id)
    │
    ▼
nextQ()  ←───────────────────────────────┐
    │  (clears area, calls dispatchGame)  │
    ▼                                     │
setup_<game>(area)                        │
    │  (renders question + answer buttons) │
    │                                     │
    ├── Player taps correct → onCorrect() ─┤  (after 830 ms)
    │                                     │
    └── Player taps wrong  → onWrong()    │  (re-enables after 520 ms, stays on Q)
                                          │
    qIndex reaches TOTAL_Q (8) → endGame()
```

Each session is **8 questions**. Stars awarded:
- ⭐⭐⭐ — 7–8 correct
- ⭐⭐ — 5–6 correct
- ⭐ — 1–4 correct

Star counts are persisted in `localStorage` as `gameStars` (object keyed by game ID). The **highest** score per game is stored, never lowered.

---

## State Variables

| Variable      | Default | Description                                      |
|---------------|---------|--------------------------------------------------|
| `currentAge`  | `'5-6'` | Active age tab ID                                |
| `currentGame` | `null`  | Active game ID string                            |
| `qIndex`      | `0`     | Current question number (0–7)                    |
| `sessionSc`   | `0`     | Correct answers in this session                  |
| `totalStars`  | `0`     | Cumulative stars across all sessions             |
| `gameStars`   | `{}`    | Map of `gameId → maxStars` (persisted)           |
| `canAns`      | `true`  | Prevents double-tap / answer during animation    |
| `timerSec`    | `0`     | Remaining seconds on parent timer                |
| `TOTAL_Q`     | `8`     | Questions per session (constant)                 |

---

## UI Components & CSS

### Design Tokens (CSS Variables)
```css
--coral:  #FF6B6B    --orange: #FF8E53
--teal:   #4ECDC4    --yellow: #FFE66D
--mint:   #95E1D3    --pink:   #F38181
--sky:    #A8D8EA    --purple: #C3A6FF
--gold:   #FFD93D    --cream:  #FFFEF0
--dark:   #2D2D2D
```

### Fonts
- **Fredoka One** — headings, buttons, game elements (playful rounded look)
- **Nunito** — subtitles, labels (clean legibility)

### Answer Feedback
- `.is-correct` + `.hi-correct` — green tint + bounce animation
- `.is-wrong` + `.hi-wrong` — red tint + horizontal shake animation
- Overlay emoji (`#feedback-emoji`) — random star/celebration emoji on correct, thinking emoji on wrong
- Confetti burst (`spawnConfetti`) — colored rectangles rain on correct answer

### Option Grid Classes
| Class      | Columns | Used for                         |
|------------|---------|----------------------------------|
| `.opts-2`  | 2       | Most games (text, letter, math)  |
| `.opts-4`  | 4       | Count game (8-button number pad) |

### Shared Display Elements
| Class      | Description                                         |
|------------|-----------------------------------------------------|
| `.g-color` | 108px color circle with layered ring shadow          |
| `.g-emoji` | 5.5rem emoji display block                          |
| `.g-letter`| Gradient rounded square for letter display          |
| `.g-word`  | Centered flex container for spell-it word           |
| `.g-math`  | Gradient pill card for equation display             |
| `.g-flag`  | Large flag emoji display                            |

---

## Parent Timer

Located on the home screen below the game grid. Lets parents set a countdown before handing the device to a child.

- **Buttons:** 15 min / 20 min / 30 min — each sets and starts the timer on click
- **Display:** `MM:SS` clock turns yellow (`warn` class) when ≤ 60 seconds remain
- **Progress bar:** fills left-to-right as time elapses
- **Alert:** slides down a toast notification ("Time's Up! Parents are ready!") when timer hits zero

---

## Persistence

Uses `localStorage` with two keys:

| Key          | Value                              |
|--------------|------------------------------------|
| `totalStars` | integer — cumulative star total    |
| `gameStars`  | JSON string — `{ [gameId]: stars }`|

Both are loaded on startup and saved after every session end.

---

## Adding a New Game

1. Create `games/<yourgame>.js` with a `setup_<yourgame>(area)` function.
2. Use engine globals (`canAns`, `onCorrect`, `onWrong`, `pick`, `shuffle`, `addQ`, `makeDisplay`) freely.
3. Add an entry to the appropriate `AGE_GROUPS[n].games` array in `index.html`.
4. Add a `case '<yourgame>': setup_<yourgame>(area); break;` in `dispatchGame()`.
5. Add a `<script src="games/<yourgame>.js"></script>` tag in `index.html` (after the existing script tags).

---

## Browser Compatibility

- **Mobile-first** — `user-scalable=no`, `-webkit-tap-highlight-color: transparent`, `user-select: none`
- Tested via Playwright screenshots (`.playwright-mcp/` logs)
- No build step — open `index.html` directly in any modern browser or serve with any static file server
