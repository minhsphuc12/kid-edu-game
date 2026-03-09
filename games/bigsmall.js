function setup_bigsmall(area) {
  const pairs = [
    { big: { e: '🐘', n: 'Elephant' }, small: { e: '🐜', n: 'Ant' } },
    { big: { e: '🚌', n: 'Bus' }, small: { e: '🚲', n: 'Bicycle' } },
    { big: { e: '🌳', n: 'Tree' }, small: { e: '🌸', n: 'Flower' } },
    { big: { e: '🐋', n: 'Whale' }, small: { e: '🐟', n: 'Fish' } },
    { big: { e: '🛳️', n: 'Ship' }, small: { e: '⛵', n: 'Sailboat' } },
    { big: { e: '☀️', n: 'Sun' }, small: { e: '⭐', n: 'Star' } },
    { big: { e: '🏔️', n: 'Mountain' }, small: { e: '🪨', n: 'Rock' } },
    { big: { e: '🦁', n: 'Lion' }, small: { e: '🐭', n: 'Mouse' } },
  ];

  function clearArea() {
    while (area.firstChild) {
      area.removeChild(area.firstChild);
    }
  }

  function makeButton(item) {
    const btn = document.createElement('button');
    btn.style.display = 'flex';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.gap = '8px';
    btn.style.borderRadius = '20px';
    btn.style.cursor = 'pointer';
    btn.style.padding = '18px 10px';
    btn.style.background = '#f5f5f5';
    btn.style.border = '3px solid #e0e0e0';
    btn.style.boxShadow = '0 5px 0 rgba(0,0,0,.08)';
    btn.style.transition = 'all .12s';
    btn.style.width = '100%';

    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = item.e;
    emojiSpan.style.fontSize = '4rem';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.n;
    nameSpan.style.fontSize = '.9rem';
    nameSpan.style.fontFamily = 'Nunito, sans-serif';
    nameSpan.style.fontWeight = '900';
    nameSpan.style.color = '#666';

    btn.appendChild(emojiSpan);
    btn.appendChild(nameSpan);

    return btn;
  }

  function resetButton(btn) {
    btn.style.background = '#f5f5f5';
    btn.style.border = '3px solid #e0e0e0';
    btn.classList.remove('is-correct', 'is-wrong');
  }

  function nextQuestion() {
    clearArea();

    const pair = pick(pairs);
    const askBig = Math.random() < 0.5;

    const questionText = askBig
      ? 'Which is BIGGER in real life? 🐘'
      : 'Which is SMALLER in real life? 🐜';

    addQ(area, questionText);

    const correctItem = askBig ? pair.big : pair.small;
    const wrongItem = askBig ? pair.small : pair.big;

    const items = shuffle([
      { item: correctItem, isCorrect: true },
      { item: wrongItem, isCorrect: false },
    ]);

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = '1fr 1fr';
    grid.style.gap = '16px';
    grid.style.width = '100%';

    items.forEach(function (entry) {
      const btn = makeButton(entry.item);

      btn.addEventListener('click', function () {
        if (!canAns) return;
        canAns = false;

        if (entry.isCorrect) {
          btn.style.background = '#d4f5e9';
          btn.style.border = '3px solid #4ECDC4';
          btn.classList.add('is-correct');
          onCorrect();
        } else {
          btn.style.background = '#fde8e8';
          btn.style.border = '3px solid #FF6B6B';
          btn.classList.add('is-wrong');
          onWrong();
          setTimeout(function () {
            resetButton(btn);
            canAns = true;
          }, 520);
        }
      });

      grid.appendChild(btn);
    });

    area.appendChild(grid);
  }

  nextQuestion();
}
