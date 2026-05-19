import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Flujo de Autenticación - Smoke Tests', () => {

    test('Should login with valid credentials (Dynamic User)', async ({ page }) => {
        test.setTimeout(60000);

        const registerPage = new RegisterPage(page);

        const idUnico = Date.now();
        const usuarioDinamico = {
            firstName: 'Juan',
            lastName: 'Florez',
            dob: '1995-01-01',
            postalCode: '630003',
            houseNumber: '123',
            street: 'Avenida Bolivar',
            city: 'Armenia',
            state: 'Quindio',
            country: 'CO',
            phone: '3123456789',
            email: `qa_user_${idUnico}@test.com`,
            password: 'SecurePassword123*'
        };

        // 1. Registrar el usuario en la pestaña por defecto
        await page.goto('https://practicesoftwaretesting.com/auth/register');
        await registerPage.registrarUsuario(usuarioDinamico); 

        // 2. SOLUCIÓN MAESTRA: Abrir una pestaña NUEVA y completamente limpia
        // Esto destruye cualquier bloqueo de ciclo de vida o renderizado de la SPA.
        const pestañaLimpia = await page.context().newPage();
        const loginPagePestañaLimpia = new LoginPage(pestañaLimpia);

        // 3. Navegar al login e iniciar sesión desde la pestaña prístina
        await pestañaLimpia.goto('https://practicesoftwaretesting.com/auth/login');
        await loginPagePestañaLimpia.login(usuarioDinamico.email, usuarioDinamico.password);

        // 4. Verificación en la nueva pestaña
        await expect(pestañaLimpia).toHaveURL(/.*account/);
    });

    test('Should not login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('https://practicesoftwaretesting.com/auth/login');
        await loginPage.login('correo_falso@test.com', 'claveInvalida123');

        const mensajeError = page.getByTestId('login-error');
        await expect(mensajeError).toBeVisible();
        await expect(mensajeError).toContainText('Invalid email or password');
    });
});