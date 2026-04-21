function genMath20() {
  const mode = pick(['add', 'sub', 'missingAddend', 'missingSubtrahend']);
  let a, b, answer, eq;

  if (mode === 'add') {
    a = 5 + Math.floor(Math.random() * 16); // 5–20
    b = 1 + Math.floor(Math.random() * Math.max(1, 21 - a)); // sum <= 21
    answer = a + b;
    eq = a + ' + ' + b + ' = ?';
  } else if (mode === 'sub') {
    a = 12 + Math.floor(Math.random() * 17); // 12–28
    b = 1 + Math.floor(Math.random() * (a - 1));
    answer = a - b;
    eq = a + ' \u2212 ' + b + ' = ?';
  } else if (mode === 'missingAddend') {
    a = 2 + Math.floor(Math.random() * 10);
    answer = 3 + Math.floor(Math.random() * 12);
    b = a + answer;
    eq = a + ' + ? = ' + b;
  } else {
    b = 2 + Math.floor(Math.random() * 10);
    answer = 2 + Math.floor(Math.random() * 12);
    a = b + answer;
    eq = a + ' \u2212 ? = ' + answer;
  }

  const wrongSet = new Set();
  const deltas = [-4, -3, -2, -1, 1, 2, 3, 4, 5];
  for (const d of deltas) {
    const w = answer + d;
    if (w > 0 && w !== answer && wrongSet.size < 3) wrongSet.add(w);
  }
  return { eq, answer, wrong: [...wrongSet] };
}

function setup_math20(area) {
  const { eq, answer, wrong } = genMath20();

  addQ(area, 'Solve it fast! 🧮');

  // Equation display card
  const display = makeDisplay();
  const mathSpan = document.createElement('span');
  mathSpan.className = 'g-math';
  mathSpan.textContent = eq;
  display.appendChild(mathSpan);
  area.appendChild(display);

  // Options grid
  const options = shuffle([answer, ...wrong]);
  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-number-big';
    btn.textContent = num;

    btn.addEventListener('click', () => {
      if (!canAns) return;
      canAns = false;

      if (num === answer) {
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
