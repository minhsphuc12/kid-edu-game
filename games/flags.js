function setup_flags(area) {
  const FLAGS = [
    { flag: '🇺🇸', country: 'USA' },
    { flag: '🇬🇧', country: 'UK' },
    { flag: '🇯🇵', country: 'Japan' },
    { flag: '🇫🇷', country: 'France' },
    { flag: '🇩🇪', country: 'Germany' },
    { flag: '🇮🇹', country: 'Italy' },
    { flag: '🇧🇷', country: 'Brazil' },
    { flag: '🇨🇳', country: 'China' },
    { flag: '🇦🇺', country: 'Australia' },
    { flag: '🇨🇦', country: 'Canada' },
    { flag: '🇰🇷', country: 'South Korea' },
    { flag: '🇻🇳', country: 'Vietnam' },
    { flag: '🇮🇳', country: 'India' },
    { flag: '🇲🇽', country: 'Mexico' },
    { flag: '🇪🇸', country: 'Spain' },
  ];

  const target = pick(FLAGS);
  const others = pickN(FLAGS.filter(f => f.country !== target.country), 3);
  const options = shuffle([target, ...others]);

  addQ(area, 'Which country is this flag? 🌍');

  const display = makeDisplay();
  const flagEl = document.createElement('div');
  flagEl.className = 'g-flag';
  flagEl.textContent = target.flag;
  display.appendChild(flagEl);
  area.appendChild(display);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-text';
    btn.textContent = option.country;

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (option.country === target.country) {
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
