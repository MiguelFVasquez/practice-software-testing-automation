import { Page, Locator } from '@playwright/test';

export class HomePage {
    private readonly page: Page;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    public readonly productGrid: Locator;
    public readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.productGrid = page.locator('.col-md-9');
        this.productTitle = page.getByTestId('product-name');
    }

    async buscarProducto(nombre: string): Promise<void> {
        // 1. Ya no necesitamos el waitFor manual. Playwright lo hará solo.
        // 2. Si el input está "oculto" por el framework, Playwright esperará automáticamente 
        // hasta que esté listo para recibir texto.
        await this.searchInput.fill(nombre);
        
        // 3. Click
        await this.searchButton.click();
        
        // 4. Esta espera es CRÍTICA porque la búsqueda hace una petición al servidor.
        // Estamos esperando a que el grid de productos se actualice.
        await this.productTitle.first().waitFor({ state: 'visible', timeout: 15000 });
    }
    async filtrarPorMarca(marca: string): Promise<void> {
        const brandCheckbox = this.page.locator(`input[value="${marca}"]`);
        await brandCheckbox.check();
        // Misma corrección: esperar al primer resultado, no a networkidle.
        await this.productTitle.first().waitFor({ state: 'visible' });
    }
}