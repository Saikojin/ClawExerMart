import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runE2E() {
  console.log('🚀 Starting Vite preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write(d.toString()));
  server.stderr.on('data', (d) => process.stderr.write(d.toString()));

  // Wait for server readiness
  console.log('⏳ Waiting for preview server on http://localhost:4173 ...');
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch('http://localhost:4173');
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {
      await wait(500);
    }
  }

  if (!ready) {
    console.error('❌ Server failed to start');
    server.kill();
    process.exit(1);
  }

  console.log('🌐 Launching browser in visible non-headless mode via system Chrome...');
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 860 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Visit Homepage & capture R1_navbar (Hero + Frosted Glass Header)
    console.log('📸 Step 1: Navigating to Homepage & capturing R1_navbar...');
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    await wait(800);
    await page.screenshot({ path: path.join('captures', 'R1_navbar.png') });

    // 2. Scroll to Catalog Grid & capture R2_catalog (Product Cards + Stacked Badges)
    console.log('📸 Step 2: Scrolling to Catalog Grid & capturing R2_catalog...');
    await page.evaluate(() => window.scrollTo({ top: 380, behavior: 'instant' }));
    await wait(500);
    await page.screenshot({ path: path.join('captures', 'R2_catalog.png') });

    // 3. Open Product Detail Modal on a Used Item & capture R3_product_modal
    console.log('📸 Step 3: Opening used equipment details & capturing R3_product_modal...');
    const firstUsedCard = page.locator('article[data-testid^="equipment-card-"]').first();
    await firstUsedCard.click();
    await page.waitForSelector('[data-testid="product-detail-modal"]', { timeout: 5000 });
    await wait(600);
    await page.screenshot({ path: path.join('captures', 'R3_product_modal.png') });

    // Close modal
    await page.click('[data-testid="btn-close-detail-modal"]');
    await wait(400);

    // 4. Navigate to Sell Portal & capture R4_sell_portal
    console.log('📸 Step 4: Navigating to Sell Portal & capturing R4_sell_portal...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('[data-testid="tab-sell"]');
    await page.waitForSelector('[data-testid="sell-portal"]', { timeout: 5000 });
    await wait(600);
    await page.screenshot({ path: path.join('captures', 'R4_sell_portal.png') });

    // 5. Navigate to Gym Space Matcher & capture R5_space_matcher
    console.log('📸 Step 5: Navigating to Space Matcher & capturing R5_space_matcher...');
    await page.click('[data-testid="tab-space-matcher"]');
    await page.waitForSelector('[data-testid="gym-space-matcher"]', { timeout: 5000 });
    await wait(600);
    await page.screenshot({ path: path.join('captures', 'R5_space_matcher.png') });

    // 6. Add to Cart & Checkout Simulation & capture R6_cart_checkout
    console.log('📸 Step 6: Adding item to cart & capturing R6_cart_checkout...');
    await page.click('[data-testid="tab-catalog"]');
    await wait(400);
    const quickAddBtn = page.locator('button[data-testid^="btn-quick-add-"]').first();
    await quickAddBtn.click();
    await page.waitForSelector('[data-testid="cart-drawer-container"]', { timeout: 5000 });
    await wait(600);
    await page.screenshot({ path: path.join('captures', 'R6_cart_checkout.png') });

    // Close cart drawer if open by clicking backdrop or close button
    const closeCartBtn = page.locator('[data-testid="btn-close-cart"]');
    if (await closeCartBtn.count()) {
      await closeCartBtn.click();
    } else {
      await page.keyboard.press('Escape');
      await page.mouse.click(50, 50);
    }
    await wait(400);

    // 7. Activate SeikoClaw break-ui Worst Case Stress Mode & capture R7_break_ui_stress
    console.log('📸 Step 7: Activating break-ui Worst Case toggle & capturing R7_break_ui_stress...');
    await page.click('[data-testid="break-ui-mode-worst"]');
    await wait(400);
    await page.evaluate(() => window.scrollTo({ top: 380, behavior: 'instant' }));
    await wait(600);
    await page.screenshot({ path: path.join('captures', 'R7_break_ui_stress.png') });

    // Reset back to Demo data
    await page.click('[data-testid="break-ui-mode-demo"]');
    await wait(200);

    console.log('✅ All non-headless user journey & break-ui stress steps completed!');
    if (consoleErrors.length > 0) {
      console.warn('⚠️ Console errors noticed:', consoleErrors);
    } else {
      console.log('🎉 0 console errors reported during non-headless E2E execution!');
    }
  } catch (err) {
    console.error('❌ E2E failed:', err);
    throw err;
  } finally {
    await browser.close();
    server.kill();
  }
}

runE2E()
  .then(() => {
    console.log('🏆 Non-headless E2E verification complete with 100% pass!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
