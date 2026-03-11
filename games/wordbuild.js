function setup_wordbuild(area) {
  const WORDS = [
    { word: 'CAT', emoji: '🐱' },
    { word: 'DOG', emoji: '🐶' },
    { word: 'SUN', emoji: '☀️' },
    { word: 'BUS', emoji: '🚌' },
    { word: 'HEN', emoji: '🐔' },
    { word: 'OWL', emoji: '🦉' },
    { word: 'PIG', emoji: '🐷' },
    { word: 'FOX', emoji: '🦊' },
    { word: 'HAT', emoji: '🎩' },
    { word: 'KEY', emoji: '🔑' },
    { word: 'LOG', emoji: '🪵' },
    { word: 'NUT', emoji: '🥜' },
    { word: 'BEE', emoji: '🐝' },
    { word: 'JAM', emoji: '🍓' },
    { word: 'CUP', emoji: '☕' },
    { word: 'MAP', emoji: '🗺️' },
    { word: 'NET', emoji: '🥅' },
    { word: 'POT', emoji: '🪣' },
    { word: 'WEB', emoji: '🕸️' },
    { word: 'GEM', emoji: '💎' },
    { word: 'ICE', emoji: '🧊' },
    { word: 'JET', emoji: '✈️' },
    { word: 'MOP', emoji: '🧹' },
    { word: 'TUB', emoji: '🛁' },
    { word: 'VAN', emoji: '🚐' },
    { word: 'RAT', emoji: '🐀' },
    { word: 'ANT', emoji: '🐜' },
    { word: 'ARM', emoji: '💪' },
    { word: 'BOW', emoji: '🎀' },
    { word: 'BUD', emoji: '🌱' },
    { word: 'DEN', emoji: '🦁' },
    { word: 'EGG', emoji: '🥚' },
    { word: 'FAN', emoji: '🪭' },
    { word: 'FIN', emoji: '🦈' },
    { word: 'GUM', emoji: '🍬' },
    { word: 'HOP', emoji: '🐰' },
    { word: 'HUG', emoji: '🤗' },
    { word: 'JOB', emoji: '💼' },
    { word: 'JOY', emoji: '😄' },
    { word: 'LAP', emoji: '🧘' },
    { word: 'LID', emoji: '🍲' },
    { word: 'MUD', emoji: '💧' },
    { word: 'NAP', emoji: '😴' },
    { word: 'OAK', emoji: '🌳' },
    { word: 'PAW', emoji: '🐾' },
    { word: 'PEA', emoji: '🫛' },
    { word: 'PEN', emoji: '🖊️' },
    { word: 'RIB', emoji: '🍖' },
    { word: 'ROD', emoji: '🎣' },
    { word: 'RUG', emoji: '🛋️' },
  ];

  var entry = pick(WORDS);
  var letters = entry.word.split('');
  var scrambled = shuffle([...letters]);

  // make sure scrambled !== original
  while (scrambled.join('') === entry.word) {
    scrambled = shuffle([...letters]);
  }

  addQ(area, 'Spell the word! Tap the letters! ✏️');

  var hintEl = document.createElement('div');
  hintEl.className = 'g-emoji';
  hintEl.textContent = entry.emoji;
  area.appendChild(hintEl);

  // Slot row — shows typed letters
  var buildRow = document.createElement('div');
  buildRow.style.cssText = 'display:flex;gap:8px;justify-content:center;margin:8px 0;';

  var slots = letters.map(function() {
    var slot = document.createElement('div');
    slot.style.cssText = 'width:52px;height:56px;border-radius:12px;border:3px solid #C3A6FF;display:flex;align-items:center;justify-content:center;font-family:"Fredoka One",cursive;font-size:1.9rem;color:#2D2D2D;background:#f9f5ff;transition:all .15s;';
    buildRow.appendChild(slot);
    return slot;
  });

  area.appendChild(buildRow);

  // Track which tile indices have been tapped
  var built = [];

  // Letter tiles
  var tileRow = document.createElement('div');
  tileRow.style.cssText = 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px;';

  var tiles = scrambled.map(function(letter) {
    var tile = document.createElement('button');
    tile.textContent = letter;
    tile.style.cssText = 'width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#C3A6FF,#A8D8EA);color:#fff;font-size:1.9rem;font-family:"Fredoka One",cursive;border:none;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.12);transition:all .12s;';

    tile.addEventListener('click', function() {
      if (!canAns || tile.disabled) return;

      tile.disabled = true;
      tile.style.opacity = '0.3';
      tile.style.transform = 'translateY(3px)';
      tile.style.boxShadow = 'none';

      built.push({ letter: letter, tile: tile });
      var slotIdx = built.length - 1;
      slots[slotIdx].textContent = letter;
      slots[slotIdx].style.background = '#ede0ff';
      slots[slotIdx].style.borderColor = '#9c6fef';

      if (built.length === letters.length) {
        var attempt = built.map(function(b) { return b.letter; }).join('');

        if (attempt === entry.word) {
          slots.forEach(function(s) {
            s.style.background = '#d4f5e9';
            s.style.borderColor = '#4ECDC4';
          });
          onCorrect();
        } else {
          slots.forEach(function(s) {
            s.style.background = '#fde8e8';
            s.style.borderColor = '#FF6B6B';
          });
          onWrong();
          setTimeout(function() {
            resetBoard();
            canAns = true;
          }, 700);
        }
      }
    });

    tileRow.appendChild(tile);
    return tile;
  });

  area.appendChild(tileRow);

  // Clear button
  var clearBtn = document.createElement('button');
  clearBtn.textContent = '⌫ Clear';
  clearBtn.style.cssText = 'margin:12px auto 0;display:block;padding:8px 22px;border-radius:50px;border:2px solid #e0e0e0;background:#f5f5f5;font-family:"Fredoka One",cursive;font-size:.85rem;color:#888;cursor:pointer;';

  clearBtn.addEventListener('click', function() {
    if (!canAns) return;
    resetBoard();
  });

  area.appendChild(clearBtn);

  function resetBoard() {
    built.length = 0;
    slots.forEach(function(s) {
      s.textContent = '';
      s.style.background = '#f9f5ff';
      s.style.borderColor = '#C3A6FF';
    });
    tiles.forEach(function(t) {
      t.disabled = false;
      t.style.opacity = '1';
      t.style.transform = '';
      t.style.boxShadow = '0 4px 0 rgba(0,0,0,.12)';
    });
  }
}
