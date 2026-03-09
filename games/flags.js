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
    { flag: '🇷🇺', country: 'Russia' },
    { flag: '🇦🇷', country: 'Argentina' },
    { flag: '🇿🇦', country: 'South Africa' },
    { flag: '🇪🇬', country: 'Egypt' },
    { flag: '🇳🇬', country: 'Nigeria' },
    { flag: '🇹🇷', country: 'Turkey' },
    { flag: '🇸🇦', country: 'Saudi Arabia' },
    { flag: '🇮🇩', country: 'Indonesia' },
    { flag: '🇵🇭', country: 'Philippines' },
    { flag: '🇹🇭', country: 'Thailand' },
    { flag: '🇲🇾', country: 'Malaysia' },
    { flag: '🇸🇬', country: 'Singapore' },
    { flag: '🇳🇿', country: 'New Zealand' },
    { flag: '🇵🇹', country: 'Portugal' },
    { flag: '🇳🇱', country: 'Netherlands' },
    { flag: '🇧🇪', country: 'Belgium' },
    { flag: '🇸🇪', country: 'Sweden' },
    { flag: '🇳🇴', country: 'Norway' },
    { flag: '🇩🇰', country: 'Denmark' },
    { flag: '🇫🇮', country: 'Finland' },
    { flag: '🇨🇭', country: 'Switzerland' },
    { flag: '🇦🇹', country: 'Austria' },
    { flag: '🇬🇷', country: 'Greece' },
    { flag: '🇵🇱', country: 'Poland' },
    { flag: '🇺🇦', country: 'Ukraine' },
    { flag: '🇨🇴', country: 'Colombia' },
    { flag: '🇵🇪', country: 'Peru' },
    { flag: '🇨🇱', country: 'Chile' },
    { flag: '🇰🇪', country: 'Kenya' },
    { flag: '🇪🇹', country: 'Ethiopia' },
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
