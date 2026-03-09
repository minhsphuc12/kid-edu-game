function setup_animals(area) {
  const ANIMALS = [
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🐰', name: 'Rabbit' },
    { emoji: '🐸', name: 'Frog' },
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🐘', name: 'Elephant' },
    { emoji: '🦒', name: 'Giraffe' },
    { emoji: '🐧', name: 'Penguin' },
    { emoji: '🐢', name: 'Turtle' },
    { emoji: '🐬', name: 'Dolphin' },
    { emoji: '🦅', name: 'Eagle' },
    { emoji: '🦋', name: 'Butterfly' },
    { emoji: '🐼', name: 'Panda' },
    { emoji: '🦊', name: 'Fox' },
    { emoji: '🐻', name: 'Bear' },
    { emoji: '🦓', name: 'Zebra' },
    { emoji: '🦏', name: 'Rhino' },
    { emoji: '🐊', name: 'Crocodile' },
    { emoji: '🦜', name: 'Parrot' },
    { emoji: '🦩', name: 'Flamingo' },
    { emoji: '🐙', name: 'Octopus' },
    { emoji: '🦈', name: 'Shark' },
    { emoji: '🐨', name: 'Koala' },
    { emoji: '🦘', name: 'Kangaroo' },
    { emoji: '🐺', name: 'Wolf' },
    { emoji: '🦦', name: 'Otter' },
    { emoji: '🐿️', name: 'Squirrel' },
    { emoji: '🦔', name: 'Hedgehog' },
    { emoji: '🐝', name: 'Bee' },
    { emoji: '🦆', name: 'Duck' },
    { emoji: '🐓', name: 'Rooster' },
    { emoji: '🦚', name: 'Peacock' },
    { emoji: '🐠', name: 'Clownfish' },
    { emoji: '🐳', name: 'Whale' },
    { emoji: '🦭', name: 'Seal' },
    { emoji: '🐆', name: 'Leopard' },
    { emoji: '🐗', name: 'Boar' },
    { emoji: '🦙', name: 'Llama' },
    { emoji: '🐍', name: 'Snake' },
    { emoji: '🦎', name: 'Lizard' },
  ];

  const target = pick(ANIMALS);
  const wrongs = pickN(ANIMALS.filter(a => a.name !== target.name), 3);
  const options = shuffle([target, ...wrongs]);

  addQ(area, 'What animal is this? 🤔');

  const emojiEl = document.createElement('div');
  emojiEl.className = 'g-emoji';
  emojiEl.textContent = target.emoji;

  const display = makeDisplay(emojiEl);
  area.appendChild(display);

  const grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(animal => {
    const btn = document.createElement('button');
    btn.className = 'opt opt-text';
    btn.textContent = animal.name;

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (animal.name === target.name) {
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
