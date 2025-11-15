import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

// Main checks
  test('Home page shows Home <h1>', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Home');
  });

  test('About link navigates to About and updates <h1>', async ({ page }) => {
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page.locator('h1')).toHaveText('About');
  });

  test('Contact link navigates to Contact and updates <h1>', async ({ page }) => {
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page.locator('h1')).toHaveText('Contact');
  });

// Additional checks
  test('All pages have correct page titles', async ({ page }) => {
    await expect(page).toHaveTitle('Home');
    
    await page.click('a[href="about.html"]');
    await expect(page).toHaveTitle('About');
    
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveTitle('Contact');
  });

  test('Navigation works between all pages', async ({ page }) => {
    await page.click('a[href="about.html"]');
    await expect(page.locator('h1')).toHaveText('About');
    
    await page.click('a[href="contact.html"]');
    await expect(page.locator('h1')).toHaveText('Contact');
    
    await page.click('a[href="index.html"]');
    await expect(page.locator('h1')).toHaveText('Home');
  });
});