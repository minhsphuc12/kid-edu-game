function setup_sequence(area) {
  if (!canAns) return;

  // Pick a random sequence type 1–5
  const type = pick([1, 2, 3, 4, 5]);

  let seq, answer, missingIndex;

  if (type === 1) {
    // ×2 with middle missing: [s, s×2, ?, s×8], answer=s×4
    const s = pick([1, 2, 3, 4]);
    seq = [s, s * 2, s * 4, s * 8];
    answer = s * 4;
    missingIndex = 2;
  } else if (type === 2) {
    // +7 or +8 arithmetic: [s, s+step, ?, s+step×3], answer=s+step×2
    const step = pick([7, 8]);
    const s = Math.floor(Math.random() * 10) + 1;
    seq = [s, s + step, s + step * 2, s + step * 3];
    answer = s + step * 2;
    missingIndex = 2;
  } else if (type === 3) {
    // Decreasing ÷2: [s, s/2, ?, s/8], answer=s/4
    const s = pick([32, 48, 64, 80, 96]);
    seq = [s, s / 2, s / 4, s / 8];
    answer = s / 4;
    missingIndex = 2;
  } else if (type === 4) {
    // Squares sequence: [n², (n+1)², (n+2)², ?], answer=(n+3)²
    const n = pick([1, 2, 3, 4, 5, 6]);
    seq = [n * n, (n + 1) * (n + 1), (n + 2) * (n + 2), (n + 3) * (n + 3)];
    answer = (n + 3) * (n + 3);
    missingIndex = 3;
  } else {
    // Fibonacci-like: [a, b, a+b, ?], answer=b+(a+b)
    const a = 1 + Math.floor(Math.random() * 4);
    const b = 1 + Math.floor(Math.random() * 4);
    seq = [a, b, a + b, b + (a + b)];
    answer = b + (a + b);
    missingIndex = 3;
  }

  // Build question text
  addQ(area, 'Find the missing number! 📊');

  // Build sequence row
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.alignItems = 'center';
  row.style.flexWrap = 'wrap';
  row.style.justifyContent = 'center';
  row.style.margin = '12px 0';

  function makeChip(value, isQuestion) {
    const chip = document.createElement('div');
    if (isQuestion) {
      chip.style.background = 'linear-gradient(135deg,#C3A6FF,#A8D8EA)';
      chip.textContent = '?';
    } else {
      chip.style.background = 'linear-gradient(135deg,#FF8E53,#FFE66D)';
      chip.textContent = String(value);
    }
    chip.style.color = 'white';
    chip.style.padding = '8px 12px';
    chip.style.borderRadius = '12px';
    chip.style.minWidth = '46px';
    chip.style.textAlign = 'center';
    chip.style.fontSize = '1.4rem';
    chip.style.boxShadow = '0 3px 0 rgba(0,0,0,.1)';
    chip.style.fontFamily = 'Fredoka One, cursive';
    return chip;
  }

  function makeArrow() {
    const arrow = document.createElement('span');
    arrow.textContent = '→';
    arrow.style.fontSize = '1rem';
    arrow.style.color = '#bbb';
    return arrow;
  }

  for (let i = 0; i < seq.length; i++) {
    const chip = makeChip(seq[i], i === missingIndex);
    row.appendChild(chip);
    // Add arrow after each chip except the last
    if (i < seq.length - 1) {
      row.appendChild(makeArrow());
    }
  }

  area.appendChild(row);

  // Generate wrong options: answer ± values in 2–5 range, filtered > 0, no duplicates
  const offsets = shuffle([2, 3, 4, 5]);
  const wrongs = [];
  let offsetIdx = 0;
  while (wrongs.length < 3 && offsetIdx < offsets.length * 2) {
    const delta = offsets[offsetIdx % offsets.length];
    const sign = offsetIdx < offsets.length ? 1 : -1;
    const candidate = answer + sign * delta;
    if (candidate > 0 && candidate !== answer && !wrongs.includes(candidate)) {
      wrongs.push(candidate);
    }
    offsetIdx++;
  }
  // Fallback: if still need more wrongs, use sequential offsets
  let fallbackDelta = 1;
  while (wrongs.length < 3) {
    const candidate = answer + fallbackDelta;
    if (candidate > 0 && candidate !== answer && !wrongs.includes(candidate)) {
      wrongs.push(candidate);
    }
    fallbackDelta++;
  }

  const options = shuffle([answer, ...wrongs]);

  // Build 2-column grid of option buttons
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = '1fr 1fr';
  grid.style.gap = '10px';
  grid.style.marginTop = '12px';

  options.forEach(function (opt) {
    const btn = document.createElement('button');
    btn.textContent = String(opt);
    btn.style.height = '66px';
    btn.style.background = '#FF8E53';
    btn.style.color = 'white';
    btn.style.fontSize = '1.5rem';
    btn.style.borderRadius = '14px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.fontFamily = 'Fredoka One, cursive';

    btn.addEventListener('click', function () {
      if (!canAns) return;
      if (opt === answer) {
        onCorrect();
      } else {
        onWrong();
      }
    });

    grid.appendChild(btn);
  });

  area.appendChild(grid);
}
