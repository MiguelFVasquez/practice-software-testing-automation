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
        await this.searchInput.fill(nombre);
        await this.searchButton.click();

        // CORRECCIÓN: 'networkidle' cuelga indefinidamente en esta SPA porque
        // mantiene conexiones en background (WebSockets, polling, etc).
        //
        // La alternativa correcta para SPAs es esperar a que el elemento
        // de resultado sea visible en el DOM, que es lo que realmente nos importa.
        await this.productTitle.first().waitFor({ state: 'visible' });
    }

    async filtrarPorMarca(marca: string): Promise<void> {
        const brandCheckbox = this.page.locator(`input[value="${marca}"]`);
        await brandCheckbox.check();
        // Misma corrección: esperar al primer resultado, no a networkidle.
        await this.productTitle.first().waitFor({ state: 'visible' });
    }
}