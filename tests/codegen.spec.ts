import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
    test('Login - Valid Credentials', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
        await page.getByRole('button', { name: ' Login' }).click();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    });

    test('Login - Negative Scenario', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByRole('textbox', { name: 'Username' }).click();
        await page.getByRole('textbox', { name: 'Username' }).fill('invalidUser');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('invalidPassword');
        await page.getByRole('button', { name: ' Login' }).click();
        await expect(page.locator('#flash')).toContainText('Your username is invalid! ×');
    });
});