const COLORS = [
  { name: 'Red',    hex: '#FF6B6B' },
  { name: 'Blue',   hex: '#4ECDC4' },
  { name: 'Yellow', hex: '#FFE66D' },
  { name: 'Green',  hex: '#95E1D3' },
  { name: 'Purple', hex: '#C3A6FF' },
  { name: 'Orange', hex: '#FF8E53' },
  { name: 'Pink',   hex: '#F38181' },
  { name: 'Sky',    hex: '#A8D8EA' },
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
