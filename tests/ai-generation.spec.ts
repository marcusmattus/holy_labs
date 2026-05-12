import { test, expect } from '@playwright/test';

test('AI Generation Flow', async ({ page }) => {
  // 1. Visit the studio
  await page.goto('/studio/new');

  // 2. Mock the AI generation API
  await page.route('/api/generate-app', async route => {
    const json = { success: true, message: 'App generated', code: '<div>Mock Code</div>' };
    await route.fulfill({ json });
  });

  // 3. Fill prompt
  await page.fill('textarea', 'Build a fintech dashboard');
  
  // 4. Click generate
  await page.click('text=Generate');

  // 5. Wait for streaming to finish and check if preview updates
  await expect(page.locator('text=Mock Code')).toBeVisible({ timeout: 10000 });
});
