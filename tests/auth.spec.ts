import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ApiHelper } from '../helpers/ApiHelper';
import { crearUsuarioDePrueba } from '../helpers/UserFactory';

test.describe('Flujo de Autenticación - Smoke Tests', () => {

    /**
     * ARQUITECTURA DEL TEST:
     *
     * El timeout de 60s era causado por una transición SPA Register→Login
     * que congelaba el router de Angular/React en el entorno headless de CI.
     *
     * Solución: separar la "fase de datos" de la "fase de UI":
     *   - Registro  → API REST directa (sin UI, sin router, ~300ms)
     *   - Login     → UI de Playwright (lo que realmente queremos probar)
     *
     * Esto también sigue la buena práctica de E2E: solo prueba vía UI
     * lo que estás verificando; el resto usa la capa más rápida disponible.
     */
    test('Should login with valid credentials (Dynamic User)', async ({ page, request }) => {
        // Sin timeout custom: el test es ahora determinista y no lo necesita.

        const api = new ApiHelper(request);
        const usuario = crearUsuarioDePrueba();

        // FASE 1 — Crear el usuario directamente en el backend.
        // Si esto falla, el test falla aquí con un error HTTP claro,
        // nunca con un timeout críptico en el paso de login.
        await api.registrarUsuario(usuario);

        // FASE 2 — Verificar el login vía UI desde una página en estado virgen.
        // No hay transición Register→Login; la SPA arranca desde cero.
        const loginPage = new LoginPage(page);
        await page.goto('https://practicesoftwaretesting.com/auth/login');
        await loginPage.login(usuario.email, usuario.password);

        await expect(page).toHaveURL(/.*account/);
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