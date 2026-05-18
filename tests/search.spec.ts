import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe( 'Catalog and Search engines - Home', () => {
    
    test.beforeEach(async ({ page }) => {
        // 1. Navigate to the home page before each test
        await page.goto('https://practicesoftwaretesting.com/');    
    });
    
    test('Should search for a product and display results', async ({ page }) => {
        const homePage = new HomePage(page);
        const productName = 'Hammer';

        //2. Execute the search action from our Page Object
        await homePage.buscarProducto(productName);
        //3. Get the list of products displayed in the grid after the search
        const productsTitles = homePage.productGrid.locator('.card').locator(homePage.productTitle);
        //4. Validate that at least one of the displayed products contains the searched name
        await expect(productsTitles.first()).toBeVisible();
        //5. Avanced assertion: Validate that at least one of the displayed products contains the searched name (case-insensitive)
        const allTexts = await productsTitles.allTextContents();
        
        allTexts.forEach(text => {
            expect(text.toLowerCase()).toContain(productName.toLowerCase());
        });
    });
});