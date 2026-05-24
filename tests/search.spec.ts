import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Catalog and Search engines - Home', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Aseguramos estar en Home haciendo clic en el enlace de navegación
        await page.getByTestId('nav-home').click();
    });

    test('Should search for a product and display results', async ({ page }) => {

        // ¡La validación clave!
        const isBlocked = await page.getByText('Performing security verification').isVisible();
        if (isBlocked) {
            console.error('¡BLOQUEADO POR CLOUDFLARE!');
            // Aquí podrías añadir una espera larga o tomar una captura para investigar
            await page.screenshot({ path: 'blocked.png' });
        }
        const homePage = new HomePage(page);
        const productName = 'Hammer';

        await homePage.buscarProducto(productName);

        // Validamos que el primer resultado sea visible
        const firstProduct = homePage.productGrid.locator('.card').first();
        await expect(firstProduct).toBeVisible();

        // Extraemos textos y validamos usando .some()
        const allTexts = await homePage.productGrid.locator('[data-test="product-name"]').allTextContents();
        const found = allTexts.some(text => text.toLowerCase().includes(productName.toLowerCase()));

        expect(found, `Ninguno de los productos contiene: ${productName}`).toBe(true);
    });
});