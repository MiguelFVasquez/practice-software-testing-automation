import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Flujo de Autenticación - Smoke Tests', () => {

    test('Should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Navegate to the login page
        await page.goto('https://practicesoftwaretesting.com/auth/login');

        // 2. Execute the action from our Page Object
        // (Use an email and password with which you have already registered manually on the website)
        await loginPage.login('florezvasquezjuanmiguel@gmail.com', 'Miguel231401*');

        // 3. Web-First Assertion: Validate that the URL changes to the profile/dashboard
        await expect(page).toHaveURL(/.*account/);
    });

    test('Should not login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('https://practicesoftwaretesting.com/auth/login');
        
        // Send invalid credentials
        await loginPage.login('correo_falso@test.com', 'claveInvalida123');

        // 4. Web-First Assertion: Validate that the error message appears in the UI
        const mensajeError = page.getByTestId('login-error');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toContainText('Invalid email or password');
    });
});