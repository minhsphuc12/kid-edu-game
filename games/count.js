function setup_count(area) {
  const ANIMALS = ['🐶','🐱','🐰','🦊','🐻','🐼','🐨','🐯','🐸','🐧'];

  const emoji = pick(ANIMALS);
  const count = Math.floor(Math.random() * 8) + 2; // 2–9

  addQ(area, 'How many ' + emoji + ' do you see? 🤔');

  // Animal display wrap
  const wrap = document.createElement('div');
  wrap.className = 'animals-wrap';

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'anim';
    span.textContent = emoji;
    span.style.animationDelay = (i * 0.07) + 's';
    wrap.appendChild(span);
  }

  area.appendChild(wrap);

  // Build set of 8 unique numbers (1–9)
  const numSet = new Set([count]);
  while (numSet.size < 8) {
    numSet.add(Math.floor(Math.random() * 9) + 1);
  }
  const numbers = shuffle(Array.from(numSet));

  // Number button grid
  const grid = document.createElement('div');
  grid.className = 'opts-4';

  numbers.forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-number';
    btn.textContent = num;

    btn.addEventListener('click', () => {
      if (!canAns) return;
      canAns = false;

      if (num === count) {
        btn.style.background = '#4ECDC4';
        btn.textContent = '✓';
        btn.classList.add('is-correct');
        onCorrect();
      } else {
        btn.style.background = '#FF6B6B';
        btn.classList.add('is-wrong');
        onWrong();
        setTimeout(() => {
          btn.style.background = '#4ECDC4';
          btn.classList.remove('is-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  });

  area.appendChild(grid);
}
