function genPattern() {
  const types = ['addStep', 'double', 'add10'];
  const type = pick(types);

  let nums, answer;

  if (type === 'addStep') {
    const step = pick([2, 3, 5]);
    const start = 1 + Math.floor(Math.random() * 10);
    nums = [start, start + step, start + step * 2];
    answer = start + step * 3;
  } else if (type === 'double') {
    const start = 1 + Math.floor(Math.random() * 4);
    nums = [start, start * 2, start * 4];
    answer = start * 8;
  } else {
    const start = 1 + Math.floor(Math.random() * 9);
    nums = [start, start + 10, start + 20];
    answer = start + 30;
  }

  const wrongSet = new Set();
  const offsets = [1, -1, 2, -2, 3, -3];
  for (const off of offsets) {
    const candidate = answer + off;
    if (candidate > 0 && candidate !== answer && wrongSet.size < 3) {
      wrongSet.add(candidate);
    }
  }

  return { nums, answer, wrong: [...wrongSet] };
}

function makeChip(content, isQuestion) {
  const chip = document.createElement('div');
  chip.textContent = content;
  if (isQuestion) {
    chip.style.background = 'linear-gradient(135deg,#C3A6FF,#A8D8EA)';
  } else {
    chip.style.background = 'linear-gradient(135deg,#4ECDC4,#95E1D3)';
  }
  chip.style.color = 'white';
  chip.style.padding = '8px 10px';
  chip.style.borderRadius = '12px';
  chip.style.minWidth = '46px';
  chip.style.textAlign = 'center';
  chip.style.fontSize = '1.5rem';
  chip.style.boxShadow = '0 3px 0 rgba(0,0,0,.1)';
  return chip;
}

function setup_pattern(area) {
  const { nums, answer, wrong } = genPattern();

  addQ(area, 'What comes next? 🔢');

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.alignItems = 'center';
  row.style.flexWrap = 'wrap';
  row.style.justifyContent = 'center';
  row.style.marginBottom = '12px';

  const allItems = [...nums, '?'];
  allItems.forEach((val, i) => {
    const chip = makeChip(val === '?' ? '?' : val, val === '?');
    row.appendChild(chip);

    if (i < allItems.length - 1) {
      const arrow = document.createElement('span');
      arrow.textContent = '→';
      arrow.style.fontSize = '1.1rem';
      arrow.style.color = '#aaa';
      row.appendChild(arrow);
    }
  });

  area.appendChild(row);

  const options = shuffle([answer, ...wrong]);
  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(num => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-number-big';
    btn.textContent = num;
    btn.style.height = '66px';
    btn.style.background = '#4ECDC4';
    btn.style.color = 'white';
    btn.style.fontSize = '1.5rem';

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
