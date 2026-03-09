// Shape Match — age 3–4
// Globals from engine: canAns, onCorrect, onWrong, pick, pickN, shuffle,
//                      addQ, makeDisplay

const NS = 'http://www.w3.org/2000/svg';

const SHAPES = [
  { name: 'circle',   draw: (svg, color) => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('cx', '50'); c.setAttribute('cy', '50'); c.setAttribute('r', '42'); c.setAttribute('fill', color); svg.appendChild(c); } },
  { name: 'square',   draw: (svg, color) => { const r = document.createElementNS(NS, 'rect'); r.setAttribute('x', '10'); r.setAttribute('y', '10'); r.setAttribute('width', '80'); r.setAttribute('height', '80'); r.setAttribute('rx', '10'); r.setAttribute('fill', color); svg.appendChild(r); } },
  { name: 'triangle', draw: (svg, color) => { const p = document.createElementNS(NS, 'polygon'); p.setAttribute('points', '50,8 93,92 7,92'); p.setAttribute('fill', color); svg.appendChild(p); } },
  { name: 'star',     draw: (svg, color) => { const p = document.createElementNS(NS, 'polygon'); p.setAttribute('points', '50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35'); p.setAttribute('fill', color); svg.appendChild(p); } },
  { name: 'heart',    draw: (svg, color) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', 'M50,85 C50,85 8,60 8,35 C8,20 18,10 35,10 C43,10 50,18 50,18 C50,18 57,10 65,10 C82,10 92,20 92,35 C92,60 50,85 50,85Z'); p.setAttribute('fill', color); svg.appendChild(p); } },
  { name: 'diamond',  draw: (svg, color) => { const p = document.createElementNS(NS, 'polygon'); p.setAttribute('points', '50,5 96,50 50,95 4,50'); p.setAttribute('fill', color); svg.appendChild(p); } },
];

const PALETTE = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#C3A6FF', '#F38181', '#FF8E53'];

function makeSvg(size) {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.style.filter = 'drop-shadow(2px 3px 0 rgba(0,0,0,.1))';
  svg.style.display = 'block';
  return svg;
}

function pickColor(exclude) {
  const pool = PALETTE.filter(c => !exclude.includes(c));
  return pick(pool.length ? pool : PALETTE);
}

function setup_shapes(area) {
  // Pick target shape
  const target = pick(SHAPES);

  // Pick 3 wrong shapes (different from target)
  const others = SHAPES.filter(s => s.name !== target.name);
  const wrongShapes = pickN(others, 3);

  // Assign colors: target color, then 4 distinct option colors
  const usedColors = [];
  const targetColor = pick(PALETTE);
  usedColors.push(targetColor);

  const optionColors = [];
  for (let i = 0; i < 4; i++) {
    const c = pickColor(usedColors);
    optionColors.push(c);
    usedColors.push(c);
  }

  // Question text
  addQ(area, 'Find the matching shape!');

  // Display: large target shape
  const display = makeDisplay();
  const targetSvg = makeSvg(100);
  target.draw(targetSvg, targetColor);
  display.appendChild(targetSvg);
  area.appendChild(display);

  // Options grid
  const grid = document.createElement('div');
  grid.className = 'opts-2';

  // Build option entries: [shapeObj, colorStr, isCorrect]
  const options = [
    { shape: target, color: optionColors[0], correct: true },
    { shape: wrongShapes[0], color: optionColors[1], correct: false },
    { shape: wrongShapes[1], color: optionColors[2], correct: false },
    { shape: wrongShapes[2], color: optionColors[3], correct: false },
  ];
  shuffle(options);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'sopt';
    btn.style.cssText = 'aspect-ratio:1;border-radius:15px;background:#f5f5f5;border:3px solid #e2e2e2;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 0 rgba(0,0,0,.07);transition:all .12s;';

    const optSvg = makeSvg(62);
    opt.shape.draw(optSvg, opt.color);
    btn.appendChild(optSvg);

    btn.addEventListener('click', () => {
      if (!canAns) return;

      if (opt.correct) {
        btn.classList.add('is-correct', 'hi-correct');
        onCorrect();
      } else {
        canAns = false;
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
