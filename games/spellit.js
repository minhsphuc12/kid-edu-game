function setup_spellit(area) {
  const WORDS = [
    { disp: 'C_T',  ans: 'A', wrong: ['E','O','I'] },
    { disp: 'D_G',  ans: 'O', wrong: ['A','E','U'] },
    { disp: 'H_T',  ans: 'A', wrong: ['I','O','E'] },
    { disp: 'S_N',  ans: 'U', wrong: ['A','O','E'] },
    { disp: 'P_G',  ans: 'I', wrong: ['A','E','O'] },
    { disp: 'B_D',  ans: 'E', wrong: ['A','I','O'] },
    { disp: 'FL_',  ans: 'Y', wrong: ['A','E','I'] },
    { disp: 'FI_H', ans: 'S', wrong: ['T','R','N'] },
    { disp: 'FR_G', ans: 'O', wrong: ['A','E','I'] },
    { disp: 'CA_E', ans: 'K', wrong: ['T','P','N'] },
    { disp: 'RA_N', ans: 'I', wrong: ['A','E','O'] },
    { disp: 'J_MP', ans: 'U', wrong: ['A','E','I'] },
    { disp: 'C_MP', ans: 'A', wrong: ['E','I','O'] },
    { disp: 'TR_P', ans: 'I', wrong: ['A','E','O'] },
    { disp: 'SL_P', ans: 'E', wrong: ['A','I','O'] },
  ];

  const word = pick(WORDS);

  addQ(area, 'Fill in the missing letter! \u270F\uFE0F');

  const wordDiv = document.createElement('div');
  wordDiv.className = 'g-word';

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.alignItems = 'center';
  row.style.gap = '4px';
  row.style.letterSpacing = '4px';

  for (let i = 0; i < word.disp.length; i++) {
    const ch = word.disp[i];
    const span = document.createElement('span');
    span.style.fontSize = '2.2rem';
    span.style.fontFamily = "'Fredoka One', cursive";

    if (ch === '_') {
      span.textContent = '_';
      span.style.color = '#C3A6FF';
      span.style.fontWeight = 'bold';
      span.style.borderBottom = '3px solid #C3A6FF';
      span.style.padding = '0 4px';
    } else {
      span.textContent = ch;
    }

    row.appendChild(span);
  }

  wordDiv.appendChild(row);
  const displayDiv = makeDisplay(wordDiv);
  area.appendChild(displayDiv);

  const opts = shuffle([word.ans, ...word.wrong]);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  opts.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-letter';
    btn.style.height = '70px';
    btn.style.fontSize = '2.1rem';
    btn.style.borderRadius = '14px';
    btn.style.background = 'linear-gradient(135deg, #f8f4ff 0%, #e8d5ff 100%)';
    btn.style.border = '2px solid #e0e0e0';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.textContent = letter;

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (letter === word.ans) {
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
