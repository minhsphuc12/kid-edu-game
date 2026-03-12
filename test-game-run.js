/**
 * Quick test: mở game, chọn 1 game, chơi vài câu (đúng/sai) để verify flow.
 * Chạy: node test-game-run.js (server phải chạy: python3 -m http.server 8765)
 */
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }));

  try {
    await page.goto('http://localhost:8765', { waitUntil: 'networkidle' });
    const firstCard = page.locator('.game-card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 3000 });
    await firstCard.click();
    // Đợi màn game: có .game-area và ít nhất 1 nút đáp án
    await page.waitForSelector('.game-area .opt, .game-area .sopt, .game-area button', { timeout: 3000 });
    let played = 0;
    const maxQuestions = 3;
    while (played < maxQuestions) {
      // Chọn đáp án đầu tiên (có thể đúng hoặc sai)
      const opt = page.locator('.game-area .opt, .game-area .sopt, .game-area button.opt-text, .game-area button.opt-number').first();
      const count = await opt.count();
      if (count === 0) break;
      await opt.first().click();
      played++;
      await page.waitForTimeout(played === maxQuestions ? 1200 : 900);
      // Nếu đã sang câu mới hoặc màn celebration thì tiếp tục hoặc thoát
      const celebration = await page.locator('#celebration:not(.hidden)').count();
      if (celebration > 0) break;
    }
    const scoreEl = page.locator('#game-score');
    const score = await scoreEl.textContent().catch(() => '?');
    console.log('OK – Đã chơi', played, 'câu. Điểm hiển thị:', score);
  } catch (e) {
    console.error('Lỗi:', e.message);
    if (logs.length) console.log('Console:', logs.slice(-5));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
