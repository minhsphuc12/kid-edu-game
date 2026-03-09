function setup_multiply(area) {
  function genMultiply() {
    const a = 2 + Math.floor(Math.random() * 9);
    const b = 1 + Math.floor(Math.random() * 10);
    const answer = a * b;
    const wrongSet = new Set();
    const deltas = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    for (const d of shuffle([...deltas])) {
      const w = answer + d;
      if (w > 0 && w !== answer && wrongSet.size < 3) wrongSet.add(w);
    }
    return { eq: a + ' \u00D7 ' + b + ' = ?', answer, wrong: [...wrongSet] };
  }

  addQ(area, 'What is the answer? \u2716\uFE0F');

  const { eq, answer, wrong } = genMultiply();

  const display = makeDisplay();
  const math = document.createElement('span');
  math.className = 'g-math';
  math.textContent = eq;
  display.appendChild(math);
  area.appendChild(display);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  const options = shuffle([answer, ...wrong]);

  for (const value of options) {
    const btn = document.createElement('button');
    btn.className = 'opt opt-number-big';
    btn.textContent = value;

    btn.addEventListener('click', function () {
      if (!canAns) return;

      if (value === answer) {
        btn.classList.add('is-correct', 'hi-correct');
        onCorrect();
      } else {
        btn.classList.add('is-wrong', 'hi-wrong');
        onWrong();
        setTimeout(function () {
          btn.classList.remove('is-wrong', 'hi-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  }

  area.appendChild(grid);
}
