const COLORS = [
  { name: 'Red',       hex: '#FF6B6B' },
  { name: 'Blue',      hex: '#4ECDC4' },
  { name: 'Yellow',    hex: '#FFE66D' },
  { name: 'Green',     hex: '#95E1D3' },
  { name: 'Purple',    hex: '#C3A6FF' },
  { name: 'Orange',    hex: '#FF8E53' },
  { name: 'Pink',      hex: '#F38181' },
  { name: 'Sky',       hex: '#A8D8EA' },
  { name: 'Gold',      hex: '#FFD93D' },
  { name: 'Mint',      hex: '#4CAF82' },
  { name: 'Coral',     hex: '#FF7F6E' },
  { name: 'Lavender',  hex: '#B39DDB' },
  { name: 'Lime',      hex: '#C6E855' },
  { name: 'Brown',     hex: '#A0785A' },
  { name: 'Navy',      hex: '#4A6FA5' },
  { name: 'Peach',     hex: '#FFAC81' },
  { name: 'Turquoise', hex: '#45B7D1' },
  { name: 'Magenta',   hex: '#E040FB' },
  { name: 'Cream',     hex: '#F5E6C8' },
  { name: 'Indigo',    hex: '#5C6BC0' },
  { name: 'Teal',      hex: '#26A69A' },
  { name: 'Rose',      hex: '#EC407A' },
  { name: 'Amber',     hex: '#FFA726' },
  { name: 'Cyan',      hex: '#26C6DA' },
  { name: 'Violet',    hex: '#7E57C2' },
  { name: 'Crimson',   hex: '#D32F2F' },
  { name: 'Olive',     hex: '#9E9D24' },
  { name: 'Maroon',    hex: '#880E4F' },
  { name: 'Tan',       hex: '#D2A679' },
  { name: 'Slate',     hex: '#78909C' },
];

function setup_colors(area) {
  const target = pick(COLORS);
  const distractors = pickN(COLORS.filter(c => c.hex !== target.hex), 3);
  const options = shuffle([target, ...distractors]);

  addQ(area, 'Tap the matching color!');

  const circle = document.createElement('div');
  circle.className = 'g-color';
  circle.style.background = target.hex;

  const display = makeDisplay(circle);
  area.appendChild(display);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-color';
    btn.style.background = color.hex;
    btn.setAttribute('aria-label', color.name);

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (color.hex === target.hex) {
        btn.textContent = '✓';
        btn.style.color = '#fff';
        btn.style.fontSize = '2rem';
        btn.classList.add('is-correct', 'hi-correct');
        onCorrect();
      } else {
        btn.classList.add('is-wrong', 'hi-wrong');
        onWrong();
        setTimeout(() => {
          btn.classList.remove('is-wrong', 'hi-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  });

  area.appendChild(grid);
}
