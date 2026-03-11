function setup_storymath(area) {
  const STORIES = [
    { tpl: function(a,b) { return '🍎 You have ' + a + ' apples. You get ' + b + ' more. How many apples?'; }, op: '+' },
    { tpl: function(a,b) { return '🍪 There are ' + a + ' cookies. You eat ' + b + '. How many are left?'; }, op: '-' },
    { tpl: function(a,b) { return '🐟 ' + a + ' fish are in a pond. ' + b + ' more swim in. How many fish?'; }, op: '+' },
    { tpl: function(a,b) { return '🎈 You have ' + a + ' balloons. ' + b + ' float away. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '⭐ You collect ' + a + ' stars. You find ' + b + ' more. How many stars?'; }, op: '+' },
    { tpl: function(a,b) { return '🐣 There are ' + a + ' chicks. ' + b + ' hatch more. How many chicks?'; }, op: '+' },
    { tpl: function(a,b) { return '🍓 You pick ' + a + ' berries. You eat ' + b + '. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '🚗 ' + a + ' cars are parked. ' + b + ' drive away. How many cars left?'; }, op: '-' },
    { tpl: function(a,b) { return '🎁 You have ' + a + ' gifts. You get ' + b + ' more. How many gifts?'; }, op: '+' },
    { tpl: function(a,b) { return '🐸 ' + a + ' frogs sit on a log. ' + b + ' more jump on. How many frogs?'; }, op: '+' },
    { tpl: function(a,b) { return '🌸 ' + a + ' flowers are in a vase. ' + b + ' fall out. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '🐥 ' + a + ' chicks are eating. ' + b + ' join them. How many chicks?'; }, op: '+' },
    { tpl: function(a,b) { return '🍬 You have ' + a + ' sweets. You give ' + b + ' to a friend. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '🚀 ' + a + ' rockets launch. ' + b + ' more take off. How many rockets?'; }, op: '+' },
    { tpl: function(a,b) { return '🐢 ' + a + ' turtles are on a rock. ' + b + ' slide off. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '🎨 You draw ' + a + ' pictures. You draw ' + b + ' more. How many pictures?'; }, op: '+' },
    { tpl: function(a,b) { return '🐠 There are ' + a + ' fish in a tank. ' + b + ' swim away. How many fish?'; }, op: '-' },
    { tpl: function(a,b) { return '🌟 ' + a + ' kids have stars. ' + b + ' more kids get stars. How many kids?'; }, op: '+' },
    { tpl: function(a,b) { return '🍦 You buy ' + a + ' ice creams. You eat ' + b + '. How many left?'; }, op: '-' },
    { tpl: function(a,b) { return '🐝 ' + a + ' bees are in a hive. ' + b + ' more fly in. How many bees?'; }, op: '+' },
  ];

  var story = pick(STORIES);
  var a, b, answer;

  if (story.op === '+') {
    a = 1 + Math.floor(Math.random() * 5);
    b = 1 + Math.floor(Math.random() * (10 - a));
    answer = a + b;
  } else {
    a = 3 + Math.floor(Math.random() * 7);
    b = 1 + Math.floor(Math.random() * (a - 1));
    answer = a - b;
  }

  var text = story.tpl(a, b);

  addQ(area, 'Read the story! 📖');

  var storyCard = document.createElement('div');
  storyCard.style.cssText = 'background:linear-gradient(135deg,#fff9e6,#fff3cc);border-radius:18px;padding:18px;font-family:Nunito,sans-serif;font-weight:700;font-size:1rem;color:#2D2D2D;line-height:1.7;text-align:center;box-shadow:0 4px 0 rgba(0,0,0,.07);width:100%;';
  storyCard.textContent = text;
  area.appendChild(storyCard);

  var wrongSet = new Set();
  var deltas = [-2, -1, 1, 2, 3];
  for (var i = 0; i < deltas.length; i++) {
    var w = answer + deltas[i];
    if (w >= 0 && w !== answer && wrongSet.size < 3) wrongSet.add(w);
  }

  var options = shuffle([answer, ...wrongSet]);
  var grid = document.createElement('div');
  grid.className = 'opts-2';

  options.forEach(function(num) {
    var btn = document.createElement('button');
    btn.className = 'opt opt-number-big';
    btn.textContent = num;

    btn.addEventListener('click', function() {
      if (!canAns) return;
      canAns = false;
      if (num === answer) {
        btn.classList.add('is-correct', 'hi-correct');
        onCorrect();
      } else {
        btn.classList.add('is-wrong', 'hi-wrong');
        onWrong();
        setTimeout(function() {
          btn.classList.remove('is-wrong', 'hi-wrong');
          canAns = true;
        }, 520);
      }
    });

    grid.appendChild(btn);
  });

  area.appendChild(grid);
}
