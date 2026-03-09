function setup_divide(area) {
  addQ(area, 'Divide and conquer! \u2797');

  function genDivide() {
    const b = 2 + Math.floor(Math.random() * 9);
    const answer = 1 + Math.floor(Math.random() * 10);
    const a = b * answer;
    const wrongSet = new Set();
    const deltas = [-4, -3, -2, -1, 1, 2, 3, 4];
    for (const d of shuffle([...deltas])) {
      const w = answer + d;
      if (w > 0 && w !== answer && wrongSet.size < 3) wrongSet.add(w);
    }
    return { eq: a + ' \u00f7 ' + b + ' = ?', answer, wrong: [...wrongSet] };
  }

  const display = makeDisplay();
  area.appendChild(display);

  const mathEl = document.createElement('div');
  mathEl.className = 'g-math';
  display.appendChild(mathEl);

  const optsEl = document.createElement('div');
  optsEl.className = 'opts-2';
  area.appendChild(optsEl);

  function clearChildren(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function render() {
    const { eq, answer, wrong } = genDivide();

    mathEl.textContent = eq;

    clearChildren(optsEl);

    const choices = shuffle([answer, ...wrong]);

    for (const val of choices) {
      const btn = document.createElement('button');
      btn.className = 'opt opt-number-big';
      btn.style.background = '#FF8E53';
      btn.textContent = val;

      btn.addEventListener('click', function () {
        if (!canAns) return;

        if (val === answer) {
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

      optsEl.appendChild(btn);
    }
  }

  render();
}
