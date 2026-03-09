const ODD_SETS = [
  { items: ['🍎', '🍊', '🍋', '🚗'],      oddIdx: 3, hint: 'Which one is NOT a fruit? 🍎' },
  { items: ['🐶', '🐱', '🐰', '🍕'],      oddIdx: 3, hint: 'Which one is NOT an animal? 🐾' },
  { items: ['🚗', '🚌', '✈️', '🍦'],      oddIdx: 3, hint: 'Which one is NOT a vehicle? 🚌' },
  { items: ['🌹', '🌷', '🌻', '🎃'],      oddIdx: 3, hint: 'Which one is NOT a flower? 🌸' },
  { items: ['🍕', '🍔', '🌮', '🎸'],      oddIdx: 3, hint: 'Which one is NOT food? 🍔' },
  { items: ['📚', '✏️', '🖊️', '🐘'],     oddIdx: 3, hint: 'Which one is NOT school stuff? 📚' },
  { items: ['⭐', '🌟', '💫', '🌊'],      oddIdx: 3, hint: 'Which one does NOT shine? ✨' },
  { items: ['🎸', '🎺', '🥁', '🚀'],      oddIdx: 3, hint: 'Which one is NOT a music instrument? 🎵' },
  { items: ['🍇', '🍓', '🍑', '🥕'],      oddIdx: 3, hint: 'Which one is NOT a fruit? 🍓' },
  { items: ['🔴', '🟡', '🔵', '🐸'],      oddIdx: 3, hint: 'Which one is NOT a color circle? 🔴' },
  { items: ['🐟', '🐠', '🐡', '🦅'],      oddIdx: 3, hint: 'Which one does NOT live in water? 🐟' },
  { items: ['🍦', '🎂', '🍪', '🥦'],      oddIdx: 3, hint: 'Which one is NOT a sweet treat? 🍬' },
  { items: ['🏀', '⚽', '🎾', '🎻'],      oddIdx: 3, hint: 'Which one is NOT a sports ball? ⚽' },
  { items: ['🌧️', '⛈️', '🌩️', '🌈'],  oddIdx: 3, hint: 'Which one is NOT stormy weather? 🌤️' },
  { items: ['🇨🇳', '🇯🇵', '🇰🇷', '🇧🇷'], oddIdx: 3, hint: 'Which flag is NOT from Asia? 🌏' },
  { items: ['🍌', '🍍', '🥭', '🍎'],      oddIdx: 3, hint: 'Which one does NOT grow in tropical places? 🌴' },
  { items: ['🚂', '🚃', '🚄', '🚢'],      oddIdx: 3, hint: 'Which one does NOT run on tracks? 🚆' },
  { items: ['🎨', '✏️', '🖌️', '🔫'],     oddIdx: 3, hint: 'Which one is NOT an art tool? 🎨' },
  { items: ['👒', '🎩', '⛑️', '🧦'],     oddIdx: 3, hint: 'Which one is NOT a hat? 🎩' },
  { items: ['🌍', '🌎', '🌏', '🌙'],      oddIdx: 3, hint: 'Which one is NOT a planet or Earth? 🌍' },
  { items: ['🍞', '🥐', '🥖', '🍣'],      oddIdx: 3, hint: 'Which one is NOT a bread? 🍞' },
  { items: ['🦁', '🐯', '🐆', '🐄'],      oddIdx: 3, hint: 'Which one is NOT a wild big cat? 🐆' },
  { items: ['🎃', '🎄', '🎆', '🖥️'],     oddIdx: 3, hint: 'Which one is NOT a holiday item? 🎉' },
  { items: ['💻', '🖥️', '📱', '🎸'],     oddIdx: 3, hint: 'Which one is NOT a computer or phone? 💻' },
  { items: ['🌵', '🌴', '🌲', '🍔'],      oddIdx: 3, hint: 'Which one is NOT a tree? 🌴' },
  { items: ['🥁', '🎷', '🎻', '🧲'],      oddIdx: 3, hint: 'Which one is NOT a musical instrument? 🎵' },
  { items: ['🍄', '🌿', '🍀', '🏈'],      oddIdx: 3, hint: 'Which one does NOT grow in nature? 🌱' },
  { items: ['🚤', '⛵', '🛥️', '🚜'],     oddIdx: 3, hint: 'Which one does NOT go on water? ⛵' },
  { items: ['👁️', '👂', '👃', '✋'],     oddIdx: 3, hint: 'Which one is NOT on your face? 👀' },
  { items: ['🍷', '🧃', '🥤', '🍕'],      oddIdx: 3, hint: 'Which one is NOT a drink? 🥤' },
  { items: ['🌑', '🌒', '🌓', '☀️'],     oddIdx: 3, hint: 'Which one is NOT the Moon? 🌙' },
  { items: ['🥊', '🏋️', '🤸', '🎨'],    oddIdx: 3, hint: 'Which one is NOT a sport? 🏅' },
  { items: ['🦷', '💊', '🩺', '🍕'],      oddIdx: 3, hint: 'Which one is NOT medical? 🏥' },
  { items: ['🐓', '🦆', '🦅', '🐢'],      oddIdx: 3, hint: 'Which one is NOT a bird? 🐦' },
  { items: ['🌺', '🌻', '🌸', '🍁'],      oddIdx: 3, hint: 'Which one is NOT a flower? 🌸' },
];

function setup_oddone(area) {
  const set = pick(ODD_SETS);
  const oddEmoji = set.items[set.oddIdx];

  const shuffled = shuffle([...set.items]);
  const newOddIdx = shuffled.indexOf(oddEmoji);

  addQ(area, set.hint);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = '1fr 1fr';
  grid.style.gap = '12px';
  grid.style.marginTop = '16px';

  shuffled.forEach((emoji, idx) => {
    const btn = document.createElement('button');

    btn.style.height = '88px';
    btn.style.borderRadius = '16px';
    btn.style.background = '#f9f9f9';
    btn.style.border = '3px solid #e0e0e0';
    btn.style.fontSize = '2.8rem';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.boxShadow = '0 4px 0 rgba(0,0,0,.08)';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'all .12s';
    btn.style.width = '100%';

    btn.textContent = emoji;

    const pressDown = () => {
      btn.style.transform = 'translateY(3px)';
      btn.style.boxShadow = 'none';
    };
    const pressUp = () => {
      btn.style.transform = '';
      btn.style.boxShadow = '0 4px 0 rgba(0,0,0,.08)';
    };

    btn.addEventListener('mousedown', pressDown);
    btn.addEventListener('touchstart', pressDown, { passive: true });
    btn.addEventListener('mouseup', pressUp);
    btn.addEventListener('mouseleave', pressUp);
    btn.addEventListener('touchend', pressUp);

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (idx === newOddIdx) {
        btn.style.background = '#d4f5e9';
        btn.style.border = '3px solid #4ECDC4';
        btn.classList.add('is-correct');
        onCorrect();
      } else {
        btn.style.background = '#fde8e8';
        btn.style.border = '3px solid #FF6B6B';
        btn.classList.add('is-wrong');
        onWrong();
        setTimeout(() => {
          btn.style.background = '#f9f9f9';
          btn.style.border = '3px solid #e0e0e0';
          btn.classList.remove('is-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  });

  area.appendChild(grid);
}
