function genEasyMath() {
  let a, b;
  do {
    a = 1 + Math.floor(Math.random() * 5);
    b = 1 + Math.floor(Math.random() * 5);
  } while (a + b > 10);
  const answer = a + b;
  const wrongSet = new Set();
  const candidates = [answer - 2, answer - 1, answer + 1, answer + 2, answer + 3];
  for (const c of candidates) {
    if (c > 0 && c !== answer && wrongSet.size < 3) wrongSet.add(c);
  }
  return { a, b, answer, wrong: [...wrongSet] };
}

function setup_easymath(area) {
  const { a, b, answer, wrong } = genEasyMath();

  addQ(area, 'What is ' + a + ' + ' + b + '? ➕');

  // Equation display card
  const display = makeDisplay();
  const mathSpan = document.createElement('span');
  mathSpan.className = 'g-math';
  mathSpan.textContent = a + ' + ' + b + ' = ?';
  display.appendChild(mathSpan);
  area.appendChild(display);

  // Dot visual aid
  const dots = document.createElement('div');
  dots.textContent = '🟡'.repeat(a) + ' + ' + '🟡'.repeat(b);
  dots.style.fontSize = '1.2rem';
  dots.style.textAlign = 'center';
  dots.style.letterSpacing = '2px';
  area.appendChild(dots);

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
