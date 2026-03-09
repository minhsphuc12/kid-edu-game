function setup_letters(area) {
  const LETTERS_DATA = 'ABCDEFGHIJKLMNOPQR'.split('').map(u => ({ u, l: u.toLowerCase() }));

  const target = pick(LETTERS_DATA);
  const showUpper = Math.random() > 0.5;
  const display = showUpper ? target.u : target.l;
  const matchKey = showUpper ? 'l' : 'u';

  const wrongLetters = shuffle(LETTERS_DATA.filter(l => l.u !== target.u)).slice(0, 3);
  const opts = shuffle([target, ...wrongLetters]);

  const questionText = showUpper ? 'Find the lowercase letter 👇' : 'Find the UPPERCASE letter 👇';
  addQ(area, questionText);

  const letterCard = document.createElement('div');
  letterCard.className = 'g-letter';
  letterCard.textContent = display;

  const displayDiv = makeDisplay(letterCard);
  area.appendChild(displayDiv);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  opts.forEach(letterObj => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-letter';
    btn.textContent = letterObj[matchKey];

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (letterObj.u === target.u) {
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
