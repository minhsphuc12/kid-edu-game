function genEasyMath() {
  const mode = pick(['add', 'sub', 'missingAddend']);
  let a, b, answer, prompt, equation, dotsText;

  if (mode === 'add') {
    do {
      a = 1 + Math.floor(Math.random() * 7);
      b = 1 + Math.floor(Math.random() * 7);
    } while (a + b > 15);
    answer = a + b;
    prompt = 'What is ' + a + ' + ' + b + '? ➕';
    equation = a + ' + ' + b + ' = ?';
    dotsText = '🟡'.repeat(a) + ' + ' + '🟡'.repeat(b);
  } else if (mode === 'sub') {
    a = 4 + Math.floor(Math.random() * 12);
    b = 1 + Math.floor(Math.random() * (a - 1));
    answer = a - b;
    prompt = 'What is ' + a + ' − ' + b + '? ➖';
    equation = a + ' − ' + b + ' = ?';
    dotsText = '🟡'.repeat(a) + ' minus ' + '🔹'.repeat(b);
  } else {
    b = 1 + Math.floor(Math.random() * 8);
    answer = 1 + Math.floor(Math.random() * 8);
    a = b + answer;
    prompt = 'Find the missing number! 🔍';
    equation = '? + ' + b + ' = ' + a;
    dotsText = '🟡'.repeat(a) + ' total, ' + '🔹'.repeat(b) + ' known';
  }

  const wrongSet = new Set();
  const candidates = [answer - 3, answer - 2, answer - 1, answer + 1, answer + 2, answer + 3, answer + 4];
  for (const c of candidates) {
    if (c > 0 && c !== answer && wrongSet.size < 3) wrongSet.add(c);
  }
  return { answer, wrong: [...wrongSet], prompt, equation, dotsText };
}

function setup_easymath(area) {
  const { answer, wrong, prompt, equation, dotsText } = genEasyMath();

  addQ(area, prompt);

  // Equation display card
  const display = makeDisplay();
  const mathSpan = document.createElement('span');
  mathSpan.className = 'g-math';
  mathSpan.textContent = equation;
  display.appendChild(mathSpan);
  area.appendChild(display);

  // Dot visual aid
  const dots = document.createElement('div');
  dots.textContent = dotsText;
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
